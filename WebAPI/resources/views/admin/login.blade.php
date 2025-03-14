<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/login.css') }}">
</head>
<body>

    <div class="header">
        <h1>AI Flash</h1>
        <h2>Centre d'administration</h2>
    </div>


    <form method="post" action="{{ route('connexion') }}" enctype="multipart/form-data">
    @csrf
        <div class="main-container">
            <label for="email">Adresse courriel:</label>
            <input type="text" class="form-control" id="email" name="email" required>
            @if($errors->has('email'))
                <div class="alert-custom">{{ $errors->first('email') }}</div>
            @endif

            <label for="password">Mot de passe:</label>
            <input type="password" class="form-control" id="password" name="password" required>
            @if($errors->has('password'))
                <div class="alert-custom">{{ $errors->first('password') }}</div>
            @endif

            <button type="submit" class="button">Se connecter</button>
        </div>
        
    </form>
</body>
</html>