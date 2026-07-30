<?php

namespace App\Services;

use App\Enums\UserRole;
use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;
use Illuminate\Auth\AuthenticationException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthService
{
    public function __construct(private UserRepositoryInterface $users)
    {
    }

    /**
     * @return array{user: User, token: string}
     */
    public function register(array $data): array
    {
        $user = $this->users->create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => $data['password'],
            // don't trust a role from self-registration, always start as team_member
            'role' => UserRole::TeamMember,
            'is_active' => true,
        ]);

        return ['user' => $user, 'token' => JWTAuth::fromUser($user)];
    }

    /**
     * @return array{user: User, token: string}
     */
    public function login(string $email, string $password): array
    {
        $token = auth('api')->attempt(['email' => $email, 'password' => $password]);

        if (! $token) {
            throw new AuthenticationException('Invalid credentials.');
        }

        $user = auth('api')->user();

        if (! $user->is_active) {
            auth('api')->logout();
            throw new AuthenticationException('Your account is inactive.');
        }

        return ['user' => $user, 'token' => $token];
    }

    public function logout(): void
    {
        auth('api')->logout();
    }
}
