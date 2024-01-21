<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Mail\LoginLinkEmail;
use App\Models\LoginToken;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class UserController extends Controller
{
    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function login(Request $request): JsonResponse
    {

        $request->validate(['email' => 'required|email']);

        $user = User::where('email', $request->email)->firstOrFail();

        $token = LoginToken::create([
            'user_id' => $user->id,
            'token' => Str::random(60),
            'expires_at' => Carbon::now()->addMinutes(30)
        ]);

        $loginUrl = url('/login/' . $token->token);

        Mail::to($user->email)->send(new LoginLinkEmail($loginUrl));

        return response()->json(['message' => 'Login link has been sent to your email.']);
    }




}
