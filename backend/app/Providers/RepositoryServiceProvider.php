<?php

namespace App\Providers;

use App\Repositories\Contracts\TaskRepositoryInterface;
use App\Repositories\Contracts\TeamMemberRepositoryInterface;
use App\Repositories\Contracts\TeamRepositoryInterface;
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Repositories\EloquentTaskRepository;
use App\Repositories\EloquentTeamMemberRepository;
use App\Repositories\EloquentTeamRepository;
use App\Repositories\EloquentUserRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(UserRepositoryInterface::class, EloquentUserRepository::class);
        $this->app->bind(TeamRepositoryInterface::class, EloquentTeamRepository::class);
        $this->app->bind(TeamMemberRepositoryInterface::class, EloquentTeamMemberRepository::class);
        $this->app->bind(TaskRepositoryInterface::class, EloquentTaskRepository::class);
    }
}
