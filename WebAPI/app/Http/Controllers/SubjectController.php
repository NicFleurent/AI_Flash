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

            $subjectId = DB::table('subjects')->insertGetId([
                'name' => $subject_name,
                'user_id' => $user_id,
            ]);

            $subject = DB::table('subjects')->where('id', $subjectId)->first();

            return response()->json([
                'message' => 'subject.error.create.success',
                'data' => $subject
            ], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'subject.error.create.error'
            ], 500);
        }
    }

    public function updateSubject(Request $request)
    {
        try {
            $data = $request->all();

            $subject_name = $data['subject_name'] ?? '';
            $subject_id = $data['subject_id'] ?? '';

            DB::table('subjects')
                ->where('id', $subject_id)
                ->update(['name' => $subject_name]);

            return response()->json([
                'message' => 'subject.error.update.success'
            ], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'subject.error.update.error'
            ], 500);
        }
    }

    public function deleteSubject(Request $request)
    {
        try {
            $data = $request->all();
            $subject_id = $data['subject_id'] ?? '';

            DB::table('collections')->where('subject_id', $subject_id)->delete();
            DB::table('subjects')->where('id', $subject_id)->delete();

            return response()->json([
                'message' => 'subject.error.delete.success'
            ], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'subject.error.delete.error'
            ], 500);
        }
    }
}
