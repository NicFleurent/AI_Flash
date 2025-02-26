<?php

use App\Http\Controllers\UsersController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\CollectionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');


Route::post('login', [UsersController::class, 'login'])->name('login');
Route::post('register', [UsersController::class, 'register']);

//Get User's Subjects
Route::get('getUserSubjects', [SubjectController::class, 'getUserSubjects'])->name('getUserSubjects');//->middleware('auth:sanctum');

//Create Subject
Route::post('createUserSubject', [SubjectController::class, 'createUserSubject'])->name('createUserSubject');//->middleware('auth:sanctum');

//Edit subject
Route::post('editUserSubject', [SubjectController::class, 'editUserSubject'])->name('editUserSubject');//->middleware('auth:sanctum');


Route::get('getUserCollections/{subject_id}', [CollectionController::class, 'getUserCollections'])->name('getUserCollections');
