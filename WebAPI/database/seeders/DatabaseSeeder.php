<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Subject;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
  /**
   * Seed the application's database.
   */
  public function run(): void
  {
    $this->call(AdminUserSeeder::class);
    $this->call(UsersSeeder::class);
    $this->call(SubjectsSeeder::class);
    $this->call(CollectionsSeeder::class);
    $this->call(FlashcardsSeeder::class);
  }
}
