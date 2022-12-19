<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|max:191',
            'password' => 'required|min:8'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        } else {
            $user = User::where('email', $request->email)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json([
                    'status' => 401,
                    'message' => 'Invalid credentials'

                ]);
            } else {

                if ($user->role_as == 0) {
                    $token = $user->createToken($user->email . '_Token', ['server:employee'])->plainTextToken;
                } elseif ($user->role_as == 1) {
                    $token = $user->createToken($user->email . '_Token', ['server:admin'])->plainTextToken;
                } elseif ($user->role_as == 2) {
                    $token = $user->createToken($user->email . '_Token', ['server:superadmin'])->plainTextToken;
                }

                return response()->json([
                    'status' => 200,
                    'username' => $user->name,
                    'role' => $user->role_as,
                    'token' => $token,
                    'message' => 'Logged In successfully'
                ]);
            }
        }
    }
    public function logout()
    {
        auth()->user()->tokens()->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Logged Out successfully'
        ]);
    }
}