<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Collection extends Model
{
    //
    protected $fillable = [
        'id',
        'name',
        'subject_id',
        'is_public'
    ];

    public function subject() {
        return $this->belongsTo(Subject::class);
    }
}
