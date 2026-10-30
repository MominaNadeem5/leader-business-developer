<?php

namespace App\Http\Controllers;

use App\Http\Requests\NameIdeasRequest;
use App\Services\GeminiNameGenerator;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use RuntimeException;

/**
 * POST /api/tools/name-ideas
 * Proxies the business-name generator to Gemini so the API key never reaches the browser.
 * On any failure the response is an error status and the React app falls back to its built-in generator.
 */
class NameIdeasController extends Controller
{
    public function __invoke(NameIdeasRequest $request, GeminiNameGenerator $generator): JsonResponse
    {
        $input = [
            'keywords' => $request->validated('keywords'),
            'industry' => $request->validated('industry'),
            'style' => $request->validated('style'),
            'max_len' => (int) $request->validated('max_len'),
            'variation' => (int) ($request->validated('variation') ?? 0),
            'exclude' => array_values($request->validated('exclude') ?? []),
        ];

        if (! $generator->isConfigured()) {
            return response()->json(['message' => 'Name suggestions are not available right now.'], 503);
        }

        // Same inputs within 10 minutes reuse the stored answer (saves free-tier quota).
        $cacheKey = 'name-ideas:'.sha1(json_encode($input));
        if (($cached = Cache::get($cacheKey)) !== null) {
            return response()->json(['names' => $cached, 'source' => 'ai', 'cached' => true]);
        }

        try {
            $names = $generator->generate($input);
        } catch (RuntimeException $e) {
            $status = in_array($e->getCode(), [429, 502, 503], true) ? $e->getCode() : 502;

            return response()->json(['message' => 'Name suggestions are not available right now.'], $status);
        }

        if ($names !== []) {
            Cache::put($cacheKey, $names, now()->addMinutes(10));
        }

        return response()->json(['names' => $names, 'source' => 'ai']);
    }
}
