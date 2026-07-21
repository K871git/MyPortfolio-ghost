<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'slug', 'description', 'problem_statement',
        'architecture_data', 'database_schema', 'api_flow', 'tech_stack',
        'challenges', 'trade_offs', 'lessons_learned', 'outcome_metrics',
        'screenshots', 'github_url', 'live_url', 'sort_order', 'is_published',
    ];

    protected $casts = [
        'architecture_data' => 'array',
        'database_schema' => 'array',
        'api_flow' => 'array',
        'tech_stack' => 'array',
        'challenges' => 'array',
        'trade_offs' => 'array',
        'lessons_learned' => 'array',
        'outcome_metrics' => 'array',
        'screenshots' => 'array',
        'is_published' => 'boolean',
    ];

    public function scopePublished($query)
    {
        return $query->where('is_published', true)->orderBy('sort_order');
    }
}
