<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\URLLoginController;
use App\Http\Controllers\FeedsController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('register', [RegisterController::class, 'store']);
Route::post('login', [URLLoginController::class, 'findAndSend'])->name('api.login');
Route::get('pass/{user}', [URLLoginController::class, 'signedLogin'])->name('api.pass');
Route::get('dashboard', [FeedsController::class, 'index'])->middleware('auth:web');

