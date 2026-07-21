#!/bin/sh
set -e

php artisan migrate --force
php artisan db:seed --class="Database\Seeders\PortfolioSeeder" --force || true
php artisan config:cache

exec php artisan serve --host=0.0.0.0 --port=${PORT:-8080}