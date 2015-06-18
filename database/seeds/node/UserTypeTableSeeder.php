<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 15-5-7
 * Time: 下午12:12
 */
use App\Models\Node\UserType;
use App\Utils\TestHelper;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class UserTypeTableSeeder extends Seeder
{
    public function run()
    {
        UserType::truncate();

        $userTypes = [
            //1
            ['parent_id' => 0, 'name' => '医疗组长'], //1
            ['parent_id' => 0, 'name' => '主管医师'], //2
            ['parent_id' => 0, 'name' => 'ICU护理组长'], //3
            ['parent_id' => 0, 'name' => 'ICU护士'], //4
            ['parent_id' => 0, 'name' => '其他'], //5
            ['parent_id' => 3, 'name' => '急诊护理组长'], //6
            ['parent_id' => 4, 'name' => '急诊护士'], //7
            //2

        ];

        foreach ($userTypes as $i => $type) {
            $userTypes[$i]['created_at'] = Carbon::now();
            $userTypes[$i]['updated_at'] = Carbon::now();
        }

        TestHelper::start();
//        foreach ($users as $user) {
//            User::create($user);
//        }
        UserType::insert($userTypes);
        TestHelper::end($this->command, 'userTypes create');
    }
}
