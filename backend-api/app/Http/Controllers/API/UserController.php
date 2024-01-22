<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Mail\LoginLinkEmail;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class UserController extends Controller
{


    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'magicLinkLogin']]);
    }


    /**
     * Initiate login
     *
     * @param LoginRequest $request
     * @return JsonResponse
     */
    public function login(LoginRequest $request): JsonResponse
    {

        $user = User::firstOrCreate(
            ['email' => $request->email],
        );

        $token = Str::random(60);
        $user->login_token = $token;
        $user->login_token_created_at = now();
        $user->save();

        $link = url('http://localhost:3000/link-login?token=' . $token);


        // Mail::to($user->email)->send(new LoginLinkEmail($link));


        return response()->json(['message' => 'Magic link has been sent to your email.', 'login_link' => $link]);

    }

    /**
     * login with a link and get JWT token
     * @param Request $request
     * @return JsonResponse
     */
    public function magicLinkLogin(Request $request): JsonResponse
    {
        $token = $request->input('token');
        $user = User::where('login_token', $token)->first();

        if (!$user || now()->subMinutes(5)->gt($user->login_token_created_at)) {
            return response()->json(['error' => 'This magic link is expired. Please request a new one.'], 401);
        }

        Auth::login($user);

        $token = auth()->tokenById($user->id);

        if (!$token) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        $user->login_token = null;
        $user->login_token_created_at = null;
        $user->save();

        return $this->respondWithToken($token);
    }

    /**
     * Get the authenticated User.
     *
     * @return JsonResponse
     */
    public function profile(): JsonResponse
    {
        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return JsonResponse
     */
    public function logout(): JsonResponse
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return JsonResponse
     */
    public function refresh(): JsonResponse
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param string $token
     *
     * @return JsonResponse
     */
    protected function respondWithToken($token): JsonResponse
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }


}
