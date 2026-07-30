<?php

namespace App\Repositories\Contracts;

use App\Models\Team;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

interface TeamRepositoryInterface
{
    public function find(int $id): ?Team;

    public function findOrFail(int $id): Team;

    public function withMembers(int $id): Team;

    public function paginate(int $perPage = 15): LengthAwarePaginator;

    public function create(array $attributes): Team;

    /**
     * @return Collection<int, Team>
     */
    public function teamsLedBy(User $user): Collection;
}
