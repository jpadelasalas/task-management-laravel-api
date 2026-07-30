<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Requests\UpdateUserStatusRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function __construct(private UserService $users)
    {
    }

    public function index(Request $request)
    {
        $this->authorize('viewAny', User::class);

        $users = $this->users->list([
            'role' => $request->query('role'),
            'is_active' => $request->has('is_active') ? $request->boolean('is_active') : null,
        ]);

        return UserResource::collection($users);
    }

    public function store(StoreUserRequest $request)
    {
        $this->authorize('create', User::class);

        $user = $this->users->createUser($request->validated(), $request->user());

        return UserResource::make($user)->response()->setStatusCode(201);
    }

    public function show(User $user)
    {
        $this->authorize('view', $user);

        return UserResource::make($user);
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        $this->authorize('update', $user);

        $updated = $this->users->updateUser($user, $request->validated());

        return UserResource::make($updated);
    }

    public function toggleStatus(UpdateUserStatusRequest $request, User $user)
    {
        $this->authorize('toggleStatus', $user);

        $updated = $this->users->toggleStatus($user, $request->boolean('is_active'));

        return UserResource::make($updated);
    }
}
