<?php

namespace App\Http\Middleware;

use Illuminate\Support\Facades\Auth;
use Closure;
use Illuminate\Http\Request;

class ApiAdminMiddlware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if (Auth::check()) {
            if (auth()->user()->tokenCan("server:admin")) {
                return $next($request);
            } else {
                return response()->json([
                    'message' => 'Access Denied'
                ], 403);
            }
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'You Are Not Logged In'
            ]);
        }
    }
}