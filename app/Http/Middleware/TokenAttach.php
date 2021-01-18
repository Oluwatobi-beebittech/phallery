<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class TokenAttach
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // $response = $next($request);

        // $response->header('Authorization','no-cache, must-revalidate');
        // return $response;
        // $response = Http::withHeaders(['X-First'=>'foo'])->get('http://localhost:8000/api/dashboard');
        // dd($request->cookie('sanctum_token'));
        return $next($request);
    }
}
