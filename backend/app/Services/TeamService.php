<?php

namespace App\Services;

use App\Enums\TeamMemberRole;
use App\Models\Team;
use App\Models\TeamMember;
use App\Models\User;
use App\Repositories\Contracts\TeamMemberRepositoryInterface;
use App\Repositories\Contracts\TeamRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class TeamService
{
    public function __construct(
        private TeamRepositoryInterface $teams,
        private TeamMemberRepositoryInterface $teamMembers,
    ) {
    }

    public function list(): LengthAwarePaginator
    {
        return $this->teams->paginate();
    }

    public function getWithMembers(int $id): Team
    {
        return $this->teams->withMembers($id);
    }

    public function createTeam(array $data, User $actingUser): Team
    {
        return DB::transaction(function () use ($data, $actingUser) {
            $team = $this->teams->create([
                ...$data,
                'created_by' => $actingUser->id,
            ]);

            // creator becomes lead automatically, otherwise they'd create a team they can't manage
            $this->teamMembers->attach($team, $actingUser, TeamMemberRole::Lead);

            return $team;
        });
    }

    public function addMember(Team $team, User $user, TeamMemberRole $role): TeamMember
    {
        return $this->teamMembers->attach($team, $user, $role);
    }

    public function removeMember(Team $team, User $user): bool
    {
        return $this->teamMembers->detach($team, $user);
    }
}
