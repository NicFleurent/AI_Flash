<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Subject;
use Illuminate\Http\Request;

class CollectionController extends Controller
{
    public function getUserCollections($subject_id)
    {
        $collection = DB::table('collections')
                        ->join('subjects', 'subjects.id', '=', 'collections.subject_id')
                        ->join('users', 'users.id', '=', 'subjects.user_id')
                        ->where('users.id', 1)
                        ->where('subjects.id', $subject_id)
                        ->select('collections.name')
                        ->get();
        
        // $data = $subjects->map(function ($subject) use ($collection) {
        //         $subjectCount = $collection->firstWhere('id', $subject->id);
        //         $subject->count = $subjectCount ? $subjectCount->count : 0;
        //         return $subject;
        // });

        return response()->json($collection);
    }
}
