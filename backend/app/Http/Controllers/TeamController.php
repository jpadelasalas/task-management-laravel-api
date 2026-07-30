<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTeamRequest;
use App\Http\Resources\TeamResource;
use App\Models\Team;
use App\Services\TeamService;

class TeamController extends Controller
{
    public function __construct(private TeamService $teams)
    {
    }

    public function index()
    {
        $this->authorize('viewAny', Team::class);

        return TeamResource::collection($this->teams->list());
    }

    public function store(StoreTeamRequest $request)
    {
        $this->authorize('create', Team::class);

        $team = $this->teams->createTeam($request->validated(), $request->user());

        return TeamResource::make($team)->response()->setStatusCode(201);
    }

    public function show(Team $team)
    {
        $this->authorize('view', $team);

        return TeamResource::make($this->teams->getWithMembers($team->id));
    }
}
