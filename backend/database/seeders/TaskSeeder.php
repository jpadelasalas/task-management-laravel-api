<?php

namespace Database\Seeders;

use App\Enums\TaskPriority;
use App\Enums\TaskStatus;
use App\Models\Task;
use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    public function run(): void
    {
        $engineering = Team::where('name', 'Engineering')->firstOrFail();
        $manager = User::where('email', 'manager@test.com')->firstOrFail();
        $member1 = User::where('email', 'member@test.com')->firstOrFail();

        [$member2, $member3] = $engineering->members()
            ->wherePivot('role', 'member')
            ->where('users.id', '!=', $member1->id)
            ->orderBy('users.id')
            ->take(2)
            ->get();

        Task::create([
            'title' => 'Setup database',
            'description' => 'Provision schema and run initial migrations.',
            'status' => TaskStatus::InProgress,
            'priority' => TaskPriority::High,
            'assigned_to' => $member1->id,
            'created_by' => $manager->id,
            'team_id' => $engineering->id,
        ]);

        Task::create([
            'title' => 'Write API docs',
            'description' => 'Document all public endpoints.',
            'status' => TaskStatus::Pending,
            'priority' => TaskPriority::Medium,
            'assigned_to' => $member2->id,
            'created_by' => $manager->id,
            'team_id' => $engineering->id,
        ]);

        Task::create([
            'title' => 'Fix login bug',
            'description' => 'Users occasionally get logged out mid-session.',
            'status' => TaskStatus::Completed,
            'priority' => TaskPriority::High,
            'assigned_to' => $member1->id,
            'created_by' => $manager->id,
            'team_id' => $engineering->id,
        ]);

        Task::create([
            'title' => 'Design dashboard',
            'description' => 'Wireframe the analytics dashboard layout.',
            'status' => TaskStatus::InProgress,
            'priority' => TaskPriority::Medium,
            'assigned_to' => $member3->id,
            'created_by' => $manager->id,
            'team_id' => $engineering->id,
        ]);
    }
}
