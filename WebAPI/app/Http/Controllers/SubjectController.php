<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Subject;
use App\Models\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;


class SubjectController extends Controller
{
    public function getUserSubjects()
    {
        $user = auth()->user();
        $user_id = $user->id;
        Log::debug($user_id);

        // $subjects =  DB::table('subjects')
        //                 ->select('subjects.id', 'subjects.name')
        //                 ->join('users', 'users.id', '=', 'subjects.user_id')
        //                 ->where('users.id', $user_id)
        //                 ->get();

        // $collection = DB::table('collections')
        //                 ->join('subjects', 'subjects.id', '=', 'collections.subject_id')
        //                 ->join('users', 'users.id', '=', 'subjects.user_id')
        //                 ->where('users.id', $user_id)
        //                 ->groupBy('subjects.id')
        //                 ->select('subjects.id', DB::raw('count(collections.id) as count'))
        //                 ->get();
        
        // $data = $subjects->map(function ($subject) use ($collection) {
        //         $subjectCount = $collection->firstWhere('id', $subject->id);
        //         $subject->count = $subjectCount ? $subjectCount->count : 0;
        //         return $subject;
        // });

        $subjects = Subject::where('user_id', $user_id)
                    ->withCount('collections') 
                    ->get();
        
        Log::debug($subjects);

        return response()->json($subjects);
    }

    public function createSubject(Request $request)
    {
        try {
            $data = $request->all();
            Log::debug($data);

            $subject_name = $data['subject_name'] ?? '';
            Log::debug($subject_name);

            $user_id = $data['user_id'] ?? '';
            Log::debug($user_id);

            if (!empty($subject_name) && !empty($user_id)){
                Log::debug("Name and id not emptyyyyyyyyyyyy");
                DB::table('subjects')->insert(['name' => $subject_name, 'user_id' => $user_id]);

                return response()->json([
                    'message' => 'Matière créée avec succès'
                ], 200);
            }
        } catch (\Throwable $e) {
            Log::debug("Erreur lors de l'insertion: " . $e->getMessage());

            return response()->json([
                'message' => 'Erreur lors de la création de la matière'
            ], 500);
        }
    }

    public function editSubject(Request $request)
    {
        try {
            $data = $request->all();
            Log::debug($data);

            $subject_name = $data['subject_name'] ?? '';
            $subject_id = $data['subject_id'] ?? '';
            $user_id = $data['user_id'] ?? '';

            if (!empty($subject_name) && !empty($subject_id) && !empty($user_id)){
                Log::debug("Name not emptyyyyyyyyyyyy");
                DB::table('subjects')
                    ->where('user_id', $user_id)
                    ->where('id', $subject_id)
                    ->update(['name' => $subject_name]);

                return response()->json([
                    'message' => 'Matière modifiée avec succès'
                ], 200);
            }
        } catch (\Throwable $e) {
            Log::debug("Erreur lors de la modification: " . $e->getMessage());

            return response()->json([
                'message' => 'Erreur lors de la modification de la matière'
            ], 500);
        }
    }

    public function deleteSubject(Request $request)
    {
        try {
            $data = $request->all();
            Log::debug($data);

            $subject_id = $data['subject_id'] ?? '';
            $user_id = $data['user_id'] ?? '';

            if (!empty($subject_id) && !empty($user_id)){
                Log::debug("Name not emptyyyyyyyyyyyy");
                DB::table('subjects')
                    ->where('user_id', $user_id)
                    ->where('id', $subject_id)
                    ->delete();

                return response()->json([
                    'message' => 'Matière supprimée avec succès'
                ], 200);
            }
        } catch (\Throwable $e) {
            Log::debug("Erreur lors de la suppression: " . $e->getMessage());

            return response()->json([
                'message' => 'Erreur lors de la suppression de la matière'
            ], 500);
        }
    }


}
