<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 15-5-10
 * Time: 上午1:23
 */

use Illuminate\Database\Seeder;


class CategoryTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('categories')->delete();

        $permissions = [
            //根权限
            ['name' => 'app', 'display_name' => '使用NICU的权限'],//id == 1

            //  一级权限
            ['name' => 'app.patients', 'display_name' => '病人管理'],//2

            ['name' => 'app.patients.reg', 'display_name' => '入科登记'],//3
            ['name' => 'app.patients.reg.new', 'display_name' => '新入病人登记'],//4
            ['name' => 'app.patients.reg.return', 'display_name' => '出院病人重新转入'],//5

            ['name' => 'app.patients.in_hospital', 'display_name' => '在科病人'],//6
            ['name' => 'app.patients.in_hospital.bed', 'display_name' => '病人与床位'],//7
            ['name' => 'app.patients.in_hospital.detail', 'display_name' => '在院明细'],//8

            ['name' => 'app.patients.leave', 'display_name' => '出科病人'],//9
            ['name' => 'app.patients.leave.info', 'display_name' => '出科病人信息'],//10
            ['name' => 'app.patients.leave.report', 'display_name' => '补打报表'],//11

            ['name' => 'app.patients.report', 'display_name' => '工作报表'],//12
            ['name' => 'app.patients.report.shift', 'display_name' => '交班报表'],//13
            ['name' => 'app.patients.report.daily', 'display_name' => '日报表'],//14
            ['name' => 'app.patients.report.apache', 'display_name' => 'ApacheII评分月报表'],//15
            ['name' => 'app.patients.report.critical_care', 'display_name' => '危重护理'],//16

            //  一级权限
            ['name' => 'app.remote', 'display_name' => '远程医疗'],//17
            ['name' => 'app.remote.apply', 'display_name' => '转院申请'],//18
            ['name' => 'app.remote.verify', 'display_name' => '转院申请审核'],//19

            //  一级权限
            ['name' => 'app.personal', 'display_name' => '用户中心'],//20

            ['name' => 'app.personal.profile', 'display_name' => '个人资料'],//21
            ['name' => 'app.personal.profile.info', 'display_name' => '个人信息'],//22
            ['name' => 'app.personal.profile.modify', 'display_name' => '账户修改'],//23

            ['name' => 'app.personal.ask4leave', 'display_name' => '请假申请与查询'],//24

            ['name' => 'app.personal.notification', 'display_name' => '个人通知'],//25

            ['name' => 'app.personal.performance', 'display_name' => '个人绩效'],//26
            ['name' => 'app.personal.performance.workload', 'display_name' => '工作量考核'],//27
            ['name' => 'app.personal.performance.office', 'display_name' => '科室考核'],//28

            //  一级权限
            ['name' => 'app.office', 'display_name' => '科室办公'],//29
            ['name' => 'app.office.leave_verify', 'display_name' => '请假审核'],//30
            ['name' => 'app.office.leave_verify.team_leader', 'display_name' => '组长审核'],//31
            ['name' => 'app.office.leave_verify.office_leader', 'display_name' => '科室审核'],//32

            ['name' => 'app.office.notification', 'display_name' => '科室通知'],//33

            ['name' => 'app.office.performance_verify', 'display_name' => '绩效审核'],//34
            ['name' => 'app.office.performance_verify.team_leader', 'display_name' => '组长审核'],//35
            ['name' => 'app.office.performance_verify.office_leader', 'display_name' => '科室审核'],//36

            ['name' => 'app.office.employee_info', 'display_name' => '员工信息'],//37
            ['name' => 'app.office.employee_info.contacts', 'display_name' => '科室通信录'],//38
            ['name' => 'app.office.employee_info.birthday', 'display_name' => '员工生日查询'],//39

            //  一级权限
            ['name' => 'app.statistics', 'display_name' => '统计分析'],//40
            ['name' => 'app.statistics.quality', 'display_name' => '质控信息统计'],//41
            ['name' => 'app.statistics.hospital', 'display_name' => '住院数据统计'],//42
            ['name' => 'app.statistics.others', 'display_name' => '其他数据统计'],//43

            //  一级权限
            ['name' => 'app.setting', 'display_name' => '系统管理'],//44

            ['name' => 'app.setting.employee', 'display_name' => '员工管理'],//45
            ['name' => 'app.setting.employee.type', 'display_name' => '员工分类'],//46
            ['name' => 'app.setting.employee.role', 'display_name' => '员工角色'],//47
            ['name' => 'app.setting.employee.info', 'display_name' => '员工信息'],//48

            ['name' => 'app.setting.hospital', 'display_name' => '住院管理'],//49
            ['name' => 'app.setting.hospital.ward', 'display_name' => '病区管理'],//50
            ['name' => 'app.setting.hospital.bed', 'display_name' => '床位管理'],//51
            ['name' => 'app.setting.hospital.bed_type', 'display_name' => '床位类型管理'],//52
            ['name' => 'app.setting.hospital.diagnosis.', 'display_name' => '常用诊断管理'],//53
            ['name' => 'app.setting.hospital.src_ward', 'display_name' => '来源病区管理'],//54
            ['name' => 'app.setting.hospital.in_type', 'display_name' => '转入类型管理'],//55
            ['name' => 'app.setting.hospital.pathogens', 'display_name' => '常见病原管理'],//56
            ['name' => 'app.setting.hospital.specimen_type', 'display_name' => '标本类型管理'],//57
            ['name' => 'app.setting.hospital.fixed_diagnosis', 'display_name' => '固定诊疗管理'],//58
            ['name' => 'app.setting.hospital.custom_diagnosis', 'display_name' => '自定义诊疗项目'],//59

            ['name' => 'app.setting.office', 'display_name' => '办公管理'],//60
            ['name' => 'app.setting.office.adverse_events', 'display_name' => '医疗不良事件'],//61
            ['name' => 'app.setting.office.notification_type', 'display_name' => '通知类型'],//62
            ['name' => 'app.setting.office.verify_type', 'display_name' => '考核类型'],//63

            ['name' => 'app.setting.custom_report', 'display_name' => '自定义报表'],//64

        ];

        $this->command->info('  permissions...');
        foreach ($permissions as $permission) {
            Permission::create($permission);
        }

        $permissions = Permission::all();

        ////////////////////////////////////////////////////////////////////////////////////////////
        $this->command->info('  roles...');
        DB::table('categories')->delete();

        $roles = [
            ['name' => 'node_admin', 'display_name' => '节点管理员'],
            ['name' => 'office_leader', 'display_name' => '科室主任用户'],
            ['name' => 'team_leader', 'display_name' => '组长用户'],
            ['name' => 'team_member', 'display_name' => '普通员工'],
        ];

        foreach ($roles as $role) {
            Role::create($role);
        }

        $roles = Role::all();

        for ($i = 0; $i < count($roles); $i++) {
            $roles->get($i)->attachPermissions($permissions);
        }

        //科室主任用户
        for ($i = 43; $i < 64; $i++) {
            $roles->get(1)->detachPermission($permissions->get($i));
        }
        $roles->get(1)->detachPermission($permissions->get(31));
        $roles->get(1)->detachPermission($permissions->get(35));

        //组长用户
        for ($i = 43; $i < 64; $i++) {
            $roles->get(2)->detachPermission($permissions->get($i));
        }
        $roles->get(2)->detachPermission($permissions->get(32));
        $roles->get(2)->detachPermission($permissions->get(33));
        $roles->get(2)->detachPermission($permissions->get(36));

        //普通员工
        for ($i = 43; $i < 64; $i++) {
            $roles->get(3)->detachPermission($permissions->get($i));
        }
        for ($i = 29; $i < 35; $i++) {
            $roles->get(3)->detachPermission($permissions->get($i));
        }

        ////////////////////////////////////////////////////////////////////////////////////////////

        $users = User::all();

        $users->get(0)->attachRole($roles->get(0));
        $users->get(1)->attachRole($roles->get(1));
        $users->get(2)->attachRole($roles->get(2));
        $users->get(3)->attachRole($roles->get(3));
        $users->get(4)->attachRole($roles->get(3));
    }
}