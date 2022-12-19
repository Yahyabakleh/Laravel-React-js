<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\orderController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::get(
        '/checkingAuthenticated',
        function () {
            return response()->json([
                'status' => 200,
                'message' => 'You are In'
            ], 200);
        }
    );
    Route::post('/add_admin', [UserController::class, 'add_admin']);

    Route::get('/edit-admin/{id}', [UserController::class, 'edit_admin']);

    Route::put('update-admin/{id}', [UserController::class, 'update_admin']);

    Route::get('/show-admin', [UserController::class, 'show_admin']);

    Route::post('/add_employee', [UserController::class, 'add_employee']);
    Route::get('/show-employee', [UserController::class, 'show_employee']);
    Route::put('update-employee/{id}', [UserController::class, 'update_employee']);

    Route::get('/show-order', [orderController::class, 'show_order']);
    Route::get('/view-order/{id}', [orderController::class, 'view_order']);
    Route::post('update-order/{id}', [orderController::class, 'update_order']);

    Route::get('/show-order-admin', [orderController::class, 'show_order_admin']);

    Route::post('accept-order/{id}', [orderController::class, 'accept_order']);
    Route::post('reject-order/{id}', [orderController::class, 'reject_order']);

    Route::delete('delete-admin/{id}', [UserController::class, 'delete_admin']);

    Route::get('activities', [UserController::class, 'activities']);
    Route::post('logout', [AuthController::class, 'logout']);
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});