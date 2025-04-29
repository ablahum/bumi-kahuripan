<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\OrdersController;
use App\Http\Controllers\RoomsController;
use App\Http\Controllers\SettingsController;

Route::group(['prefix' => 'auth'], function () {
  Route::post('/register', [AuthController::class, 'register']);
  Route::post('/login', [AuthController::class, 'login']);

  Route::get('/me', [AuthController::class, 'me'])->middleware('auth:sanctum');
  Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
});

Route::middleware('auth:sanctum')->group(function () {
  Route::resource('/orders', OrdersController::class);
  Route::resource('/rooms', RoomsController::class);

  Route::get('/settings', [SettingsController::class, 'index']);
  Route::put('/settings', [SettingsController::class, 'update']);
});
