<?php

namespace App\Observers;

use App\Models\Task;
use App\Services\Notifications\NotificationService;

class TaskObserver
{
    public function __construct(private NotificationService $notifications)
    {
    }

    public function created(Task $task): void
    {
        $this->notifications->taskAssigned($task);
    }
}
