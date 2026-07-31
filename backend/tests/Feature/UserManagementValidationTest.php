<?php

namespace Tests\Feature;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserManagementValidationTest extends TestCase
{
    use RefreshDatabase;

    public function test_manager_creating_admin_is_forbidden(): void
    {
        $manager = User::factory()->role(UserRole::Manager)->create();

        $response = $this->actingAs($manager, 'api')->postJson('/api/users', [
            'name' => 'New Admin',
            'email' => 'new-admin@test.com',
            'password' => 'password123',
            'role' => 'admin',
        ]);

        $response->assertForbidden();
    }

    public function test_admin_creating_user_succeeds(): void
    {
        $admin = User::factory()->role(UserRole::Admin)->create();

        $response = $this->actingAs($admin, 'api')->postJson('/api/users', [
            'name' => 'New Member',
            'email' => 'new-member@test.com',
            'password' => 'password123',
            'role' => 'team_member',
        ]);

        $response->assertCreated();
    }

    public function test_duplicate_email_is_rejected(): void
    {
        $admin = User::factory()->role(UserRole::Admin)->create();
        User::factory()->create(['email' => 'taken@test.com']);

        $response = $this->actingAs($admin, 'api')->postJson('/api/users', [
            'name' => 'Someone',
            'email' => 'taken@test.com',
            'password' => 'password123',
            'role' => 'team_member',
        ]);

        $response->assertStatus(422);
    }
}
