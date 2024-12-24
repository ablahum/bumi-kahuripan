<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller {
    // public function index(Request $request) {
    //     $routeName = $request->route()->getName();

    //     if ($routeName == 'login') {
    //         return view('login', ['title' => 'Login']);
    //     } elseif ($routeName == 'register') {
    //         return view('register', [
    //             "title" => "Register",
    //             "roles" => Role::all(),
    //         ]);
    //     } else {
    //         return abort(404);
    //     }
    // }

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
                ], 200);
            } else {
                return back()->with('failed_message', 'Email or password is incorrect.');
            }
        } else {
            return back()->with('failed_message', 'The provided credentials do not match our records.');
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
            'name' => 'required|string|max:255',
            'email' => 'required|string|email:dns|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role_id' => 'required|integer'
        ]);

        $data['password'] = Hash::make($data['password']);

        User::create($data);
        return response()->json([
            'message' => 'Register successful. Please login to continue',
        ], 201);
    }
};
