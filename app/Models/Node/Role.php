<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 15-5-10
 * Time: 上午12:39
 */

namespace App\Models\Node;


use Zizaco\Entrust\EntrustRole;

class Role extends EntrustRole
{
    protected $connection = 'node';
}