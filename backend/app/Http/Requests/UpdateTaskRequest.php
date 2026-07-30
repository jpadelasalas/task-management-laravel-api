<?php

namespace App\Http\Requests;

use App\Enums\TaskPriority;
use App\Models\TeamMember;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTaskRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['sometimes', 'string', 'max:255'],
            'description' => ['sometimes', 'nullable', 'string'],
            'priority' => ['sometimes', Rule::enum(TaskPriority::class)],
            'due_date' => ['sometimes', 'nullable', 'date'],
            'assigned_to' => [
                'sometimes',
                'integer',
                'exists:users,id',
                function ($attribute, $value, $fail) {
                    $teamId = $this->route('task')?->team_id;

                    if (! TeamMember::where('team_id', $teamId)->where('user_id', $value)->exists()) {
                        $fail('The assigned user must be a member of this team.');
                    }
                },
            ],
        ];
    }
}
