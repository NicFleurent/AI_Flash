<?php

use App\Http\Controllers\UsersController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\CollectionController;
use App\Http\Controllers\FlashcardController;
use App\Http\Controllers\PdfController;
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
  Route::get('flashcards/today', [FlashcardController::class, 'getTodayFlashCards']);
  Route::get('flashcards/today/{collection_id}', [FlashcardController::class, 'getCollectionTodayFlashCards']);
  Route::get('flashcards/{collection_id}', [FlashcardController::class, 'getFlashCards'])->name('flashcards.index');
  Route::post('flashcards', [FlashcardController::class, 'storeFlashcard'])->name('flashcards.store');
  Route::put('flashcards/{id}', [FlashcardController::class, 'updateFlashcard'])->name('flashcards.update');
  Route::delete('flashcards/{id}', [FlashcardController::class, 'destroyFlashcard'])->name('flashcards.destroy');

  Route::post('extract', [PdfController::class, 'extractText'])->name('extract');


  Route::get('getUserSubjects', [SubjectController::class, 'getUserSubjects'])->name('getUserSubjects');
  Route::post('createSubject', [SubjectController::class, 'createSubject'])->name('createSubject');
  Route::post('updateSubject', [SubjectController::class, 'updateSubject'])->name('updateSubject');
  Route::post('deleteSubject', [SubjectController::class, 'deleteSubject'])->name('deleteSubject');

  Route::get('collections/today', [CollectionController::class, 'getTodayCollections'])->name('getTodayCollections');
  Route::get('getUserCollections', [CollectionController::class, 'getUserCollections'])->name('getUserCollections');
  Route::post('createCollection', [CollectionController::class, 'createCollection'])->name('createCollection');
  Route::post('updateCollection', [CollectionController::class, 'updateCollection'])->name('updateCollection');
  Route::post('deleteCollection', [CollectionController::class, 'deleteCollection'])->name('deleteCollection');

});
