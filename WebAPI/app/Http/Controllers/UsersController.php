<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UsersController extends Controller
{
  use HttpResponses;

  public function login(LoginRequest $request)
  {
    $request->validated($request->all());

    if (!Auth::attempt($request->only('email', 'password'))) {
      return $this->error('', 'Le courriel ou le mot de passe n\'est pas valide', 401);
    }

    $user = Auth::user();

    return $this->success([
      'user' => $user,
      'token' => $user->createToken('API Token of ' . $user->name)->plainTextToken
    ]);
  }

  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    //
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    //
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    //
  }

  /**
   * Display the specified resource.
   */
  public function show(string $id)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(string $id)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, string $id)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $id)
  {
    //
  }
}
