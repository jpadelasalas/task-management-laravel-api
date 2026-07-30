<?php

namespace App\Providers;

use App\Models\Task;
use App\Observers\TaskObserver;
use App\Services\Notifications\LogNotificationService;
use App\Services\Notifications\NotificationService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(NotificationService::class, LogNotificationService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Task::observe(TaskObserver::class);
    }
}
