<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\URLLoginController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\FeedsController;
use App\Http\Controllers\NetworkController;

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
Route::middleware(['auth:sanctum'])->group(function(){

    Route::get('feeds/all', [FeedsController::class, 'getFeeds']);
    Route::get('network/all',[NetworkController::class, 'getNetworkConnections']);
    Route::get('post/myposts',[PostController::class, 'getMyPosts']);
    Route::post('post/create', [PostController::class, 'store']);

    Route::get('unfollow/{email}', [NetworkController::class, 'unfollow']);
    Route::get('follow/{email}', [NetworkController::class, 'follow']);
    Route::get('isFollowing/{email}', [NetworkController::class, 'isFollowing']);
    Route::get('post/{email}', [PostController::class, 'show']);
    Route::get('search/{text}', [SearchController::class, 'search']);
    
    
    Route::get('dashboard', [FeedsController::class, 'index']);
});

Route::post('register', [RegisterController::class, 'store']);
Route::post('login', [URLLoginController::class, 'findAndSend']);
Route::get('pass/{user}', [URLLoginController::class, 'signedLogin'])
    ->name('api.pass');


