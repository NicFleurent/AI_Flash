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

        $subjects = Subject::where('user_id', $user_id)
            ->withCount('collections')
            ->get();

        return response()->json($subjects);
    }

    public function createSubject(Request $request)
    {
        try {
            $data = $request->all();
            $subject_name = $data['subject_name'] ?? '';
            $user_id = $data['user_id'] ?? '';

            if (!empty($subject_name) && !empty($user_id)) {
                $id = DB::table('subjects')->insertGetId([
                    'name' => $subject_name,
                    'user_id' => $user_id
                ]);

                $subject = DB::table('subjects')->where('id', $id)->first();

                return response()->json([
                    'message' => 'Matière créée avec succès',
                    'data' => $subject
                ], 200);
            }
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Erreur lors de la création de la matière'
            ], 500);
        }
    }

    public function updateSubject(Request $request)
    {
        try {
            $data = $request->all();

            $subject_name = $data['subject_name'] ?? '';
            $subject_id = $data['subject_id'] ?? '';

            if (!empty($subject_name) && !empty($subject_id)) {
                DB::table('subjects')
                    ->where('id', $subject_id)
                    ->update(['name' => $subject_name]);

                return response()->json([
                    'message' => 'Matière modifiée avec succès'
                ], 200);
            }
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Erreur lors de la modification de la matière'
            ], 500);
        }
    }

    public function deleteSubject(Request $request)
    {
        try {
            $data = $request->all();
            $subject_id = $data['subject_id'] ?? '';

            if (!empty($subject_id)) {
                DB::table('collections')->where('subject_id', $subject_id)->delete();
                DB::table('subjects')->where('id', $subject_id)->delete();

                return response()->json([
                    'message' => 'Matière supprimée avec succès'
                ], 200);
            }
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Erreur lors de la suppression de la matière'
            ], 500);
        }
    }
}
