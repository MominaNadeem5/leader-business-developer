<?php

namespace App\Http\Requests;

use App\Services\GeminiNameGenerator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class NameIdeasRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // public tool, protected by the rate limiter instead
    }

    protected function prepareForValidation(): void
    {
        // keywords: letters, digits, spaces, commas and hyphens only (the UI allows 60 characters)
        $keywords = preg_replace('/[^\p{L}\p{N}\s,\-]+/u', '', (string) $this->input('keywords', ''));
        $this->merge(['keywords' => trim($keywords ?? '')]);
    }

    public function rules(): array
    {
        return [
            'keywords' => ['present', 'string', 'max:60'],
            'industry' => ['required', Rule::in(array_keys(GeminiNameGenerator::INDUSTRIES))],
            'style' => ['required', Rule::in(array_keys(GeminiNameGenerator::STYLES))],
            'max_len' => ['required', 'integer', 'between:6,24'],
            'variation' => ['nullable', 'integer', 'between:0,1000'],
            'exclude' => ['nullable', 'array', 'max:60'],
            'exclude.*' => ['string', 'max:40'],
        ];
    }
}
