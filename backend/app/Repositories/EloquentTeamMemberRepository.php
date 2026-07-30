<?php

namespace App\Repositories;

use App\Enums\TeamMemberRole;
use App\Models\Team;
use App\Models\TeamMember;
use App\Models\User;
use App\Repositories\Contracts\TeamMemberRepositoryInterface;

class EloquentTeamMemberRepository implements TeamMemberRepositoryInterface
{
    public function __construct(private TeamMember $model)
    {
    }

    public function isLead(User $user, Team $team): bool
    {
        return $this->membershipFor($user, $team)?->role === TeamMemberRole::Lead;
    }

    public function membershipFor(User $user, Team $team): ?TeamMember
    {
        return $this->model
            ->where('team_id', $team->id)
            ->where('user_id', $user->id)
            ->first();
    }

    public function attach(Team $team, User $user, TeamMemberRole $role): TeamMember
    {
        return $this->model->create([
            'team_id' => $team->id,
            'user_id' => $user->id,
            'role' => $role,
        ]);
    }

    public function detach(Team $team, User $user): bool
    {
        return (bool) $this->model
            ->where('team_id', $team->id)
            ->where('user_id', $user->id)
            ->delete();
    }
}
