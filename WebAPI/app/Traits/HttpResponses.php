<?php

namespace App\Traits;

trait HttpResponses{
    protected function success($data, $message = null, $code = 200)
    {
        return response()->json([
            'status' => 'La requête a fonctionnée.',
            'message' => $message,
            'data' => $data
        ], $code);
    }
    
    protected function error($data, $message = null, $code)
    {
        return response()->json([
            'status' => 'Il y a eu une erreur. La requête a échouée.',
            'message' => $message,
            'data' => $data
        ], $code);
    }
}