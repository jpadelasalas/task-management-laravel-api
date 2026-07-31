<?php

namespace Tests\Feature;

use App\Enums\TeamMemberRole;
use App\Enums\UserRole;
use App\Models\Task;
use App\Models\Team;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskTeamScopingTest extends TestCase
{
    use RefreshDatabase;

    public function test_manager_blocked_from_other_teams_tasks(): void
    {
        $manager = User::factory()->role(UserRole::Manager)->create();
        $teamA = Team::factory()->create();
        $teamB = Team::factory()->create();
        $teamA->members()->attach($manager->id, ['role' => TeamMemberRole::Lead->value]);
        Task::factory()->create(['team_id' => $teamB->id]);

        $response = $this->actingAs($manager, 'api')->getJson("/api/teams/{$teamB->id}/tasks");

        $response->assertForbidden();
    }

    public function test_manager_allowed_on_own_team_tasks(): void
    {
        $manager = User::factory()->role(UserRole::Manager)->create();
        $teamA = Team::factory()->create();
        $teamA->members()->attach($manager->id, ['role' => TeamMemberRole::Lead->value]);
        Task::factory()->create(['team_id' => $teamA->id]);

        $response = $this->actingAs($manager, 'api')->getJson("/api/teams/{$teamA->id}/tasks");

        $response->assertOk()->assertJsonCount(1, 'data');
    }
}
