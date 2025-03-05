<?php

namespace App\Http\Controllers;

use App\Http\Requests\FlashcardRequest;
use App\Http\Requests\ForgottenCurveRequest;
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

      $flashcards_count = Flashcard::whereIn('collection_id', $collections_id)
                                      ->whereDate('next_revision_date','<=',$today)
                                      ->whereDate('last_revision_date','<',$today)
                                      ->whereNot('forgetting_curve_stage', 5)
                                      ->orWhere('forgetting_curve_stage', 0)
                                      ->count();

      return response()->json(['flashcard_count' => $flashcards_count], 200);
    }

    public function getTodayFlashCards()
    {
      $user_id = Auth::user()->id;

      $subjects_id = Subject::where('user_id', $user_id)->pluck('id');
      $collections_id = Collection::whereIn('subject_id', $subjects_id)->pluck('id');
    
      $today = Carbon::now('America/Toronto')->toDateString();

      $flashcards = Flashcard::select('id','front_face','back_face')
                                ->whereIn('collection_id', $collections_id)
                                ->whereDate('next_revision_date','<=',$today)
                                ->whereDate('last_revision_date','<',$today)
                                ->whereNot('forgetting_curve_stage', 5)
                                ->orWhere('forgetting_curve_stage', 0)
                                ->inRandomOrder()
                                ->limit(25)
                                ->get();

      return response()->json(['flashcards' => $flashcards], 200);
    }

    public function getCollectionTodayFlashCards($collection_id)
    {    
      $today = Carbon::now('America/Toronto')->toDateString();

      $flashcards = Flashcard::select('id','front_face','back_face')
                                ->where('collection_id', $collection_id)
                                ->whereDate('next_revision_date','<=',$today)
                                ->whereDate('last_revision_date','<',$today)
                                ->whereNot('forgetting_curve_stage', 5)
                                ->orWhere('forgetting_curve_stage', 0)
                                ->inRandomOrder()
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

    public function updateRememberedFlashcard(ForgottenCurveRequest $request)
    {
        try {
            $flashcard = Flashcard::findOrFail($request->id);
            $today = Carbon::now('America/Toronto')->toDateString();

            $needsRevision = $flashcard->next_revision_date <= $today;
            $isNew = $flashcard->forgetting_curve_stage == 0;
            $isKnown = $flashcard->forgetting_curve_stage == 5;

            if(($needsRevision || $isNew) && (!$isKnown)){
              $flashcard->last_revision_date = Carbon::now('America/Toronto')->toDateString();
              $flashcard->forgetting_curve_stage += 1;
              $flashcard->next_revision_date = $this->getNextRevisionDate($flashcard->forgetting_curve_stage);
            }
            else if(!$isKnown){
              $flashcard->last_revision_date = Carbon::now('America/Toronto')->toDateString();
              $flashcard->next_revision_date = $this->getNextRevisionDate($flashcard->forgetting_curve_stage);
            }

            $flashcard->save();

            return response()->json([
                'success' => true,
                'code' => 991,
                'message' => 'Flashcard updated',
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

    public function updateForgottenFlashcard(ForgottenCurveRequest $request)
    {
        try {
            $flashcard = Flashcard::findOrFail($request->id);
            $isKnown = $flashcard->forgetting_curve_stage == 5;

            if(!$isKnown){
              $flashcard->last_revision_date = Carbon::now('America/Toronto')->toDateString();
              $flashcard->next_revision_date = $this->getNextRevisionDate($flashcard->forgetting_curve_stage);
            }

            $flashcard->save();

            return response()->json([
                'success' => true,
                'code' => 991,
                'message' => 'Flashcard updated',
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

    private function getNextRevisionDate($stage)
    {
      switch ($stage) {
        case 0: return Carbon::now('America/Toronto')->toDateString(); break;
        case 1: return Carbon::now('America/Toronto')->addDays(1)->toDateString(); break;
        case 2: return Carbon::now('America/Toronto')->addDays(7)->toDateString(); break;
        case 3: return Carbon::now('America/Toronto')->addDays(30)->toDateString(); break;
        case 4: return Carbon::now('America/Toronto')->addDays(180)->toDateString(); break;
        
        default:
          return Carbon::now('America/Toronto')->toDateString();
          break;
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
