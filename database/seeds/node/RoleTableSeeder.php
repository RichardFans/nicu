<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 15-5-10
 * Time: 上午1:23
 */

use App\Models\Node\Permission;
use App\Models\Node\Role;
use App\Models\Node\User;
use Illuminate\Database\Seeder;

class RoleTableSeeder extends Seeder
{
    public function run()
    {
        ////////////////////////////////
        DB::table('permissions')->delete();

        $p = Permission::create(array(
            'name' => 'user',
            'display_name' => '用户管理',
        ));

        $p_c = Permission::create(array(
            'name' => 'user.create',
            'display_name' => '创建新的用户',
        ));

        $p_d = Permission::create(array(
            'name' => 'user.delete',
            'display_name' => '删除用户',
        ));

        $p_u = Permission::create(array(
            'name' => 'user.edit',
            'display_name' => '编辑用户信息',
        ));

        $p_r = Permission::create(array(
            'name' => 'user.show',
            'display_name' => '查看用户信息',
        ));

        ////////////////////////////////

        DB::table('roles')->delete();

        $role = Role::create(array(
            'name' => 'node_admin',
            'display_name' => '节点管理员',
            'description' => '节点管理员拥有该学科的最高权限，每个节点仅配置一名节点管理员',
        ));
        $role->attachPermissions([$p, $p_c, $p_r, $p_u, $p_d]);
        User::find(1)->attachRole($role);

        $role = Role::create(array(
            'name' => 'common_user',
            'display_name' => '普通用户',
            'description' => '只提供该软件基本使用权限',
        ));
        $role->attachPermissions([$p, $p_r, $p_u]);
        User::find(1)->attachRole($role);
    }
}