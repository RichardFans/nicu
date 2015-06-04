<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 15-5-10
 * Time: 上午1:23
 */

use Illuminate\Database\Seeder;
use App\Models\Node\Category;
use App\Utils\TestHelper;


class CategoryTableSeeder extends Seeder
{
    public function run()
    {
        Category::truncate();
        $categories = [
            //根权限
            ['display_name' => '使用NICU的权限', 'permission_id' => 1, 'children' => [
                //  一级权限
                ['display_name' => '病人管理', 'icon' => 'bed', 'permission_id' => 2, 'children' => [ //2
                    //二级权限
                    ['display_name' => '入科登记', 'permission_id' => 3],//3
                    ['display_name' => '在科病人', 'permission_id' => 4],//4
                    ['display_name' => '临床报表','permission_id' => 5],//5
                    ['display_name' => '在院明细', 'permission_id' => 6],//6
                    ['display_name' => '出科病人', 'permission_id' => 7],//7
                ]],
                //  一级权限
                ['display_name' => '远程医疗', 'icon' => 'hospital-o', 'permission_id' => 8, 'children' => [
                    ['display_name' => '转院申请', 'permission_id' => 9],//9
                    ['display_name' => '转入审核', 'permission_id' => 10],//10
                ]],//8

                //  一级权限
                ['display_name' => '用户中心', 'icon' => 'user', 'permission_id' => 11, 'children' => [
                    ['display_name' => '个人资料', 'permission_id' => 12],//12
                    ['display_name' => '请假申请', 'permission_id' => 13],//13
                    ['display_name' => '个人通知','permission_id' => 14],//14
                    ['display_name' => '个人绩效', 'permission_id' => 15],//15
                ]],//20

                //  一级权限, 'permission_id' => 7
                ['display_name' => '科室办公', 'icon' => 'suitcase', 'permission_id' => 16, 'children' => [
                    ['display_name' => '请假审核', 'permission_id' => 17],//17
                    ['display_name' => '绩效审核', 'permission_id' => 18],//18
                    ['display_name' => '科室通知', 'permission_id' => 19],//19
                    ['display_name' => '工作量更改', 'permission_id' => 20],//20
                    ['display_name' => '绩效管理', 'permission_id' => 21],//21
                    ['display_name' => '员工信息', 'permission_id' => 22],//22
                ]],//16

                //  一级权限
                ['display_name' => '统计分析', 'icon' => 'bar-chart', 'permission_id' => 23, 'children' => [
                    ['display_name' => '质控指标', 'permission_id' => 24],//24
                ]],//40

                //  一级权限
                ['display_name' => '系统管理', 'icon' => 'cogs', 'permission_id' => 25, 'children' => [
                    ['display_name' => '员工管理', 'permission_id' => 26],//26
                    ['display_name' => '基础设置', 'permission_id' => 27],//27
                    ['display_name' => '办公设置', 'permission_id' => 28],//28
                    ['display_name' => '自定义报表', 'permission_id' => 29],//29
                ]],//25

            ]]
        ];

        TestHelper::start();
        Category::buildTree($categories);
        TestHelper::end($this->command, 'category create');
    }
}