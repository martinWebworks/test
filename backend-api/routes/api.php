<?php

use App\Http\Controllers\API\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::prefix('v1')->group(function () {

    Route::controller(UserController::class)->prefix('auth')->group(function () {

        Route::post('/login', 'login')->name('login');
        Route::get('/link-login', 'magicLinkLogin')->name('link.login');
        Route::get('/profile', 'profile')->name('profile');
        Route::post('/refresh', 'refresh')->name('refresh');
        Route::post('/logout', 'logout')->name('logout');

    });

});

