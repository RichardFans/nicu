<?php namespace App\Models\Node;

use Zizaco\Entrust\Traits\EntrustUserTrait;
use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;

class User extends \Eloquent implements AuthenticatableContract {
    use EntrustUserTrait, Authenticatable;

    protected $connection = 'node';

    protected $table = 'users';
}
