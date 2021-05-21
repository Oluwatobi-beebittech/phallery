<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\PostController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('post/create', [PostController::class, 'store'])->middleware('auth:sanctum');
Route::post('register', [RegisterController::class, 'store']);
Route::post('login', [URLLoginController::class, 'findAndSend']);
Route::get('pass/{user}', [URLLoginController::class, 'signedLogin'])
    ->name('api.pass');
Route::get('dashboard', [FeedsController::class, 'index'])->middleware('auth:sanctum');

