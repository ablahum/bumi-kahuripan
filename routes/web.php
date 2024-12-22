<?php

use Illuminate\Support\Facades\Route;
// use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\OrdersController;
use App\Http\Controllers\RoomsController;
use App\Http\Controllers\CategoriesController;

// Route::middleware('auth:sanctum')->group(function () {
//     Route::get('/dashboard', [DashboardController::class, 'index']);
//     Route::get('/profile', [UserController::class, 'show']);
// });

Route::prefix('api')->group(function ()
{
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/login', [AuthController::class, 'login']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    // Route::middleware('auth:sanctum')->group(function() {
        Route::resource('/orders', OrdersController::class);
        Route::resource('/rooms', RoomsController::class);
    // });
});

Route::get('/{any}', function () {
    return view('app');
})->where('any', '^(?!api).*');