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

    protected $table = 'roles';

    protected $fillable = ['name', 'display_name', 'description'];

    public function can($permission, $requireAll = false)
    {
        if (is_array($permission)) {
            foreach ($permission as $permName) {
                $hasPerm = $this->can($permName);

                if ($hasPerm && !$requireAll) {
                    return true;
                } elseif (!$hasPerm && $requireAll) {
                    return false;
                }
            }
            return $requireAll;
        } else {
            foreach ($this->perms as $perm) {
                if ($perm->name == $permission) {
                    return true;
                }
            }
        }
        return false;
    }
}