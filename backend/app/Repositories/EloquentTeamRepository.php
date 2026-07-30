<?php

namespace App\Repositories;

use App\Enums\TeamMemberRole;
use App\Models\Team;
use App\Models\User;
use App\Repositories\Contracts\TeamRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class EloquentTeamRepository extends BaseRepository implements TeamRepositoryInterface
{
    public function __construct(Team $model)
    {
        parent::__construct($model);
    }

    public function find(int $id): ?Team
    {
        return $this->model->find($id);
    }

    public function findOrFail(int $id): Team
    {
        return $this->model->findOrFail($id);
    }

    public function withMembers(int $id): Team
    {
        return $this->model->with('members')->findOrFail($id);
    }

    public function paginate(int $perPage = 15): LengthAwarePaginator
    {
        return $this->model->query()->paginate($perPage);
    }

    public function create(array $attributes): Team
    {
        return $this->model->create($attributes);
    }

    public function teamsLedBy(User $user): Collection
    {
        return $user->teams()->wherePivot('role', TeamMemberRole::Lead->value)->get();
    }
}
