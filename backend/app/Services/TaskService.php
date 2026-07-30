<?php

namespace App\Services;

use App\Enums\TaskStatus;
use App\Exceptions\InvalidStatusTransitionException;
use App\Models\Task;
use App\Models\Team;
use App\Models\User;
use App\Repositories\Contracts\TaskRepositoryInterface;
use App\Services\Notifications\NotificationService;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class TaskService
{
    public function __construct(
        private TaskRepositoryInterface $tasks,
        private NotificationService $notifications,
    ) {
    }

    public function listForTeam(Team $team, array $filters): LengthAwarePaginator
    {
        return $this->tasks->paginateForTeam($team, $filters);
    }

    public function createTask(Team $team, array $data, User $actingUser): Task
    {
        return $this->tasks->create([
            ...$data,
            'status' => TaskStatus::Pending,
            'team_id' => $team->id,
            'created_by' => $actingUser->id,
        ]);
    }

    public function updateTask(Task $task, array $data, User $actingUser): Task
    {
        // team members can only edit description here, not reassign/reprioritize/reschedule
        if ($actingUser->isTeamMember()) {
            $data = array_intersect_key($data, array_flip(['description']));
        }

        return $this->tasks->update($task, $data);
    }

    public function updateStatus(Task $task, TaskStatus $newStatus): Task
    {
        $from = $task->status;

        if (! $from->canTransitionTo($newStatus)) {
            throw new InvalidStatusTransitionException($from, $newStatus);
        }

        return DB::transaction(function () use ($task, $from, $newStatus) {
            $updated = $this->tasks->update($task, ['status' => $newStatus]);

            $this->notifications->taskStatusChanged($updated, $from, $newStatus);

            return $updated;
        });
    }

    public function deleteTask(Task $task): bool
    {
        return $this->tasks->delete($task);
    }
}
