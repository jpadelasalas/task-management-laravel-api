#!/bin/sh
set -e

php artisan config:cache
php artisan migrate --force

# no Shell access on the free plan to seed manually, so seed here
# instead — UserSeeder's unique email constraint makes reruns a
# harmless no-op after the first successful boot
php artisan db:seed --force || true

exec php artisan serve --host 0.0.0.0 --port "${PORT:-8000}"
