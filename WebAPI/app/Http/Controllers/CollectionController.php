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
      $collections = Collection::select('id','name', 'subject_id')
                                ->whereIn('subject_id', $subjects_id)
                                ->whereHas('flashcards', function ($query) use ($today) {
                                  $query->whereDate('next_revision_date','<=',$today)
                                        ->whereDate('last_revision_date','<',$today)
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
                                            ->whereDate('last_revision_date','<',$today)
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

            DB::table('collections')->insert(['name' => $collection_name, 'subject_id' => $subject_id]);

            return response()->json([
                'message' => 'subject.collections.error.create.success'
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
}
