<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_name', 'role', 'start_date', 'end_date', 'location',
        'description', 'responsibilities', 'challenges', 'solutions',
        'impact_metrics', 'tech_stack', 'sort_order', 'is_published',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'responsibilities' => 'array',
        'challenges' => 'array',
        'solutions' => 'array',
        'impact_metrics' => 'array',
        'tech_stack' => 'array',
        'is_published' => 'boolean',
    ];

    public function scopePublished($query)
    {
        return $query->where('is_published', true)->orderBy('sort_order');
    }
}
