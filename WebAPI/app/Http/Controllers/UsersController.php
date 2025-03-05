<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\UserUpdatePasswordRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Models\User;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class UsersController extends Controller
{
  use HttpResponses;

  public function login(LoginRequest $request)
  {
    $request->validated($request->all());

    if (!Auth::attempt($request->only('email', 'password'))) {
      return $this->error('', 'auth.invalid_credentials', 401);
    }

    $user = Auth::user();

    return $this->success([
      'user' => $user,
      'token' => $user->createToken('API Token of ' . $user->email)->plainTextToken
    ]);
  }

  public function register(RegisterRequest $request)
  {
    $request->validated($request->all());
    try {
      $user = User::create([
        'email' => $request->email,
        'firstname' => $request->firstname,
        'lastname' => $request->lastname,
        'password' => Hash::make($request->password),
      ]);

      return $this->success([
        'user' => $user,
        'token' => $user->createToken('API Token of ' . $user->email)->plainTextToken
      ]);
    } catch (\Throwable $e) {
      Log::debug($e);
      return response()->json(['error' => 'auth.error_signup'], 422);
    }
  }

  public function logout()
  {
    try {
      Auth::user()->currentAccessToken()->delete();

      return $this->success([
        'message' => 'auth.successful_logout'
      ]);
    } catch (\Throwable $e) {
      Log::debug($e);
      return response()->json(['error' => 'auth.error_logout'], 422);
    }
  }

  public function refreshToken()
  {
    $user = Auth::user();
    $user->currentAccessToken()->delete();

    return $this->success([
      'user' => $user,
      'token' => $user->createToken('API Token of ' . $user->email)->plainTextToken
    ]);    
  }

  public function update(UserUpdateRequest $request)
  {
    try {
      $user = Auth::user();

      if ($user->email != $request->email) {
        $user->email = $request->email;
      }
      if ($user->firstname != $request->firstname) {
        $user->firstname = $request->firstname;
      }
      if ($user->lastname != $request->lastname) {
        $user->lastname = $request->lastname;
      }

      $user->save();

      return $this->success([
        'user' => $user,
        'message' => 'auth.successful_update'
      ]);
    } catch (\Throwable $e) {
      Log::debug($e);
      return response()->json(['error' => 'auth.error_update'], 422);
    }
  }

  public function updatePassword(UserUpdatePasswordRequest $request)
  {
    try {
      $user = Auth::user();

      if (!Hash::check($request->old_password, $user->password)) {
        return response()->json(['error' => __('auth.password')], 422);
      }

      $user->password = Hash::make($request->new_password);
      $user->save();

      return response()->json(['message' => 'auth.successful_update_password'], 200);
    } catch (\Throwable $e) {
      Log::debug($e);
      return response()->json(['error' => 'auth.error_update'], 422);
    }
  }

  public function destroy()
  {
    $user = Auth::user();
    try {
      $user->currentAccessToken()->delete();
      $user->delete();
      

      return response()->json(['message' => 'auth.successful_delete'], 200);
    } catch (\Throwable $e) {
      Log::debug($e);
      return response()->json(['error' => 'auth.error_delete'], 422);
    }
  }

  /*
   *For admin console if there is ever one
   */
  public function index() {}
  public function create() {}
  public function store(Request $request) {}
  public function show(string $id) {}
  public function edit(string $id) {}
}
