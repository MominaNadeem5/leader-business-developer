<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class NameIdeasTest extends TestCase
{
    private array $payload = [
        'keywords' => 'sunrise, bake',
        'industry' => 'food',
        'style' => 'modern',
        'max_len' => 14,
        'variation' => 1,
        'exclude' => [],
    ];

    protected function setUp(): void
    {
        parent::setUp();
        Cache::flush();
        config([
            'services.gemini.key' => 'test-key',
            'services.gemini.base_url' => 'https://gemini.test/v1beta',
        ]);
    }

    private function fakeGemini(array $names): void
    {
        Http::fake([
            'gemini.test/*' => Http::response([
                'status' => 'completed',
                'steps' => [
                    ['type' => 'thought', 'signature' => 'x'],
                    ['type' => 'model_output', 'content' => [['type' => 'text', 'text' => json_encode(['names' => $names])]]],
                ],
            ]),
        ]);
    }

    public function test_returns_cleaned_names_and_sends_the_key_only_in_the_header(): void
    {
        $this->fakeGemini(['Sunrise Crumb', 'Nova Oven', 'Nova Oven', 'A Very Long Business Name Indeed', '<b>x</b>']);

        $this->postJson('/api/tools/name-ideas', $this->payload)
            ->assertOk()
            ->assertExactJson(['names' => ['Sunrise Crumb', 'Nova Oven'], 'source' => 'ai']);

        Http::assertSent(fn ($request) => $request->hasHeader('x-goog-api-key', 'test-key')
            && $request->url() === 'https://gemini.test/v1beta/interactions'
            && str_contains($request['input'], '"sunrise, bake"')
            && ! str_contains($request->url(), 'test-key'));
    }

    public function test_repeated_request_is_served_from_cache(): void
    {
        $this->fakeGemini(['Sunrise Crumb']);

        $this->postJson('/api/tools/name-ideas', $this->payload)->assertOk();
        $this->postJson('/api/tools/name-ideas', $this->payload)->assertOk()->assertJson(['cached' => true]);

        Http::assertSentCount(1);
    }

    public function test_validates_input(): void
    {
        $this->postJson('/api/tools/name-ideas', array_merge($this->payload, ['style' => 'weird', 'max_len' => 99]))
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['style', 'max_len']);
    }

    public function test_missing_key_returns_503_so_the_frontend_can_fall_back(): void
    {
        config(['services.gemini.key' => null]);
        $this->app->forgetInstance(\App\Services\GeminiNameGenerator::class);

        $this->postJson('/api/tools/name-ideas', $this->payload)->assertStatus(503);
    }

    public function test_upstream_failure_and_quota_are_reported_without_leaking_details(): void
    {
        Http::fake(['gemini.test/*' => Http::response(['error' => ['message' => 'secret detail']], 500)]);
        $this->postJson('/api/tools/name-ideas', $this->payload)
            ->assertStatus(502)
            ->assertJsonMissing(['error' => ['message' => 'secret detail']]);

        Cache::flush();
        Http::fake(['gemini.test/*' => Http::response([], 429)]);
        $this->postJson('/api/tools/name-ideas', $this->payload)->assertStatus(429);
    }
}
