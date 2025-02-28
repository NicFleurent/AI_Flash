<?php

use App\Http\Controllers\UsersController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\CollectionController;
use App\Http\Controllers\FlashcardController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');


Route::post('login', [UsersController::class, 'login'])->name('login');
Route::post('register', [UsersController::class, 'register']);

Route::group(['middleware' => ['auth:sanctum']], function () {
  Route::post('logout', [UsersController::class, 'logout']);
  Route::post('refreshToken', [UsersController::class, 'refreshToken']);

  Route::put('user/update', [UsersController::class, 'update']);
  Route::put('user/updatePassword', [UsersController::class, 'updatePassword']);
  Route::delete('user/delete', [UsersController::class, 'destroy']);

  Route::get('flashcards/todayCount', [FlashcardController::class, 'getTodayFlashCardsCount']);
});

//Get User's Subjects
Route::get('getUserSubjects', [SubjectController::class, 'getUserSubjects'])->name('getUserSubjects'); //->middleware('auth:sanctum');

//Create Subject
Route::post('createUserSubject', [SubjectController::class, 'createUserSubject'])->name('createUserSubject'); //->middleware('auth:sanctum');

//Edit subject
Route::post('editUserSubject', [SubjectController::class, 'editUserSubject'])->name('editUserSubject'); //->middleware('auth:sanctum');


Route::get('getUserCollections/{subject_id}', [CollectionController::class, 'getUserCollections'])->name('getUserCollections');

// Récupérer toutes les flashcards d'une collection
Route::get('flashcards/{collection_id}', [FlashcardController::class, 'getFlashCards'])->name('flashcards.index');

// Créer une nouvelle flashcard
Route::post('flashcards', [FlashcardController::class, 'storeFlashcard'])->name('flashcards.store');

// Mettre à jour une flashcard
Route::put('flashcards/{id}', [FlashcardController::class, 'updateFlashcard'])->name('flashcards.update');

// Supprimer une flashcard
Route::delete('flashcards/{id}', [FlashcardController::class, 'destroyFlashcard'])->name('flashcards.destroy');
