<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use Illuminate\Http\JsonResponse;

class SkillController extends Controller
{
    /**
     * GET /api/skills
     * Grouped by category so the frontend can render folders directly.
     */
    public function index(): JsonResponse
    {
        $grouped = Skill::published()->get()->groupBy('category')->map(function ($skills) {
            return $skills->map(fn ($s) => [
                'id' => $s->id,
                'name' => $s->name,
                'icon_slug' => $s->icon_slug,
            ])->values();
        });

        return response()->json(['data' => $grouped]);
    }
}
