<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Subject;
use App\Models\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class CollectionController extends Controller
{
    public function getUserCollections(Request $request)
    {
        $data = $request->all();
        $subject_id = $data['subject_id'] ?? '';
        Log::debug($data);

        if (!empty($subject_id)){
            $collections = Collection::where('subject_id', $subject_id)->get();

            return response()->json($collections);
        } else {
            return response()->json([
                'message' => 'Erreur lors de la création de la collection'
            ], 500);
        }

    }

    public function createCollection(Request $request)
    {
        try {
            $data = $request->all();
            $subject_id = $data['subject_id'] ?? '';
            $collection_name = $data['collection_name'] ?? '';

            if (!empty($subject_id) && !empty($collection_name)){
                DB::table('collections')->insert(['name' => $collection_name, 'subject_id' => $subject_id]);

                return response()->json([
                    'message' => 'Collection créée avec succès'
                ], 200);
            }
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Erreur lors de la création de la collection'
            ], 500);
        }
    }

    public function updateCollection(Request $request)
    {
        try {
            $data = $request->all();
            $collection_id = $data['collection_id'] ?? '';
            $collection_name = $data['collection_name'] ?? '';

            if (!empty($collection_name) && !empty($collection_id)){
                DB::table('collections')
                    ->where('id', $collection_id)
                    ->update(['name' => $collection_name]);

                return response()->json([
                    'message' => 'Collection modifiée avec succès'
                ], 200);
            }
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Erreur lors de la modification de la collection'
            ], 500);
        }
    }

    public function deleteCollection(Request $request)
    {
        try {
            $data = $request->all();
            $collection_id = $data['collection_id'] ?? '';

            if (!empty($collection_id)){
                DB::table('collections')
                    ->where('id', $collection_id)
                    ->delete();

                return response()->json([
                    'message' => 'Collection supprimée avec succès'
                ], 200);
            }
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Erreur lors de la suppression de la collection'
            ], 500);
        }
    }
}
