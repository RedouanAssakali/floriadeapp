<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PoiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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



/**
 * Routes for Poi's
 */

//Public routes
Route::get('/pois', [PoiController::class, 'index']);
Route::get('/pois/{id}',[PoiController::class, 'show']);

//Protected routes
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/pois',[PoiController::class, 'store']);
    Route::put('/pois/{id}',[PoiController::class, 'update']);
    Route::delete('/pois/{id}',[PoiController::class, 'destroy']);
});





/**
 * Routes for Users
 */
//public
Route::post('/register',[AuthController::class, 'register']);
Route::post('/login',[AuthController::class, 'login']);

//Protected routes
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/logout',[AuthController::class, 'logout']);

});


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
