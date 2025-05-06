<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;

Route::get('/run-migrate', function () {
  Artisan::call('migrate', ['--force' => true]);
  return 'Migration completed.';
});
Route::get('/{any}', function () {
  return view('app');
})->where('any', '.*');
