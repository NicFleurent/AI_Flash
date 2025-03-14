@extends('layouts.app')
@section('css')
    <link rel="stylesheet" href="">
@show
@section('js')
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <script src="{{ asset('js/disableConfirmUser.js') }}"></script>
@endsection
@section('content')
    <div class="container container-table h-100">
        <h2>Liste des utilisteurs</h2>
        <form id="logout-form" action="{{ route('logout') }}" method="POST">
            @csrf
            <a href="#" class="bottom-link" onclick="document.getElementById('logout-form').submit();">Déconnexion</a>
        </form>
        <div class="table-wrapper h-100 pb-5">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Courriel</th>
                        <th>Prénom</th>
                        <th>Nom</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($users as $user)
                        <tr>
                            <td>{{ $user->id }}</td>
                            <td>{{ $user->email }}</td>
                            <td>{{ $user->firstname }}</td>
                            <td>{{ $user->lastname }}</td>
                            <td><a href="{{ route('admin.edit', $user->id) }}"><img class="white-icon" src="{{ asset('svg/tools.svg') }}" alt="Modifier"></a></td>
                            <td><a onclick="confirmDisableUser({{ $user->id }})"><img class="white-icon" src="{{ asset('svg/trash.svg') }}" alt="Supprimer"></a></td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
@endsection