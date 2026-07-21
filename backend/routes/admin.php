<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use App\Models\ContactMessage;

/*
|--------------------------------------------------------------------------
| Admin surface — Sanctum SPA auth
|--------------------------------------------------------------------------
| Login issues a session cookie (SPA auth via Sanctum's stateful domains).
| Everything under /api/admin/* requires an authenticated session.
| The admin UI itself is out of scope for this milestone — this wires the
| auth boundary and one working example (contact messages) so CRUD
| controllers can be dropped in later without touching this file.
*/

Route::post('/admin/login', function (Request $request) {
    $credentials = $request->validate([
        'email' => ['required', 'email'],
        'password' => ['required'],
    ]);

    if (! Auth::attempt($credentials)) {
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    $request->session()->regenerate();

    return response()->json(['data' => ['authenticated' => true]]);
});

Route::middleware('auth:sanctum')->prefix('admin')->group(function () {
    Route::post('/logout', function (Request $request) {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Logged out']);
    });

    Route::get('/messages', function () {
        return response()->json(['data' => ContactMessage::latest()->paginate(20)]);
    });

    Route::patch('/messages/{message}/read', function (ContactMessage $message) {
        $message->update(['is_read' => true]);

        return response()->json(['data' => $message]);
    });

    // Full CRUD resource routes for projects/experiences/skills/about_steps
    // plug in here once the admin panel is built:
    // Route::apiResource('projects', Admin\ProjectController::class);
    // Route::apiResource('experiences', Admin\ExperienceController::class);
    // Route::apiResource('skills', Admin\SkillController::class);
    // Route::apiResource('about-steps', Admin\AboutStepController::class);
});
