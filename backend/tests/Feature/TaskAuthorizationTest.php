<?php

namespace Tests\Feature;

use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskAuthorizationTest extends TestCase
{
    use RefreshDatabase;

    public function test_non_creator_team_member_cannot_delete_task(): void
    {
        $creator = User::factory()->create();
        $assignee = User::factory()->create();
        $task = Task::factory()->create(['created_by' => $creator->id, 'assigned_to' => $assignee->id]);

        $response = $this->actingAs($assignee, 'api')->deleteJson("/api/tasks/{$task->id}");

        $response->assertForbidden();
    }

    public function test_creator_can_delete_task(): void
    {
        $creator = User::factory()->create();
        $task = Task::factory()->create(['created_by' => $creator->id, 'assigned_to' => $creator->id]);

        $response = $this->actingAs($creator, 'api')->deleteJson("/api/tasks/{$task->id}");

        $response->assertNoContent();
    }
}
