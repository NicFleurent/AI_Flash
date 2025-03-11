@extends('layouts.app')
@section('content')
<div class="container container-table h-100">   
    <h2>Modifier l'utilisateur</h2>
    
    <form action="{{ route('admin.update', [$user]) }}" method="POST" enctype="multipart/form-data">
        @csrf
        @method('patch')
        <div class="main-container">
            <div>
                <label for="firstname">Prenom:</label>
                <input type="text" id="firstname" name="firstname" value="{{ $user->firstname }}" required>
            </div>
            @if($errors->has('firstname'))
                <div class="alert-custom">{{ $errors->first('firstname') }}</div>
            @endif
            <div>
                <label for="lastname">Nom:</label>
                <input type="text" id="lastname" name="lastname" value="{{ $user->lastname }}" required>
            </div>
            @if($errors->has('lastname'))
                <div class="alert-custom">{{ $errors->first('lastname') }}</div>
            @endif
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" value="{{ $user->email }}" required>
            </div>
            @if($errors->has('email'))
                <div class="alert-custom">{{ $errors->first('email') }}</div>
            @endif
            <button type="submit" class="button">Enregistrer les modifications</button>
        </div>
    </form>
</div>
@endsection
