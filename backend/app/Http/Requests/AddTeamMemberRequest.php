<?php

namespace App\Http\Requests;

use App\Enums\TeamMemberRole;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AddTeamMemberRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $teamId = $this->route('team')?->id;

        return [
            'user_id' => [
                'required',
                'integer',
                'exists:users,id',
                Rule::unique('team_members', 'user_id')->where('team_id', $teamId),
            ],
            'role' => ['required', Rule::enum(TeamMemberRole::class)],
        ];
    }
}
