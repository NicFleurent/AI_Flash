<?php

namespace App\Http\Controllers;

use App\Http\Requests\FlashcardRequest;
use App\Models\Collection;
use App\Models\Flashcard;
use App\Models\Subject;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
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
                'message' => __('flashcard.error'),
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getTodayFlashCardsCount()
    {
      $user_id = Auth::user()->id;

      $subjects_id = Subject::where('user_id', $user_id)->pluck('id');
      $collections_id = Collection::whereIn('subject_id', $subjects_id)->pluck('id');
    
      $today = Carbon::now('America/Toronto')->toDateString();

      $flashcards_count = Flashcard::whereIn('collection_id', $collections_id)->where('next_revision_date', $today)->count();

      return response()->json(['flashcard_count' => $flashcards_count], 200);
    }

    public function getTodayFlashCards()
    {
      $user_id = Auth::user()->id;

      $subjects_id = Subject::where('user_id', $user_id)->pluck('id');
      $collections_id = Collection::whereIn('subject_id', $subjects_id)->pluck('id');
    
      $today = Carbon::now('America/Toronto')->toDateString();

      $flashcards = Flashcard::select('front_face','back_Face')
                                ->whereIn('collection_id', $collections_id)
                                ->where('next_revision_date', $today)
                                ->limit(25)
                                ->get();

      return response()->json(['flashcards' => $flashcards], 200);
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
                'message' => __('flashcard.create'),
                'data' => $flashcard
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => __('flashcard.error'),
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
                'message' => __('flashcard.update'),
                'data' => $flashcard
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => __('flashcard.error'),
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
                'message' => __('flashcard.delete'),
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => __('flashcard.error'),
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
