<?php

namespace App\Services;

use App\Enums\UserRole;
use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class UserService
{
    public function __construct(private UserRepositoryInterface $users)
    {
    }

    public function list(array $filters): LengthAwarePaginator
    {
        return $this->users->paginateWithFilters($filters);
    }

    public function createUser(array $data, User $actingUser): User
    {
        $role = UserRole::from($data['role']);

        if ($actingUser->isManager() && $role !== UserRole::TeamMember) {
            throw new AuthorizationException('Managers may only create team members.');
        }

        return $this->users->create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => $data['password'],
            'role' => $role,
            'is_active' => true,
        ]);
    }

    public function updateUser(User $target, array $data): User
    {
        return $this->users->update($target, $data);
    }

    public function toggleStatus(User $target, bool $isActive): User
    {
        return $this->users->update($target, ['is_active' => $isActive]);
    }
}
