<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PoiContentController;
use App\Http\Controllers\TourController;
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
//Route::get('/tour', [TourController::class, 'index']);

//Public routes
Route::get('/pois', [PoiController::class, 'index']);
Route::get('/pois/{id}',[PoiController::class, 'show']);
Route::get('/poicontent',[PoiContentController::class, 'index']);
Route::get('/poicontent/{poi_id}/{lang}',[PoiContentController::class, 'show']);
Route::get('/tour/{id}',[TourController::class, 'show']);
Route::get('/tours',[TourController::class, 'showAll']);
Route::get('/poiplant/{poi_id}/{lang}',[PoiContentController::class, 'showPlants']);

//Protected routes
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/tour', [TourController::class, 'store']);
    Route::put('/tour/{id}',[TourController::class, 'update']);

    //pois
    Route::post('/pois',[PoiController::class, 'store']);
    Route::post('/pois/{id}',[PoiController::class, 'update']);
    Route::post('/poisfile/{id}',[PoiController::class, 'updateFile']);
    Route::delete('/pois/{id}',[PoiController::class, 'destroy']);

    //poi content
    Route::post('/poicontent',[PoiContentController::class, 'store']);
    Route::post('/poicontent/{id}/',[PoiContentController::class, 'update']);
    Route::post('/poicontentfile/{id}/',[PoiContentController::class, 'updateFile']);
    Route::delete('/pois/{id}/{lang}',[PoiContentController::class, 'destroy']);
    
    //poi plant
    Route::post('/poiplant',[PoiContentController::class, 'storePlant']);
    Route::post('/poiplant/{id}/',[PoiContentController::class, 'updatePlant']);

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

