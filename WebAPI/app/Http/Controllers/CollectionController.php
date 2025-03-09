<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Subject;
use App\Models\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class CollectionController extends Controller
{
    public function getUserCollections(Request $request)
    {
        $data = $request->all();
        $subject_id = $data['subject_id'] ?? '';
        Log::debug($data);

        $collections = Collection::where('subject_id', $subject_id)
            ->withCount('flashcards')
            ->get();

        Log::debug($collections);

        return response()->json($collections);
    }

    public function getTodayCollections()
    {
        $user_id = Auth::user()->id;
        $today = Carbon::now('America/Toronto')->toDateString();

        $subjects_id = Subject::where('user_id', $user_id)->pluck('id');
        $collections = Collection::select('id', 'name', 'subject_id')
            ->whereIn('subject_id', $subjects_id)
            ->whereHas('flashcards', function ($query) use ($today) {
                $query->whereDate('next_revision_date', '<=', $today)
                    ->whereDate('last_revision_date', '<', $today)
                    ->whereNot('forgetting_curve_stage', 5)
                    ->orWhere('forgetting_curve_stage', 0);
            })
            ->with([
                'subject' => function ($query) {
                    $query->select('id', 'name')->get();
                },
            ])
            ->withCount(['flashcards as flashcards_count' => function ($query) use ($today) {
                $query->whereDate('next_revision_date', '<=', $today)
                    ->whereDate('last_revision_date', '<', $today)
                    ->whereNot('forgetting_curve_stage', 5)
                    ->orWhere('forgetting_curve_stage', 0);
            }])
            ->get();

        return response()->json(['collections' => $collections], 200);
    }

    public function createCollection(Request $request)
    {
        try {
            $data = $request->all();
            $subject_id = $data['subject_id'] ?? '';
            $collection_name = $data['collection_name'] ?? '';

            $collectionId = DB::table('collections')->insertGetId([
                'name' => $collection_name,
                'subject_id' => $subject_id,
            ]);

            $collection = DB::table('collections')->where('id', $collectionId)->first();

            return response()->json([
                'message' => 'subject.collections.error.create.success',
                'data' => $collection
            ], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'subject.collections.error.create.error'
            ], 500);
        }
    }

    public function updateCollection(Request $request)
    {
        try {
            $data = $request->all();
            $collection_id = $data['collection_id'] ?? '';
            $collection_name = $data['collection_name'] ?? '';

            DB::table('collections')
                ->where('id', $collection_id)
                ->update(['name' => $collection_name]);

            return response()->json([
                'message' => 'subject.collections.error.update.success'
            ], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'subject.collections.error.update.error'
            ], 500);
        }
    }

    public function deleteCollection(Request $request)
    {
        try {
            $data = $request->all();
            $collection_id = $data['collection_id'] ?? '';

            DB::table('collections')
                ->where('id', $collection_id)
                ->delete();

            return response()->json([
                'message' => 'subject.collections.error.delete.success'
            ], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'subject.collections.error.delete.error'
            ], 500);
        }
    }

    public function toggleCollectionVisibility(Request $request, Collection $collection)
    {
        try {
            $collection->is_public = !$collection->is_public;
            $collection->save();

            return response()->json([
                'message' => 'Visibilité de la collection mise à jour avec succès',
                'data' => $collection
            ], 200);
        } catch (\Throwable $e) {
            Log::error('Erreur lors du basculement de la visibilité de la collection : ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors du basculement de la visibilité de la collection',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function copyCollection(Request $request)
    {
        try {
            $data = $request->all();
            $collection_id = $data['collection_id'] ?? '';
            $subject_id = $data['subject_id'] ?? '';
            $user_id = $data['user_id'] ?? '';

            if (!empty($collection_id) && !empty($subject_id) && !empty($user_id)) {
                $collection = Collection::find($collection_id);

                if ($collection) {
                    if (!$collection->is_public) {
                        return response()->json([
                            'message' => 'Cette collection n\'est pas publique et ne peut pas être copiée'
                        ], 403);
                    }

                    $subject = Subject::where('id', $subject_id)
                        ->where('user_id', $user_id)
                        ->first();

                    if (!$subject) {
                        return response()->json([
                            'message' => 'Sujet non trouvé ou vous n\'avez pas la permission de copier vers ce sujet'
                        ], 403);
                    }

                    $newCollection = Collection::create([
                        'name' => $collection->name,
                        'subject_id' => $subject_id,
                        'is_public' => false
                    ]);

                    $flashcards = $collection->flashcards;
                    foreach ($flashcards as $flashcard) {
                        $newCollection->flashcards()->create([
                            'front_face' => $flashcard->front_face,
                            'back_face' => $flashcard->back_face,
                            'last_revision_date' => $flashcard->last_revision_date,
                            'next_revision_date' => $flashcard->next_revision_date,
                            'forgetting_curve_stage' => $flashcard->forgetting_curve_stage,
                            'collection_id' => $newCollection->id
                        ]);
                    }

                    return response()->json([
                        'message' => 'Collection copiée avec succès',
                        'data' => $newCollection
                    ], 200);
                } else {
                    return response()->json([
                        'message' => 'Collection non trouvée'
                    ], 404);
                }
            } else {
                return response()->json([
                    'message' => 'ID de collection, ID du sujet ou ID de l\'utilisateur manquant'
                ], 400);
            }
        } catch (\Throwable $e) {
            Log::error('Erreur lors de la copie de la collection : ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors de la copie de la collection',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getPublicCollections()
    {
        try {
            // Récupère toutes les collections publiques avec leurs flashcards et l'utilisateur associé
            $collections = Collection::where('is_public', true)
                ->with(['flashcards', 'subject.user' => function ($query) {
                    $query->select('id', 'firstname', 'lastname');
                }])
                ->get();

            // Formate la réponse selon votre format demandé
            $formattedCollections = $collections->map(function ($collection) {
                return [
                    'id' => $collection->id,
                    'name' => $collection->name,
                    'lastname' => $collection->subject->user->lastname, // "author_name" pour le nom de l'auteur
                    'firstname' => $collection->subject->user->firstname, // "authorprenom" pour le prénom de l'auteur
                    'flashcards' => $collection->flashcards->map(function ($flashcard) {
                        return [
                            'id' => $flashcard->id,
                            'front_face' => $flashcard->front_face,
                            'back_face' => $flashcard->back_face,
                            'last_revision_date' => $flashcard->last_revision_date,
                            'next_revision_date' => $flashcard->next_revision_date,
                            'forgetting_curve_stage' => $flashcard->forgetting_curve_stage,
                            'collection_id' => $flashcard->collection_id,
                        ];
                    }),
                ];
            });

            return response()->json($formattedCollections, 200);
        } catch (\Throwable $e) {
            Log::error('Erreur lors de la récupération des collections publiques : ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors de la récupération des collections publiques'
            ], 500);
        }
    }
}
