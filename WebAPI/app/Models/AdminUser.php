<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class AdminUser  extends Authenticatable
{
    use Notifiable;

    protected $table = 'admin_users';
    protected $guard = 'admin';

    protected $fillable = [
        'email', 'password',
    ];

    protected $hidden = [
        'password',
    ];
}
