<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdminUserLoginRequest;
use App\Http\Requests\AdminUserUpdateRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Models\User;

class AdminUserController extends Controller
{
  public function login()
  {
    return View('admin.login');
  } 
  
  public function connexion(AdminUserLoginRequest $request)
  {
    if (Auth::guard('admin')->attempt($request->only('email', 'password'))) {
      return redirect()->route('admin.dashboard');
    }

    return back()->withErrors(['email' => 'L\'adresse courriel ou le mot de passe est invalide']);
  }

  public function logout()
  {
    Auth::guard('admin')->logout();
    return redirect()->route('login');
  }
    
  public function index() {
    $users = User::all();
    return view('admin.dashboard', compact('users'));
  }

  public function edit($id) {
    $user = User::find($id);
    return View('admin.edit', compact('user'));
  }

  public function update(AdminUserUpdateRequest $request, User $user) {
    Log::debug($user);
    $user->email = $request->email;
    $user->firstname = $request->firstname;
    $user->lastname = $request->lastname;
    $user->save();
    return redirect()->route('admin.dashboard')->with('message', "Vous avez bien modifié " . $user->email . " !");
  }

  public function delete($id) {
    $user = User::find($id);
    $userEmail = $user->email;
    $user->delete();

    return response()->json(['message' => 'Utilisateur '. $userEmail.' supprimer.']);
  }
}
