<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\JsonResponse;

class ProjectController extends Controller
{
    /**
     * GET /api/projects
     * Lightweight list for the projects rail — no heavy jsonb payloads.
     */
    public function index(): JsonResponse
    {
        $projects = Project::published()
            ->get([
                'id', 'title', 'slug', 'description', 'tech_stack',
                'github_url', 'live_url', 'sort_order',
            ]);

        return response()->json(['data' => $projects]);
    }

    /**
     * GET /api/projects/{slug}
     * Full case study payload for the fullscreen overlay.
     */
    public function show(string $slug): JsonResponse
    {
        $project = Project::published()->where('slug', $slug)->firstOrFail();

        return response()->json(['data' => $project]);
    }
}
