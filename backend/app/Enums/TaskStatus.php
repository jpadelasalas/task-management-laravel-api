<?php

namespace App\Enums;

enum TaskStatus: string
{
    case Pending = 'pending';
    case InProgress = 'in_progress';
    case Completed = 'completed';
    case Cancelled = 'cancelled';

    public function canTransitionTo(self $next): bool
    {
        return match ($this) {
            self::Pending => in_array($next, [self::InProgress, self::Cancelled], true),
            self::InProgress => in_array($next, [self::Completed, self::Pending], true),
            self::Completed, self::Cancelled => false,
        };
    }
}
