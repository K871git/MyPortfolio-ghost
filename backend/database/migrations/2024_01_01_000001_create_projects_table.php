<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description');
            $table->text('problem_statement')->nullable();
            $table->jsonb('architecture_data')->nullable();
            $table->jsonb('database_schema')->nullable();
            $table->jsonb('api_flow')->nullable();
            $table->jsonb('tech_stack')->nullable();
            $table->jsonb('challenges')->nullable();
            $table->jsonb('trade_offs')->nullable();
            $table->jsonb('lessons_learned')->nullable();
            $table->jsonb('outcome_metrics')->nullable();
            $table->jsonb('screenshots')->nullable();
            $table->string('github_url')->nullable();
            $table->string('live_url')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_published')->default(true);
            $table->timestamps();

            $table->index(['is_published', 'sort_order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
