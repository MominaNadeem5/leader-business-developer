<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Free business-name generator (Gemini via the server; the React app falls back to its local generator on errors)
Route::post('/tools/name-ideas', NameIdeasController::class)->middleware('throttle:name-ideas');
