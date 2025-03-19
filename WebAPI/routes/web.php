<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminUserController;
use Illuminate\Http\Request;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Support\Facades\RateLimiter;

RateLimiter::for('global', function (Request $request) {
  return Limit::perMinute(5)->by($request->ip());
});

Route::get('/', [AdminUserController::class, 'login']);
Route::get('/login', [AdminUserController::class, 'login'])->name('login');
Route::middleware('throttle:global')->post('/connexion', [AdminUserController::class, 'connexion'])->name('connexion');

Route::middleware(['auth:admin'])->group(function () {
    Route::post('/logout', [AdminUserController::class, 'logout'])->name('logout');
    Route::get('/admin/dashboard', [AdminUserController::class, 'index'])->name('admin.dashboard');
    Route::get('/admin/edit/{id}', [AdminUserController::class, 'edit'])->name('admin.edit');
    Route::patch('/admin/update/{user}', [AdminUserController::class, 'update'])->name('admin.update');
    Route::delete('/admin/delete/{id}',[AdminUserController::class, 'delete'])->name('admin.delete');
});