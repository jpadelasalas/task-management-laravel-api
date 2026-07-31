<?php

namespace App\Providers;

use App\Models\Task;
use App\Observers\TaskObserver;
use App\Services\Notifications\HttpNotificationService;
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
        $this->app->bind(NotificationService::class, function ($app) {
            if ($app->environment('testing') || ! config('services.node.url')) {
                return $app->make(LogNotificationService::class);
            }

            return $app->make(HttpNotificationService::class);
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Task::observe(TaskObserver::class);
    }
}
