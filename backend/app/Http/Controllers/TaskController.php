<?php

namespace App\Http\Controllers;

use App\Enums\TaskStatus;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Requests\UpdateTaskStatusRequest;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use App\Models\Team;
use App\Services\TaskService;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function __construct(private TaskService $tasks)
    {
    }

    public function index(Request $request, Team $team)
    {
        $this->authorize('viewAny', [Task::class, $team]);

        $filters = $request->only(['status', 'priority', 'assigned_to']);

        if ($request->user()->isTeamMember()) {
            $filters['assigned_to'] = $request->user()->id;
        }

        return TaskResource::collection($this->tasks->listForTeam($team, $filters));
    }

    public function store(StoreTaskRequest $request, Team $team)
    {
        $this->authorize('create', [Task::class, $team]);

        $task = $this->tasks->createTask($team, $request->validated(), $request->user());

        return TaskResource::make($task)->response()->setStatusCode(201);
    }

    public function show(Task $task)
    {
        $this->authorize('view', $task);

        return TaskResource::make($task->load(['assignee:id,name', 'creator:id,name']));
    }

    public function update(UpdateTaskRequest $request, Task $task)
    {
        $this->authorize('update', $task);

        $updated = $this->tasks->updateTask($task, $request->validated(), $request->user());

        return TaskResource::make($updated);
    }

    public function destroy(Task $task)
    {
        $this->authorize('delete', $task);

        $this->tasks->deleteTask($task);

        return response()->json(null, 204);
    }

    public function updateStatus(UpdateTaskStatusRequest $request, Task $task)
    {
        $this->authorize('updateStatus', $task);

        $updated = $this->tasks->updateStatus($task, TaskStatus::from($request->validated('status')));

        return TaskResource::make($updated);
    }
}
