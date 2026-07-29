<?php

namespace App\Services\Notifications;

use App\Enums\TaskStatus;
use App\Models\Task;

interface NotificationService
{
    public function taskAssigned(Task $task): void;

    public function taskStatusChanged(Task $task, TaskStatus $from, TaskStatus $to): void;
}
