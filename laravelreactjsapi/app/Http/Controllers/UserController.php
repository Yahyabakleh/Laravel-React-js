<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Spatie\Activitylog\Models\Activity;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function add_admin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:191',
            'email' => 'required|max:191|unique:users',
            'password' => 'required|min:8|confirmed'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        } else {
            User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role_as' => 1
            ]);
            $user = Auth::user();
            activity()
                ->causedBy($user)
                ->log($user->name . ' Create Admin Account with name : ' . $request->name . ' And Email : ' . $request->email);
            return response()->json([
                'status' => 200,
                'message' => 'Admin Has Been Added successfully'
            ]);
        }
    }
    public function add_employee(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:191',
            'email' => 'required|max:191|unique:users',
            'password' => 'required|min:8|confirmed'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        } else {
            User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);
            $user = Auth::user();
            activity()
                ->causedBy($user)
                ->log($user->name . ' Create Employee Account with name : ' . $request->name . ' And Email : ' . $request->email);

            return response()->json([
                'status' => 200,
                'message' => 'Employee Has Been Added successfully'
            ]);
        }
    }
    public function show_admin()
    {
        $Admin = User::where('role_as', 1)->get();
        $user = Auth::user();
        activity()
            ->causedBy($user)
            ->log($user->name . ' Showed Admin ');
        return response()->json([
            'status' => 200,
            'Admin' => $Admin
        ]);
    }
    public function show_employee()
    {
        $Employee = User::where('role_as', 0)->get();
        $user = Auth::user();
        activity()
            ->causedBy($user)
            ->log($user->name . ' Showed Employee ');
        return response()->json([
            'status' => 200,
            'Employee' => $Employee
        ]);
    }
    public function edit_admin($id)
    {

        $admin = User::find($id);
        $user = Auth::user();
        activity()
            ->causedBy($user)
            ->log($user->name . ' Edit Admin ');
        return response()->json([
            'status' => 200,
            'admin' => $admin
        ]);
    }
    public function update_admin(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:191',
            'email' => 'required|max:191',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        } else {
            $admin = User::find($id);
            if ($request->password == null) {
                $password = $admin->password;
            } else {
                $password = Hash::make($request->password);
            }
            User::where('id', $id)->update([
                'name' => $request->name,
                'email' => $request->email,
                'password' => $password,
            ]);
            $admin = User::find($id);
            $user = Auth::user();
            activity()
                ->causedBy($user)
                ->log($user->name . ' Updated Admin Account to name : ' . $admin->name . ' And Email : ' . $admin->email);
            return response()->json([
                'status' => 200,
                'message' => 'Admin Has Been Edited successfully'
            ]);
        }
    }
    public function update_employee(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:191',
            'email' => 'required|max:191',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        } else {
            $admin = User::find($id);
            if ($request->password == null) {
                $password = $admin->password;
            } else {
                $password = Hash::make($request->password);
            }
            User::where('id', $id)->update([
                'name' => $request->name,
                'email' => $request->email,
                'password' => $password,
            ]);
            $admin = User::find($id);
            $user = Auth::user();
            activity()
                ->causedBy($user)
                ->log($user->name . ' updated Employee Account to  name : ' . $admin->name . ' And Email : ' . $admin->email);
            return response()->json([
                'status' => 200,
                'message' => 'Employee Has Been Edited successfully'
            ]);
        }
    }
    public function delete_admin($id)
    {
        $admin = User::find($id);
        $role = $admin->role_as;
        $admin->delete();
        if ($role == 0) {
            $user = Auth::user();
            activity()
                ->causedBy($user)
                ->log($user->name . ' Deleted Employee Account to  name : ' . $admin->name . ' And Email : ' . $admin->email);
            return response()->json([
                'status' => 200,
                'message' => 'Employee Has Been Deleted successfully'
            ]);
        }
        if ($role == 1) {
            $user = Auth::user();
            activity()
                ->causedBy($user)
                ->log($user->name . ' Deleted Admin Account to  name : ' . $admin->name . ' And Email : ' . $admin->email);
            return response()->json([
                'status' => 200,
                'message' => 'Admin Has Been Deleted successfully'
            ]);
        }
    }
    public function activities()
    {
        $activity = Activity::all();

        return response()->json([
            'status' => 200,
            'activity' => $activity
        ]);
    }
}