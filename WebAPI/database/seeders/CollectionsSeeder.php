<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class CollectionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('collections')->insert([
            [
                'name' => 'Principe fondamentaux de base',
                'subject_id' => 5,
                'is_public' => false,
            ],
            [
                'name' => 'Function(), Attributs et méthodes',
                'subject_id' => 5,
                'is_public' => false,
            ],
            [
                'name' => 'Polymorphisme',
                'subject_id' => 5,
                'is_public' => false,
            ],
            [
                'name' => 'Héritage',
                'subject_id' => 5,
                'is_public' => false,
            ],
            [
                'name' => 'Interface/Abstraction',
                'subject_id' => 5,
                'is_public' => false,
            ],
            [
                'name' => 'Ordinateur et parties',
                'subject_id' => 1,
                'is_public' => false,
            ],
            [
                'name' => 'Différent système d\'exploitation',
                'subject_id' => 1,
                'is_public' => false,
            ],
            [
                'name' => 'Sécurité des systèmes informatiques',
                'subject_id' => 2,
                'is_public' => false,
            ],
            [
                'name' => 'Kali Linux',
                'subject_id' => 2,
                'is_public' => false,
            ],
            [
                'name' => 'Attaque et défense',
                'subject_id' => 2,
                'is_public' => false,
            ],
            [
                'name' => 'Éthique de Kant',
                'subject_id' => 4,
                'is_public' => false,
            ],
            [
                'name' => 'Éthique de Mill',
                'subject_id' => 4,
                'is_public' => false,
            ],
            [
                'name' => 'Éthique de Aristote',
                'subject_id' => 4,
                'is_public' => false,
            ],
            [
                'name' => 'Éthique de Confucius',
                'subject_id' => 4,
                'is_public' => false,
            ],
            [
                'name' => 'Éthique de Nietzsche',
                'subject_id' => 4,
                'is_public' => false,
            ],
            [
                'name' => 'Éthique de Sartre',
                'subject_id' => 4,
                'is_public' => false,
            ]
          ]);
    }
}
