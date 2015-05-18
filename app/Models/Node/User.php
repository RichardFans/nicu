<?php namespace App\Models\Node;

use Zizaco\Entrust\Traits\EntrustUserTrait;

class User extends \Eloquent {
    use EntrustUserTrait;

    protected $connection = 'node';

    protected $table = 'users';
}
