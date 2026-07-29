<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@test.com',
            'password' => 'password123',
            'role' => UserRole::Admin,
            'is_active' => true,
        ]);

        User::create([
            'name' => 'Manager User',
            'email' => 'manager@test.com',
            'password' => 'password123',
            'role' => UserRole::Manager,
            'is_active' => true,
        ]);

        User::create([
            'name' => 'Team Member User',
            'email' => 'member@test.com',
            'password' => 'password123',
            'role' => UserRole::TeamMember,
            'is_active' => true,
        ]);
    }
}
