<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class FlashcardsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('flashcards')->insert([
            [
                'front_face' => 'Paris',
                'back_face' => 'Capitale de la France',
                'next_revision_date' => Carbon::now()->addDays(1),
                'forgetting_curve_stage' => 1,
                'collection_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'front_face' => 'Berlin',
                'back_face' => 'Capitale de l\'Allemagne',
                'next_revision_date' => Carbon::now()->addDays(2),
                'forgetting_curve_stage' => 1,
                'collection_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'front_face' => 'Rome',
                'back_face' => 'Capitale de l\'Italie',
                'next_revision_date' => Carbon::now()->addDays(3),
                'forgetting_curve_stage' => 1,
                'collection_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'front_face' => 'Madrid',
                'back_face' => 'Capitale de l\'Espagne',
                'next_revision_date' => Carbon::now()->addDays(4),
                'forgetting_curve_stage' => 1,
                'collection_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'front_face' => 'Lisbonne',
                'back_face' => 'Capitale du Portugal',
                'next_revision_date' => Carbon::now()->addDays(5),
                'forgetting_curve_stage' => 1,
                'collection_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
