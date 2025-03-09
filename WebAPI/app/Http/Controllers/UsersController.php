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
    try {
      $request->validated($request->all());

      if (!Auth::attempt($request->only('email', 'password'))) {
        return $this->error('', 'auth.invalid_credentials', 401);
      }

      $user = Auth::user();

      return $this->success([
        'user' => $user,
        'token' => $user->createToken('API Token of ' . $user->email)->plainTextToken
      ]);
    } catch (\Throwable $e) {
      return $this->error(
        null,
        "auth.login_error",
        422
      ); 
    }
  }

  public function register(RegisterRequest $request)
  {
    try {
      $request->validated($request->all());

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
      return $this->error(
        null,
        "auth.register_error",
        422
      ); 
    }
  }

  public function logout()
  {
    try{
      Auth::user()->currentAccessToken()->delete();
      
      return $this->success(null,'account.logout_success');
    } catch (\Throwable $e) {
      return $this->error(
        null,
        "account.logout_error",
        422
      );  
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

      return $this->success(
        ['user' => $user], 
        'account.update_success'
      );
    } catch (\Throwable $e) {
      return $this->error(
        null,
        "account.update_error",
        422
      );  
    }
  }

  public function updatePassword(UserUpdatePasswordRequest $request)
  {
    try {
      $user = Auth::user();

      if (!Hash::check($request->old_password, $user->password)) {
        return $this->error(
          null,
          "account.updatePassword_wrongPassword_error",
          422
        ); 
      }

      $user->password = Hash::make($request->new_password);
      $user->save();

      return $this->success(null, 'account.updatePassword_success');
    } catch (\Throwable $e) {
      Log::debug($e);
      return $this->error(
        null,
        "account.updatePassword_error",
        422
      ); 
    }
  }

  public function destroy()
  {
    try {
      $user = Auth::user();
      $user->currentAccessToken()->delete();
      $user->delete();
      
      return $this->success(null, 'account.delete_success');
    } catch (\Throwable $e) {
      Log::debug($e);
      return $this->error(
        null,
        "account.delete_error",
        422
      ); 
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
