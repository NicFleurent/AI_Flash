<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Subject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;


class SubjectController extends Controller
{
    public function getUserSubjects()
    {
        // $user = Auth::user();
        // Log::debug($user);
        // Log::debug($user->id);

        $subjects =  DB::table('subjects')
                        ->select('subjects.id', 'subjects.name')
                        ->join('users', 'users.id', '=', 'subjects.user_id')
                        ->where('users.id', 1)
                        // ->where('users.id', $user->id)
                        ->get();

        $collection = DB::table('collections')
                        ->join('subjects', 'subjects.id', '=', 'collections.subject_id')
                        ->join('users', 'users.id', '=', 'subjects.user_id')
                        // ->where('users.id', $user->id)
                        ->where('users.id', 1)
                        ->groupBy('subjects.id')
                        ->select('subjects.id', DB::raw('count(collections.id) as count'))
                        ->get();
        
        $data = $subjects->map(function ($subject) use ($collection) {
                $subjectCount = $collection->firstWhere('id', $subject->id);
                $subject->count = $subjectCount ? $subjectCount->count : 0;
                return $subject;
        });

        return response()->json($data);
    }

    public function createUserSubject(Request $request)
    {
        try {
            // $user = Auth::user();
            // Log::debug($user);
            // Log::debug($user->id);


            $data = $request->all();
            Log::debug($data);

            $name = $data['subject_name'] ?? '';
            Log::debug($name);

            if (!empty($name)){
                Log::debug("Name not emptyyyyyyyyyyyy");
                DB::table('subjects')->insert(['name' => $name, 'user_id' => 1]);
                //DB::table('subjects')->insert(['name' => $name, 'user_id' => $user->id]);

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

    public function editUserSubject(Request $request)
    {
        try {
            // $user = Auth::user();
            // Log::debug($user);
            // Log::debug($user->id);


            $data = $request->all();
            Log::debug($data);

            $subject_name = $data['subject_name'] ?? '';
            $subject_id = $data['subject_id'] ?? '';

            if (!empty($subject_name) && !empty($subject_id)){
                Log::debug("Name not emptyyyyyyyyyyyy");
                DB::table('subjects')
                    ->where('user_id', 1)
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
}
