<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller {
    public function me() {        
        // $user = User::find(3);
        $user = auth()->user();

        Log::debug($user);
        
        return response()->json([
            'message' => 'User successfully fetched.',
            'user' => $user,
            'role' => $user->role,
        ], 200);
    }
    
    public function login(Request $request)
    {
        $data = $request->validate([
            'email' => 'required|string|email:dns',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $data['email'])->first();

        if ($user) {
            if (Hash::check($data['password'], $user->password)) {
                $token = $user->createToken('auth-token');

                return response()->json([
                    'message' => 'Login successful.',
                    'token' => $token->plainTextToken
                ], 201);
            } else {
                return response()->json([
                    'message' => 'Email or password is incorrect. Please try again.',
                ], 401);
            }
        } else {
            return response()->json([
                'message' => 'The provided credentials do not match our records.',
            ], 401);
        }
    }
    
    public function logout(Request $request)
    {
        $user = $request->user();
        
        if (!$user || !$user->currentAccessToken()) {
            return response()->json([
                'message' => 'User not authenticated or token is invalid.',
            ], 401);
        }
    
        $user->currentAccessToken()->delete();
    
        return response()->json([
            'message' => 'Logout successful.',
        ], 200);
    }
    
    public function register(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email:dns|unique:users',
            'password' => 'required|string|min:8',
            'role_id' => 'required|integer'
        ]);

        $data['password'] = Hash::make($data['password']);

        User::create($data);
        return response()->json([
            'message' => 'Register successful. Please login to continue!',
        ], 201);
    }
};
