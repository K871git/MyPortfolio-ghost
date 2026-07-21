<?php

namespace Database\Seeders;

use App\Models\AboutStep;
use App\Models\Experience;
use App\Models\Project;
use App\Models\Setting;
use App\Models\Skill;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PortfolioSeeder extends Seeder
{
    public function run(): void
    {
        $this->seedSettings();
        $this->seedAboutSteps();
        $this->seedSkills();
        $this->seedExperiences();
        $this->seedProjects();
    }

    private function seedSettings(): void
    {
        $settings = [
            'identity' => [
                'name' => 'Kishor Sanjay Gangarde',
                'role' => 'Software Engineer',
                'tagline' => 'Backend Engineer who does Full Stack.',
                'experience_years' => 2,
                'location' => 'Pune, Maharashtra, India',
                'availability' => 'Open to Opportunities',
            ],
            'contact' => [
                'email' => 'gangardekishor87@gmail.com',
                'phone' => '+91 7499621927',
                'github' => 'https://github.com/K871git',
                'linkedin' => 'https://linkedin.com/in/kishor-gangarde',
            ],
            'status' => [
                'available' => true,
                'label' => 'Available for opportunities',
            ],
        ];

        foreach ($settings as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => $value]);
        }
    }

    private function seedAboutSteps(): void
    {
        $steps = [
            ['step_name' => 'problem', 'title' => 'Problem', 'icon' => 'target', 'description' => 'Start by interrogating the actual problem, not the requested feature. Talk to whoever owns the pain, find the constraint that matters, and write the problem down before touching a single line of code.'],
            ['step_name' => 'research', 'title' => 'Research', 'icon' => 'search', 'description' => 'Look at how similar problems were solved elsewhere. Read the docs for the tools already in use before reaching for new ones. Most "new" problems have prior art — the job is finding it fast.'],
            ['step_name' => 'architecture', 'title' => 'Architecture', 'icon' => 'layers', 'description' => 'Design the data model and service boundaries before the UI. Decide what lives in the database, what lives in the service layer, and what the API contract looks like. This is the step that prevents rewrites.'],
            ['step_name' => 'development', 'title' => 'Development', 'icon' => 'code', 'description' => 'Build in vertical slices — a working path end to end before breadth. Keep controllers thin, business logic in services, and commits small enough to review in under five minutes.'],
            ['step_name' => 'testing', 'title' => 'Testing', 'icon' => 'check-circle', 'description' => 'Test the failure paths as hard as the happy path. Auth boundaries, malformed input, and race conditions are where security-product code actually gets reviewed.'],
            ['step_name' => 'deployment', 'title' => 'Deployment', 'icon' => 'upload-cloud', 'description' => 'Ship behind a flag when possible. Watch logs and error rates for the first hour after release, not just the first five minutes.'],
            ['step_name' => 'optimization', 'title' => 'Optimization', 'icon' => 'zap', 'description' => 'Profile before optimizing. Slow queries and N+1s are found with an EXPLAIN, not a guess — fix the measured bottleneck, not the suspected one.'],
            ['step_name' => 'iteration', 'title' => 'Iteration', 'icon' => 'refresh-cw', 'description' => 'Ship, observe, adjust. The first version is a hypothesis about what the system needs — real usage is what tells you if it was right.'],
        ];

        foreach ($steps as $i => $step) {
            AboutStep::updateOrCreate(
                ['step_name' => $step['step_name']],
                $step + ['sort_order' => $i]
            );
        }
    }

    private function seedSkills(): void
    {
        $categories = [
            'Languages' => ['PHP', 'JavaScript', 'Python', 'HTML5', 'CSS3', 'SQL'],
            'Backend' => ['Laravel', 'Laravel Sanctum', 'REST API Design', 'MVC Architecture', 'Service Layer Architecture', 'Authentication & Authorization', 'CodeIgniter', 'Node.js'],
            'Frontend' => ['React.js', 'jQuery', 'AJAX', 'Tailwind CSS'],
            'Database' => ['MySQL', 'PostgreSQL', 'ClickHouse', 'Database Design & Optimization'],
            'Tools' => ['Git', 'GitHub', 'SVN', 'Postman'],
            'Cloud & DevOps' => ['Docker', 'Kubernetes'],
        ];

        $order = 0;
        foreach ($categories as $category => $names) {
            foreach ($names as $i => $name) {
                Skill::updateOrCreate(
                    ['category' => $category, 'name' => $name],
                    ['icon_slug' => Str::slug($name), 'sort_order' => $i, 'is_published' => true]
                );
            }
        }
    }

    private function seedExperiences(): void
    {
        Experience::updateOrCreate(
            ['company_name' => 'Biz Secure Labs (Net Protector Antivirus)', 'role' => 'Software Engineer (Full Stack Developer)'],
            [
                'start_date' => '2024-06-01',
                'end_date' => null,
                'location' => 'Pune, Maharashtra, India',
                'description' => 'Full stack software engineer building enterprise security web portals and REST APIs consumed by MFC desktop clients, in a security-product environment with structured senior code review.',
                'responsibilities' => [
                    'Developed and maintained backend modules for enterprise security web portals using Laravel, PHP, and MySQL, contributing to 20+ application modules.',
                    'Designed and built 15+ REST APIs consumed by MFC desktop applications, enabling secure data exchange between desktop clients and server-side systems.',
                    'Implemented authentication and authorization using Laravel Sanctum, securing API endpoints across multiple internal portals.',
                    'Contributed to 5+ modules within client-facing web applications, working with MySQL and ClickHouse databases.',
                    'Built and maintained systems using Service Layer and MVC architecture patterns to keep business logic clean and maintainable.',
                ],
                'challenges' => [
                    'Desktop clients (MFC) required strict, versioned API contracts with zero tolerance for breaking changes.',
                    'Two very different datastores (MySQL for transactional data, ClickHouse for analytical/log data) had to be reasoned about together.',
                ],
                'solutions' => [
                    'Adopted Service Layer architecture so business logic could be tested and reviewed independently of controllers and desktop-facing serialization.',
                    'Wrapped Sanctum-based auth around every internal portal endpoint, with per-client token scoping.',
                ],
                'impact_metrics' => [
                    '20+ application modules shipped',
                    '15+ production REST APIs',
                    '2 datastores integrated (MySQL, ClickHouse)',
                ],
                'tech_stack' => ['Laravel', 'PHP', 'MySQL', 'ClickHouse', 'Laravel Sanctum', 'REST APIs', 'MVC', 'Service Layer'],
                'sort_order' => 0,
            ]
        );
    }

    private function seedProjects(): void
    {
        Project::updateOrCreate(
            ['slug' => 'yara-rule-portal'],
            [
                'title' => 'YARA Rule Portal',
                'description' => 'Enterprise portal for uploading, scanning, viewing, editing, and centrally managing YARA rules submitted from remote systems.',
                'problem_statement' => 'Security analysts across the org were managing YARA rules ad hoc — emailing files, no version history, no central view of what was deployed where. The team needed one system of record for rule lifecycle: upload, validate, edit, and track status across remote scanning systems.',
                'architecture_data' => [
                    'style' => 'Layered MVC + Service Layer',
                    'nodes' => ['jQuery/AJAX Frontend', 'Laravel Controllers', 'Service Layer', 'Sanctum Auth Guard', 'MySQL', 'Remote Scan Agents'],
                    'flow' => ['Frontend -> Controllers', 'Controllers -> Service Layer', 'Service Layer -> MySQL', 'Service Layer -> Remote Scan Agents', 'Sanctum Auth Guard -> Controllers'],
                ],
                'database_schema' => [
                    'tables' => [
                        ['name' => 'rules', 'columns' => ['id', 'name', 'body', 'status', 'uploaded_by', 'created_at']],
                        ['name' => 'rule_versions', 'columns' => ['id', 'rule_id', 'body', 'created_at']],
                        ['name' => 'scan_results', 'columns' => ['id', 'rule_id', 'target_host', 'result', 'scanned_at']],
                        ['name' => 'users', 'columns' => ['id', 'name', 'email', 'role']],
                    ],
                ],
                'api_flow' => [
                    'steps' => [
                        'POST /rules — upload a new rule, validated server-side before storage',
                        'GET /rules/{id} — fetch current rule + version history',
                        'PUT /rules/{id} — edit, which snapshots the previous version',
                        'POST /rules/{id}/scan — dispatch to remote scanning systems',
                        'GET /rules/{id}/status — poll scan status, surfaced via AJAX',
                    ],
                ],
                'tech_stack' => ['Laravel', 'PHP', 'MySQL', 'REST APIs', 'Laravel Sanctum', 'jQuery', 'JavaScript', 'AJAX', 'MVC', 'Service Layer Architecture'],
                'challenges' => [
                    'Rule edits needed an audit trail without turning every table into an event log.',
                    'Real-time-feeling status updates were required without a websocket layer in scope.',
                ],
                'trade_offs' => [
                    'Chose AJAX polling over websockets — simpler operationally, acceptable latency for the scan-status use case.',
                    'Kept version history as full-row snapshots rather than diffs, trading storage for simplicity and fast rollback.',
                ],
                'lessons_learned' => [
                    'Service Layer separation made the audit-trail feature easy to bolt on later without touching controllers.',
                    'Sanctum token scoping per endpoint caught a permissions bug in code review before it reached production.',
                ],
                'outcome_metrics' => [
                    'Centralized rule management across remote scanning systems',
                    'Full edit history for every rule',
                    'Primary developer for backend + frontend integration',
                ],
                'screenshots' => [],
                'github_url' => 'https://github.com/K871git',
                'live_url' => null,
                'sort_order' => 0,
                'is_published' => true,
            ]
        );

        Project::updateOrCreate(
            ['slug' => 'malware-sample-hub'],
            [
                'title' => 'Malware Sample Hub',
                'description' => 'Internal portal for secure upload, storage, and lifecycle management of malware sample files and metadata.',
                'problem_statement' => 'Malware samples were scattered across analyst machines with inconsistent naming and no structured metadata, making it hard to search prior samples or track handling of sensitive files.',
                'architecture_data' => [
                    'style' => 'MVC with dedicated file-handling service',
                    'nodes' => ['Upload Frontend', 'Laravel Controllers', 'File Handling Service', 'Sanctum Auth', 'MySQL Metadata Store', 'File Storage'],
                    'flow' => ['Upload Frontend -> Controllers', 'Controllers -> File Handling Service', 'File Handling Service -> File Storage', 'File Handling Service -> MySQL Metadata Store'],
                ],
                'database_schema' => [
                    'tables' => [
                        ['name' => 'samples', 'columns' => ['id', 'filename', 'hash', 'size', 'status', 'uploaded_by']],
                        ['name' => 'sample_tags', 'columns' => ['id', 'sample_id', 'tag']],
                        ['name' => 'audit_log', 'columns' => ['id', 'sample_id', 'action', 'actor', 'created_at']],
                    ],
                ],
                'api_flow' => [
                    'steps' => [
                        'POST /samples — chunked upload for large files, hashed on arrival',
                        'GET /samples — searchable, paginated listing with metadata filters',
                        'PATCH /samples/{id} — edit metadata / lifecycle status',
                        'DELETE /samples/{id} — soft-delete with audit trail',
                    ],
                ],
                'tech_stack' => ['Laravel', 'PHP', 'MySQL', 'REST APIs', 'Laravel Sanctum', 'JavaScript', 'jQuery'],
                'challenges' => [
                    'Large file uploads were timing out and occasionally corrupting on slow connections.',
                    'Duplicate samples needed detection without re-hashing entire files on every request.',
                ],
                'trade_offs' => [
                    'Chunked upload with resumability added complexity but eliminated the large-file failure class.',
                    'Cached hash lookups rather than recomputing on read, trading a small write-time cost for fast duplicate checks.',
                ],
                'lessons_learned' => [
                    'Most "bugs" in the original upload flow were actually one missing timeout configuration — profiling before rewriting saved a full rebuild.',
                    'Structured metadata made a downstream reporting request take an afternoon instead of a sprint.',
                ],
                'outcome_metrics' => [
                    'Resolved large-file upload failures',
                    'Structured metadata for every stored sample',
                    'Improved backend performance for bulk handling workflows',
                ],
                'screenshots' => [],
                'github_url' => 'https://github.com/K871git',
                'live_url' => null,
                'sort_order' => 1,
                'is_published' => true,
            ]
        );

        Project::updateOrCreate(
            ['slug' => 'pet-management-system'],
            [
                'title' => 'Pet Management System',
                'description' => 'Independent MVC application for managing pet records, built outside professional work to strengthen backend fundamentals beyond the Laravel ecosystem.',
                'problem_statement' => 'A self-directed exercise to prove the same backend fundamentals — auth, CRUD, MVC discipline — could be executed cleanly in a different framework and database than the day job (CodeIgniter + PostgreSQL vs Laravel + MySQL).',
                'architecture_data' => [
                    'style' => 'Classic MVC',
                    'nodes' => ['CodeIgniter Controllers', 'Models', 'Custom Auth Middleware', 'PostgreSQL'],
                    'flow' => ['Controllers -> Models', 'Models -> PostgreSQL', 'Custom Auth Middleware -> Controllers'],
                ],
                'database_schema' => [
                    'tables' => [
                        ['name' => 'pets', 'columns' => ['id', 'name', 'species', 'owner_id', 'medical_notes']],
                        ['name' => 'owners', 'columns' => ['id', 'name', 'email', 'phone']],
                        ['name' => 'users', 'columns' => ['id', 'username', 'password_hash']],
                    ],
                ],
                'api_flow' => [
                    'steps' => [
                        'Session-based custom auth guarding all /pets and /owners routes',
                        'CRUD for pet and owner records with server-side validation',
                        'Relational lookups between owners and their pets',
                    ],
                ],
                'tech_stack' => ['CodeIgniter', 'PostgreSQL', 'Custom Authentication', 'MVC Architecture'],
                'challenges' => [
                    'Building authentication from scratch without Sanctum or a framework auth package.',
                ],
                'trade_offs' => [
                    'Hand-rolled session auth instead of a package — slower to build, but forced a real understanding of what those packages abstract away.',
                ],
                'lessons_learned' => [
                    'Implementing auth manually made the value of Sanctum\'s abstractions concrete going into professional work.',
                    'PostgreSQL\'s stricter typing surfaced schema issues that MySQL had been silently tolerating.',
                ],
                'outcome_metrics' => [
                    'Full custom auth implementation',
                    'Cross-framework fundamentals validated (CodeIgniter + PostgreSQL)',
                ],
                'screenshots' => [],
                'github_url' => 'https://github.com/K871git',
                'live_url' => null,
                'sort_order' => 2,
                'is_published' => true,
            ]
        );
    }
}
