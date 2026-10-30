<?php

namespace App\Providers;

use App\Services\GeminiNameGenerator;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(GeminiNameGenerator::class, fn () => new GeminiNameGenerator(
            config('services.gemini.key'),
            config('services.gemini.model'),
            config('services.gemini.base_url'),
        ));
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Public name generator: per-visitor limits plus one shared daily cap that protects the free Gemini quota.
        RateLimiter::for('name-ideas', fn (Request $request) => [
            Limit::perMinute(10)->by($request->ip()),
            Limit::perDay(100)->by($request->ip()),
            Limit::perDay((int) config('services.gemini.daily_cap'))->by('name-ideas-global'),
        ]);
    }
}
