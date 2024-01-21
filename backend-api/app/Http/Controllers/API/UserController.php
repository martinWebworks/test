<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'email|required',
        ]);

        if (Auth::attempt($request->only('email', 'password'))) {
            return fractal()->item(Auth::user(), new UserTransformer(false), 'data')
                ->parseIncludes(['token'])
                ->serializeWith(new ArraySerializer())
                ->respond(200, [], JSON_PRETTY_PRINT);

        } else {
            return response()->json(['message' => "Invalid email or password"], Response::HTTP_NOT_FOUND);
        }
    }

}
