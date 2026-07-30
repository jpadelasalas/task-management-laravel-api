<?php

namespace App\Policies;

use App\Models\Task;
use App\Models\Team;
use App\Models\User;
use App\Repositories\Contracts\TeamMemberRepositoryInterface;

class TaskPolicy
{
    public function __construct(private TeamMemberRepositoryInterface $teamMembers)
    {
    }

    public function viewAny(User $user, Team $team): bool
    {
        if ($user->isAdmin() || $user->isTeamMember()) {
            return true;
        }

        return $this->teamMembers->isLead($user, $team);
    }

    public function view(User $user, Task $task): bool
    {
        if ($user->isAdmin()) {
            return true;
        }

        if ($user->isTeamMember()) {
            return $task->assigned_to === $user->id;
        }

        return $this->teamMembers->isLead($user, $task->team);
    }

    public function create(User $user, Team $team): bool
    {
        if ($user->isAdmin()) {
            return true;
        }

        return $this->teamMembers->isLead($user, $team);
    }

    public function update(User $user, Task $task): bool
    {
        if ($user->isAdmin()) {
            return true;
        }

        if ($user->isTeamMember()) {
            return $task->assigned_to === $user->id;
        }

        return $this->teamMembers->isLead($user, $task->team);
    }

    public function updateStatus(User $user, Task $task): bool
    {
        return $this->update($user, $task);
    }

    public function delete(User $user, Task $task): bool
    {
        if ($user->isAdmin()) {
            return true;
        }

        return $task->created_by === $user->id;
    }
}
