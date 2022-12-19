<?php

namespace App\Http\Controllers;

use App\Models\order;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Spatie\Activitylog\Models\Activity;
use Illuminate\Support\Facades\Auth;

class orderController extends Controller
{
    public function show_order()
    {
        $order = order::where('seen_by_employee', 0)->get();
        $user = Auth::user();
        activity()
            ->causedBy($user)
            ->log($user->name . ' Showed Orders ');
        return response()->json([
            'status' => 200,
            'order' => $order
        ]);
    }

    public function view_order($id)
    {
        $order = order::find($id);
        $user = Auth::user();
        activity()
            ->causedBy($user)
            ->log($user->name . ' Showed Order with name ' . $order->name);
        return response()->json([
            'status' => 200,
            'order' => $order
        ]);
    }
    public function accept_order($id)
    {
        $order = order::where('id', $id)->update([
            'status' => '1'
        ]);
        $user = Auth::user();
        activity()
            ->causedBy($user)
            ->log($user->name . ' Accepted Order with name ' . $order->name);
        return response()->json([
            'status' => 200,
            'message' => 'You Have Accepted Order '
        ]);
    }
    public function reject_order($id)
    {
        $order = order::where('id', $id)->update([
            'status' => "2"
        ]);
        $user = Auth::user();
        activity()
            ->causedBy($user)
            ->log($user->name . ' Rejected Order with name ' . $order->name);
        return response()->json([
            'status' => 200,
            'message' => 'You Have Rejected Order '
        ]);
    }
    public function returnfile($id)
    {
        $order = order::find($id);
        $user = Auth::user();
        activity()
            ->causedBy($user)
            ->log($user->name . ' Viewed Order PDF with name ' . $order->name);

        return response()->file(public_path($order->path));
    }
    public function update_order(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'file' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        } else {
            $fileName = time() . '.' . $request->file->extension();
            $request->file->move(public_path('pdf'), $fileName);
            $path = 'pdf/' . $fileName;
            order::where('id', $id)->update([
                'path' => $path,
                'seen_by_employee' => 1

            ]);
            $order = order::find($id);
            $user = Auth::user();
            activity()
                ->causedBy($user)
                ->log($user->name . ' Added PDF To Order with name ' . $order->name);
            return response()->json([
                'status' => 200,
                'message' => 'file Has Been Uploaded successfully'
            ]);
        }
    }
    public function show_order_admin()
    {
        $order = order::where('seen_by_employee', 1)->get();
        $user = Auth::user();
        activity()
            ->causedBy($user)
            ->log($user->name . ' Showed Orders ');
        return response()->json([
            'status' => 200,
            'order' => $order
        ]);
    }
}