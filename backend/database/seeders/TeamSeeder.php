<?php

namespace Database\Seeders;

use App\Enums\TeamMemberRole;
use App\Enums\UserRole;
use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Seeder;

class TeamSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::where('email', 'admin@test.com')->firstOrFail();
        $manager = User::where('email', 'manager@test.com')->firstOrFail();
        $member = User::where('email', 'member@test.com')->firstOrFail();

        $engineering = Team::create(['name' => 'Engineering', 'created_by' => $admin->id]);
        $marketing = Team::create(['name' => 'Marketing', 'created_by' => $admin->id]);
        $sales = Team::create(['name' => 'Sales', 'created_by' => $admin->id]);

        // Engineering: manager (lead) + member + 2 more team members = 4
        $engineering->members()->attach($manager->id, ['role' => TeamMemberRole::Lead->value]);
        $engineering->members()->attach($member->id, ['role' => TeamMemberRole::Member->value]);
        $engineering->members()->attach(
            User::factory(2)->role(UserRole::TeamMember)->create(),
            ['role' => TeamMemberRole::Member->value]
        );

        // Marketing: manager (lead) + 2 more team members = 3
        $marketing->members()->attach($manager->id, ['role' => TeamMemberRole::Lead->value]);
        $marketing->members()->attach(
            User::factory(2)->role(UserRole::TeamMember)->create(),
            ['role' => TeamMemberRole::Member->value]
        );

        // Sales: a dedicated lead + 1 team member = 2
        $salesLead = User::factory()->role(UserRole::Manager)->create(['name' => 'Sales Lead']);
        $sales->members()->attach($salesLead->id, ['role' => TeamMemberRole::Lead->value]);
        $sales->members()->attach(
            User::factory()->role(UserRole::TeamMember)->create(),
            ['role' => TeamMemberRole::Member->value]
        );
    }
}
