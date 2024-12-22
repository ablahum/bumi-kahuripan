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

    public function login(Request $request) {
        $data = $request->validate([
            'email' => 'required|string|email:dns',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $data['email'])->first();

        if ($user) {
            if (Hash::check($data['password'], $user->password)) {
                if (Auth::attempt($data)) {
                        $token = $user->createToken('auth-token')->plainTextToken;

                        return response()->json([
                            'message' => 'Login successful.',
                            'token' => $token
                        ], 200);
                    }
                    
                    return back()->with('failed_message', 'Login failed. Please try again.');
                } else {
                    return back()->with('failed_message', 'Email or password is incorrect.');
            }
        } else {
            return back()->with('failed_message', 'The provided credentials do not match our records.');
        }
    }
    
    public function logout()
    {
        auth()->guard('web')->logout();

        Log::info('Token class:', ['class' => get_class($request->user()->currentAccessToken())]);
        return response()->json([
            'message' => 'Logout berhasil.',
        ], 200);
    }
    
    // public function logout(Request $request)
    // {
    //     Log::info('Token class:', ['class' => get_class($request->user()->currentAccessToken())]);

    //     $user = $request->user();

    //     if ($user->tokenCan('api')) {
    //         // Hapus token aktif
    //         $user->currentAccessToken()->delete();
    
    //         return response()->json([
    //             'message' => 'Logout berhasil.',
    //         ], 200);
    //     }
    
    //     return response()->json([
    //         'message' => 'Token tidak valid atau bukan API token.',
    //     ], 400);
    // }
    
    public function register(Request $request) {
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
