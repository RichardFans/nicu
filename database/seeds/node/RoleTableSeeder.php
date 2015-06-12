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
use App\Utils\TestHelper;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class RoleTableSeeder extends Seeder
{
    public function run()
    {
        ////////////////////////////////
        $this->command->info('  permissions...');
//        DB::table('permissions')->delete();
        Permission::truncate();

        $permissions = array(
            //根权限
            ['name' => 'app', 'display_name' => '根权限'],//id == 1

            //  一级权限
            ['name' => 'app.patients', 'display_name' => '病人管理'],//2
            //      二级权限
            ['name' => 'app.patients.reg', 'display_name' => '入科登记'],//3
            ['name' => 'app.patients.in_hospital', 'display_name' => '在科病人'],//4
            ['name' => 'app.patients.clinical_report', 'display_name' => '临床报表'],//5
            ['name' => 'app.patients.detail', 'display_name' => '在院明细'],//6
            ['name' => 'app.patients.leave', 'display_name' => '出科病人'],//7

            //  一级权限
            ['name' => 'app.remote', 'display_name' => '远程医疗'],//8
            //      二级权限
            ['name' => 'app.remote.apply', 'display_name' => '转院申请'],//9
            ['name' => 'app.remote.verify', 'display_name' => '转入审核'],//10

            //  一级权限
            ['name' => 'app.personal', 'display_name' => '用户中心'],//11
            //      二级权限
            ['name' => 'app.personal.profile', 'display_name' => '个人资料'],//12
            ['name' => 'app.personal.ask4leave', 'display_name' => '请假申请'],//13
            ['name' => 'app.personal.notification', 'display_name' => '个人通知'],//14
            ['name' => 'app.personal.performance', 'display_name' => '个人绩效'],//15

            //  一级权限
            ['name' => 'app.office', 'display_name' => '科室办公'],//16
            //      二级权限
            ['name' => 'app.office.leave_verify', 'display_name' => '请假审核'],//17
            ['name' => 'app.office.performance_verify', 'display_name' => '绩效审核'],//18
            ['name' => 'app.office.notification', 'display_name' => '科室通知'],//19
            ['name' => 'app.office.change_workload', 'display_name' => '工作量更改'],//20
            ['name' => 'app.office.performance_manage', 'display_name' => '绩效管理'],//21
            ['name' => 'app.office.employee_info', 'display_name' => '员工信息'],//22

            //  一级权限
            ['name' => 'app.statistics', 'display_name' => '统计分析'],//23
            //      二级权限
            ['name' => 'app.statistics.quality', 'display_name' => '质控指标'],//24


            //  一级权限
            ['name' => 'app.setting', 'display_name' => '系统管理'],//25
            //      二级权限
            ['name' => 'app.setting.employee', 'display_name' => '员工管理'],//26
            ['name' => 'app.setting.basic', 'display_name' => '基础设置'],//27
            ['name' => 'app.setting.office', 'display_name' => '办公设置'],//28
            ['name' => 'app.setting.custom_report', 'display_name' => '自定义报表'],//29

        );

        for ($i = 0; $i < count($permissions); $i++) {
            $permissions[$i]['created_at'] = Carbon::now();
            $permissions[$i]['updated_at'] = Carbon::now();
        }

        TestHelper::start();

        Permission::insert($permissions);
        TestHelper::end($this->command, 'permissions create');

        $permissions = Permission::all();

        ////////////////////////////////////////////////////////////////////////////////////////////
        $this->command->info('  roles...');
        Role::truncate();
        DB::table('permission_role')->truncate();
        DB::table('role_user')->truncate();

        $roles = [
            ['name' => '节点管理员', 'display_name' => '节点管理员',
                'description' => '每个科室有且仅有一位节点管理员，负责科室后台数据维护.'],
            ['name' => '科室主任用户', 'display_name' => '科室主任用户',
                'description' => '科室负责人，拥有科室办公中所有的权限.'],
            ['name' => '组长用户', 'display_name' => '组长用户',
                'description' => '小组负责人，拥有科室办公中组长专有的权限，例如请假审核、绩效审核等.'],
            ['name' => '普通员工', 'display_name' => '普通员工',
                'description' => '一般用户，拥有系统最基本的功能的使用权限.'],
        ];

        for ($i = 0; $i < count($roles); $i++) {
            $roles[$i]['created_at'] = Carbon::now();
            $roles[$i]['updated_at'] = Carbon::now();
        }

        TestHelper::start();
        Role::insert($roles);
        TestHelper::end($this->command, 'roles create');

        TestHelper::start();
        $roles = Role::all();
        //节点管理员
        $roles->get(0)->attachPermissions($permissions);

        //科室主任用户
        $roles->get(1)->attachPermissions($permissions->slice(0, 24));

        //组长用户
        $roles->get(2)->attachPermissions($permissions->slice(0, 19)
            ->merge($permissions->slice(21, 3)));

        //普通员工
        $roles->get(3)->attachPermissions($permissions->slice(0, 16)
            ->merge($permissions->slice(21, 1)));

        TestHelper::end($this->command, 'roles attachPermissions');
        ////////////////////////////////////////////////////////////////////////////////////////////

        TestHelper::start();
        $users = User::all();

        $users->get(0)->attachRole($roles->get(0));
        $users->get(1)->attachRole($roles->get(1));
        $users->get(2)->attachRole($roles->get(2));
        $users->get(3)->attachRole($roles->get(3));
        $users->get(4)->attachRole($roles->get(3));
        TestHelper::end($this->command, 'User attachRole');
    }
}