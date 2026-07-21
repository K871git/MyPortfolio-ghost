<?php

use App\Http\Controllers\Api\AboutController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\ExperienceController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\SettingController;
use App\Http\Controllers\Api\SkillController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public API — read-only surface consumed by the synapse-os frontend
|--------------------------------------------------------------------------
*/

Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{slug}', [ProjectController::class, 'show']);

Route::get('/experiences', [ExperienceController::class, 'index']);

Route::get('/skills', [SkillController::class, 'index']);

Route::get('/about', [AboutController::class, 'index']);

Route::get('/settings', [SettingController::class, 'index']);

Route::post('/contact', [ContactController::class, 'store'])
    ->middleware('throttle:5,1'); // 5 submissions per minute per IP

/*
|--------------------------------------------------------------------------
| Admin API — Sanctum protected, wired up but not built out in this pass.
| See routes/admin.php for the full CRUD surface once the admin panel
| milestone begins.
|--------------------------------------------------------------------------
*/

require __DIR__.'/admin.php';
