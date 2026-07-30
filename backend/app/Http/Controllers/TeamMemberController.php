<?php

namespace App\Http\Controllers;

use App\Enums\TeamMemberRole;
use App\Http\Requests\AddTeamMemberRequest;
use App\Models\Team;
use App\Models\User;
use App\Services\TeamService;

class TeamMemberController extends Controller
{
    public function __construct(private TeamService $teams)
    {
    }

    public function store(AddTeamMemberRequest $request, Team $team)
    {
        $this->authorize('manageMembers', $team);

        $user = User::findOrFail($request->validated('user_id'));
        $role = TeamMemberRole::from($request->validated('role'));

        $membership = $this->teams->addMember($team, $user, $role);

        return response()->json(['data' => $membership], 201);
    }

    public function destroy(Team $team, User $user)
    {
        $this->authorize('manageMembers', $team);

        $this->teams->removeMember($team, $user);

        return response()->json(null, 204);
    }
}
