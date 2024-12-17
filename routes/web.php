<?php

use Illuminate\Support\Facades\Route;
// use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\OrdersController;
use App\Http\Controllers\RoomsController;
use App\Http\Controllers\CategoriesController;

Route::prefix('api')->group(function () {
    Route::resource('/auth', AuthController::class);
});

Route::prefix('api')->group(function () {
    Route::resource('/orders', OrdersController::class);
});

Route::prefix('api')->group(function () {
    Route::resource('/rooms', RoomsController::class);
});

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
