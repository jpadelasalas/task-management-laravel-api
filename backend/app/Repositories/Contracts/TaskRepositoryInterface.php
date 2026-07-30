<?php

namespace App\Repositories\Contracts;

use App\Models\Task;
use App\Models\Team;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Model;

interface TaskRepositoryInterface
{
    public function find(int $id): ?Task;

    public function findOrFail(int $id): Task;

    public function create(array $attributes): Task;

    public function update(Model $task, array $attributes): Task;

    public function delete(Model $task): bool;

    public function paginateForTeam(Team $team, array $filters, int $perPage = 15): LengthAwarePaginator;
}
