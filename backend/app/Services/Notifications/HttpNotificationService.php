<?php

namespace App\Services\Notifications;

use App\Enums\TaskStatus;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Throwable;

class HttpNotificationService implements NotificationService
{
    public function __construct(private Request $request)
    {
    }

    public function taskAssigned(Task $task): void
    {
        $this->send($task, $task->assigned_to, 'assigned', "You've been assigned: {$task->title}");
    }

    public function taskStatusChanged(Task $task, TaskStatus $from, TaskStatus $to): void
    {
        $this->send(
            $task,
            $task->assigned_to,
            'status_changed',
            "{$task->title} moved from {$from->value} to {$to->value}"
        );
    }

    // Fire-and-forget from the caller's point of view: a Node outage or
    // timeout must never fail the task create/status-change request it's
    // reporting on, so failures are logged, not thrown.
    private function send(Task $task, int $userId, string $eventType, string $details): void
    {
        try {
            Http::withToken($this->request->bearerToken())
                ->timeout(2)
                ->post(rtrim(config('services.node.url'), '/').'/api/notifications/send', [
                    'task_id' => $task->id,
                    'user_id' => $userId,
                    'event_type' => $eventType,
                    'details' => $details,
                ])
                ->throw();
        } catch (Throwable $e) {
            Log::warning('notification.node_dispatch_failed', [
                'task_id' => $task->id,
                'event_type' => $eventType,
                'error' => $e->getMessage(),
            ]);
        }
    }
}
