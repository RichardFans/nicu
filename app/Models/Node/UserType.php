<?php namespace App\Models\Node;

use Illuminate\Database\Eloquent\Model;

class UserType extends \Eloquent {

    protected $connection = 'node';

    protected $table = 'user_types';

    protected $fillable = ['parent_id', 'name'];
}
