<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 15-5-10
 * Time: 上午1:23
 */

use App\Models\Node\Route;
use App\Utils\TestHelper;
use Illuminate\Database\Seeder;
use Carbon\Carbon;


class RouteTableSeeder extends Seeder
{
    public function run()
    {
        Route::truncate();
        $routes = [
            ['state' => 'app.patients_reg', 'url' => '/patients/reg', 'templateUrl' => 'views/categories/patients/reg.html', 'controller' => 'PatientsRegCtrl', 'category_id' => 3],//1
            ['state' => 'app.patients_in', 'url' => '/patients/in', 'templateUrl' => 'views/categories/patients/in.html', 'controller' => 'PatientsInCtrl', 'category_id' => 4],//2
            ['state' => 'app.patients_report', 'url' => '/patients/report', 'templateUrl' => 'views/categories/patients/report.html', 'controller' => 'PatientsReportCtrl', 'category_id' => 5],//3
            ['state' => 'app.patients_detail', 'url' => '/patients/detail', 'templateUrl' => 'views/categories/patients/detail.html', 'controller' => 'PatientsDetailCtrl', 'category_id' => 6],//4
            ['state' => 'app.patients_out', 'url' => '/patients/out', 'templateUrl' => 'views/categories/patients/out.html', 'controller' => 'PatientsOutCtrl', 'category_id' => 7],//5

            ['state' => 'app.remote_apply', 'url' => '/remotely', 'templateUrl' => 'views/categories/remote/apply.html', 'controller' => 'RemoteApplyCtrl', 'category_id' => 9],//6
            ['state' => 'app.remote_verify', 'url' => '/remote/verify', 'templateUrl' => 'views/categories/remote/verify.html', 'controller' => 'RemoteVerifyCtrl', 'category_id' => 10],//7


            ['state' => 'app.personal_profile', 'url' => '/personal/profile', 'templateUrl' => 'views/categories/personal/profile.html', 'controller' => 'UserProfileCtrl', 'category_id' => 12],//8
            ['state' => 'app.personal_ask4leave', 'url' => '/personal/ask4leave', 'templateUrl' => 'views/categories/personal/ask4leave.html', 'controller' => 'UserAsk4leaveCtrl', 'category_id' => 13],//9
            ['state' => 'app.personal_notification', 'url' => '/personal/notification', 'templateUrl' => 'views/categories/personal/notification.html', 'controller' => 'UserNotifyCtrl', 'category_id' => 14],//10
            ['state' => 'app.personal_performance', 'url' => '/personal/performance', 'templateUrl' => 'views/categories/personal/performance.html', 'controller' => 'UserPerCtrl', 'category_id' => 15],//11

            ['state' => 'app.office_leave_verify', 'url' => '/office/leave_verify', 'templateUrl' => 'views/categories/office/leave_verify.html', 'controller' => 'LeaveVerifyCtrl', 'category_id' => 17],//12
            ['state' => 'app.office_performance_verify', 'url' => '/office/performance_verify', 'templateUrl' => 'views/categories/office/performance_verify.html', 'controller' => 'PerVerifyCtrl', 'category_id' => 18],//13
            ['state' => 'app.office_notification', 'url' => '/office/notification', 'templateUrl' => 'views/categories/office/notification.html', 'controller' => 'OfficeNotifyCtrl', 'category_id' => 19],//14
            ['state' => 'app.office_change_workload', 'url' => '/office/change_workload', 'templateUrl' => 'views/categories/office/change_workload.html', 'controller' => 'WorkloadCtrl', 'category_id' => 20],//15
            ['state' => 'app.office_performance_manage', 'url' => '/office/performance_manage', 'templateUrl' => 'views/categories/office/performance_manage.html', 'controller' => 'PerManageCtrl', 'category_id' => 21],//16
            ['state' => 'app.office_employee_info', 'url' => '/office/employee_info', 'templateUrl' => 'views/categories/office/employee_info.html', 'controller' => 'EmployeeInfoCtrl', 'category_id' => 22],//17

            ['state' => 'app.office_quality', 'url' => '/statistics/quality', 'templateUrl' => 'views/categories/statistics/quality.html', 'controller' => 'QualityCtrl', 'category_id' => 24],//18

            ['state' => 'app.setting_employee', 'url' => '/setting/employee', 'templateUrl' => 'views/categories/setting/employee.html', 'controller' => 'EmployeeCtrl', 'category_id' => 26],//19
            ['state' => 'app.setting_basic', 'url' => '/setting/basic', 'templateUrl' => 'views/categories/setting/basic.html', 'controller' => 'BasicCtrl', 'category_id' => 27],//20
            ['state' => 'app.setting_office', 'url' => '/setting/office', 'templateUrl' => 'views/categories/setting/office.html', 'controller' => 'OfficeCtrl', 'category_id' => 28],//21
            ['state' => 'app.setting_custom_report', 'url' => '/setting/custom_report', 'templateUrl' => 'views/categories/setting/custom_report.html', 'controller' => 'CustomReportCtrl', 'category_id' => 29],//22

        ];

        for ($i = 0; $i < count($routes); $i++) {
            $routes[$i]['created_at'] = Carbon::now();
            $routes[$i]['updated_at'] = Carbon::now();
        }

        TestHelper::start();
        Route::insert($routes);
        TestHelper::end($this->command, 'routes create');
    }
}