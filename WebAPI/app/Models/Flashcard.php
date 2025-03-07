<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Flashcard extends Model
{
    protected $table = 'flashcards';

    protected $fillable = [
        'front_face',
        'back_face',
        'last_revision_date',
        'next_revision_date',
        'forgetting_curve_stage',
        'collection_id'
    ];
}
