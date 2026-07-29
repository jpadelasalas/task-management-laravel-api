<?php

namespace App\Services\Notifications;

use App\Enums\TaskStatus;
use App\Models\Task;
use Illuminate\Support\Facades\Log;

/**
 * Placeholder until the Node notification service exists. Swap the binding
 * in AppServiceProvider for an HttpNotificationService when it's ready —
 * callers depend on the NotificationService interface, not this class.
 */
class LogNotificationService implements NotificationService
{
    public function taskAssigned(Task $task): void
    {
        Log::info('notification.task_assigned', [
            'task_id' => $task->id,
            'assigned_to' => $task->assigned_to,
        ]);
    }

    public function taskStatusChanged(Task $task, TaskStatus $from, TaskStatus $to): void
    {
        Log::info('notification.task_status_changed', [
            'task_id' => $task->id,
            'from' => $from->value,
            'to' => $to->value,
        ]);
    }
}
