<?php

namespace App\Http\Controllers;

use App\Http\Requests\FlashcardRequest;
use App\Models\Flashcard;
use App\Models\Subject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class FlashcardController extends Controller
{
    /**
     * Récupérer les flashcards d'une collection spécifique.
     */
    public function getFlashCards($collection_id)
    {
        try {
            $flashcards = Flashcard::where('collection_id', $collection_id)->get();
            return response()->json($flashcards, 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Une erreur est survenue',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getTodayFlashCardsCount()
    {
      $user_id = Auth::user()->id;

      Log::debug($user_id);

      $subjects_id = Subject::where('user_id', $user_id)->pluck('id');
      $collections_id = Subject::whereIn('subject_id', $subjects_id)->pluck('id');

      Log::debug("Sujet: ".$subjects_id);
      Log::debug("Collection: ".$collections_id);

      return response()->json(['message' => 'test'], 200);
    }

    /**
     * Créer une nouvelle flashcard.
     */
    public function storeFlashcard(FlashcardRequest $request)
    {

        try {
            $flashcard = Flashcard::create($request->all());
            return response()->json([
                'success' => true,
                'message' => 'Flashcard créée avec succès',
                'data' => $flashcard
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Une erreur est survenue',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mettre à jour une flashcard.
     */
    public function updateFlashcard(FlashcardRequest $request, $id)
    {

        try {
            $flashcard = Flashcard::findOrFail($id);
            $flashcard->update($request->all());


            return response()->json([
                'success' => true,
                'message' => 'Flashcard mise à jour avec succès',
                'data' => $flashcard
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Une erreur est survenue',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Supprimer une flashcard.
     */
    public function destroyFlashcard($id)
    {
        try {
            $flashcard = Flashcard::findOrFail($id);
            $flashcard->delete();

            return response()->json([
                'success' => true,
                'message' => 'Flashcard supprimée avec succès',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Une erreur est survenue',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
