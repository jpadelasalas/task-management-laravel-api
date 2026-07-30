<?php

namespace App\Http\Requests;

use App\Enums\TaskPriority;
use App\Models\TeamMember;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreTaskRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'priority' => ['required', Rule::enum(TaskPriority::class)],
            'due_date' => ['nullable', 'date'],
            'assigned_to' => [
                'required',
                'integer',
                'exists:users,id',
                function ($attribute, $value, $fail) {
                    $team = $this->route('team');

                    if (! TeamMember::where('team_id', $team->id)->where('user_id', $value)->exists()) {
                        $fail('The assigned user must be a member of this team.');
                    }
                },
            ],
        ];
    }
}
