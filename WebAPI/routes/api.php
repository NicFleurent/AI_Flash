<?php

use App\Http\Controllers\UsersController;
use App\Http\Middleware\LoggerMiddleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');


Route::post('login', [UsersController::class, 'login'])->name('login');
Route::post('register', [UsersController::class, 'register']);

Route::group(['middleware' => ['auth:sanctum']], function () {
  Route::post('logout',[UsersController::class, 'logout']);
  Route::post('refreshToken',[UsersController::class, 'refreshToken']);

  Route::put('user/update', [UsersController::class, 'update']);
  Route::put('user/updatePassword', [UsersController::class, 'updatePassword']);
  Route::delete('user/delete', [UsersController::class, 'destroy']);
});