<?php

namespace App\Repositories\Contracts;

use App\Enums\TeamMemberRole;
use App\Models\Team;
use App\Models\TeamMember;
use App\Models\User;

interface TeamMemberRepositoryInterface
{
    public function isLead(User $user, Team $team): bool;

    public function membershipFor(User $user, Team $team): ?TeamMember;

    public function attach(Team $team, User $user, TeamMemberRole $role): TeamMember;

    public function detach(Team $team, User $user): bool;
}
