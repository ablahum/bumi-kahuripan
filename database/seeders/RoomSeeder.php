<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('rooms')->insert([
            'number' => 101,
            'price' => 350000,
            'status_id' => 1,
            'category_id' => 1
            // 'number' => 102,
            // 'price' => 250000,
            // 'status' => "available",
            // 'category_id' => 2
        ]);
    }
}
