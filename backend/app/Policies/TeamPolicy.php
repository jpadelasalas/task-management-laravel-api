<?php

namespace App\Policies;

use App\Models\Team;
use App\Models\User;
use App\Repositories\Contracts\TeamMemberRepositoryInterface;

class TeamPolicy
{
    public function __construct(private TeamMemberRepositoryInterface $teamMembers)
    {
    }

    public function viewAny(User $user): bool
    {
        return $user->isAdmin() || $user->isManager();
    }

    public function view(User $user, Team $team): bool
    {
        if ($user->isAdmin()) {
            return true;
        }

        return (bool) $this->teamMembers->membershipFor($user, $team);
    }

    public function create(User $user): bool
    {
        return $user->isAdmin() || $user->isManager();
    }

    public function manageMembers(User $user, Team $team): bool
    {
        if ($user->isAdmin()) {
            return true;
        }

        return $this->teamMembers->isLead($user, $team);
    }
}
