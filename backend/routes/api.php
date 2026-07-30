<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\TeamMemberController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);

    Route::middleware(['auth:api', 'active'])->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);
        Route::get('me', [AuthController::class, 'me']);
    });
});

Route::middleware(['auth:api', 'active'])->group(function () {
    Route::apiResource('users', UserController::class)->except(['destroy']);
    Route::patch('users/{user}/status', [UserController::class, 'toggleStatus']);

    Route::apiResource('teams', TeamController::class)->only(['index', 'store', 'show']);
    Route::post('teams/{team}/members', [TeamMemberController::class, 'store']);
    Route::delete('teams/{team}/members/{user}', [TeamMemberController::class, 'destroy']);

    Route::get('teams/{team}/tasks', [TaskController::class, 'index']);
    Route::post('teams/{team}/tasks', [TaskController::class, 'store']);
    Route::get('tasks/{task}', [TaskController::class, 'show']);
    Route::patch('tasks/{task}', [TaskController::class, 'update']);
    Route::delete('tasks/{task}', [TaskController::class, 'destroy']);
    Route::patch('tasks/{task}/status', [TaskController::class, 'updateStatus']);
});
