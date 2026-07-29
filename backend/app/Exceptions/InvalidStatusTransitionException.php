<?php

namespace App\Exceptions;

use App\Enums\TaskStatus;
use Exception;

class InvalidStatusTransitionException extends Exception
{
    public function __construct(TaskStatus $from, TaskStatus $to)
    {
        parent::__construct("Cannot transition task status from [{$from->value}] to [{$to->value}].");
    }
}
