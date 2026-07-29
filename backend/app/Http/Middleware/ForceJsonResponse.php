<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * This is an API-only app with no web login/redirect routes, so every
 * request under the api group must be treated as JSON-expecting even
 * when a client omits the Accept header (plain curl, some HTTP libs).
 */
class ForceJsonResponse
{
    public function handle(Request $request, Closure $next): Response
    {
        $request->headers->set('Accept', 'application/json');

        return $next($request);
    }
}
