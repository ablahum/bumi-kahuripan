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

// Route::prefix('api')->middleware('auth:sanctum')->group(function ()
Route::prefix('api')->group(function ()
{
    // Route::post('/login', [AuthController::class, 'login']);
    // Route::post('/logout', [AuthController::class, 'logout']);
    Route::resource('/register', AuthController::class);

    Route::resource('/orders', OrdersController::class);
    Route::resource('/rooms', RoomsController::class);
});

// Route::prefix('api')->group(function () {
//     Route::resource('/orders', OrdersController::class);
// });

// Route::prefix('api')->group(function () {
//     Route::resource('/rooms', RoomsController::class);
// });

Route::get('/{any}', function () {
    return view('app');
})->where('any', '^(?!api).*');

// Route::controller(AuthController::class)->group(function() {
//     Route::get('/login', "index")->name('login');
//     Route::get('/register', "index")->name('register');

//     Route::post('/login', "login")->name("user.login");
//     Route::post('/logout', "logout")->name("user.logout");
//     Route::post('/register', "register")->name("user.register");
// });

// Route::resource('orders', OrdersController::class)->middleware(Authenticate::class);

// Route::resource('/api/rooms', RoomsController::class);
