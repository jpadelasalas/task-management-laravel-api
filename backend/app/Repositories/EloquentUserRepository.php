<?php

namespace App\Repositories;

use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Model;

class EloquentUserRepository extends BaseRepository implements UserRepositoryInterface
{
    public function __construct(User $model)
    {
        parent::__construct($model);
    }

    public function find(int $id): ?User
    {
        return $this->model->find($id);
    }

    public function findOrFail(int $id): User
    {
        return $this->model->findOrFail($id);
    }

    public function findByEmail(string $email): ?User
    {
        return $this->model->where('email', $email)->first();
    }

    public function create(array $attributes): User
    {
        return $this->model->create($attributes);
    }

    public function update(Model $user, array $attributes): User
    {
        $user->update($attributes);

        return $user;
    }

    public function paginateWithFilters(array $filters, int $perPage = 15): LengthAwarePaginator
    {
        return $this->model
            ->when($filters['role'] ?? null, fn ($q, $role) => $q->where('role', $role))
            ->when(array_key_exists('is_active', $filters) && $filters['is_active'] !== null, fn ($q) => $q->where('is_active', $filters['is_active']))
            ->latest()
            ->paginate($perPage);
    }
}
