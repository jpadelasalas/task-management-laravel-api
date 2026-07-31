<?php

namespace Tests\Feature;

use App\Enums\TaskStatus;
use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskStatusTransitionTest extends TestCase
{
    use RefreshDatabase;

    public function test_pending_to_in_progress_succeeds(): void
    {
        $user = User::factory()->create();
        $task = Task::factory()->create(['assigned_to' => $user->id, 'status' => TaskStatus::Pending]);

        $response = $this->actingAs($user, 'api')
            ->patchJson("/api/tasks/{$task->id}/status", ['status' => 'in_progress']);

        $response->assertOk()->assertJsonPath('data.status', 'in_progress');
    }

    public function test_pending_to_completed_is_rejected(): void
    {
        $user = User::factory()->create();
        $task = Task::factory()->create(['assigned_to' => $user->id, 'status' => TaskStatus::Pending]);

        $response = $this->actingAs($user, 'api')
            ->patchJson("/api/tasks/{$task->id}/status", ['status' => 'completed']);

        $response->assertStatus(422);
    }
}
