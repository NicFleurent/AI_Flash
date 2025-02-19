<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class SubjectsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('subjects')->insert([
            [
                'name' => 'Système d\'exploitation',
                'user_id' => 1,
            ],
            [
                'name' => 'Cybersécurité',
                'user_id' => 1,
            ],
            [
                'name' => 'Calcul différentiel',
                'user_id' => 1,
            ],
            [
                'name' => 'Philosophie et éthique',
                'user_id' => 1,
            ],
            [
                'name' => 'Programmation orientée objet',
                'user_id' => 1,
            ],
          ]);
    }
}
