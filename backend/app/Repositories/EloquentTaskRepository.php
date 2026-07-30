<?php

namespace App\Repositories;

use App\Models\Task;
use App\Models\Team;
use App\Repositories\Contracts\TaskRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Model;

class EloquentTaskRepository extends BaseRepository implements TaskRepositoryInterface
{
    public function __construct(Task $model)
    {
        parent::__construct($model);
    }

    public function find(int $id): ?Task
    {
        return $this->model->find($id);
    }

    public function findOrFail(int $id): Task
    {
        return $this->model->findOrFail($id);
    }

    public function create(array $attributes): Task
    {
        return $this->model->create($attributes);
    }

    public function update(Model $task, array $attributes): Task
    {
        $task->update($attributes);

        return $task;
    }

    public function delete(Model $task): bool
    {
        return (bool) $task->delete();
    }

    public function paginateForTeam(Team $team, array $filters, int $perPage = 15): LengthAwarePaginator
    {
        return $this->model
            ->with(['assignee:id,name', 'creator:id,name'])
            ->where('team_id', $team->id)
            ->when($filters['status'] ?? null, fn ($q, $status) => $q->where('status', $status))
            ->when($filters['priority'] ?? null, fn ($q, $priority) => $q->where('priority', $priority))
            ->when($filters['assigned_to'] ?? null, fn ($q, $assignedTo) => $q->where('assigned_to', $assignedTo))
            ->latest()
            ->paginate($perPage);
    }
}
