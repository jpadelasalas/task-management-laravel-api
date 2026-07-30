<?php

namespace App\Repositories\Contracts;

use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface UserRepositoryInterface
{
    public function find(int $id): ?User;

    public function findOrFail(int $id): User;

    public function findByEmail(string $email): ?User;

    public function create(array $attributes): User;

    public function update(User $user, array $attributes): User;

    public function paginateWithFilters(array $filters, int $perPage = 15): LengthAwarePaginator;
}
