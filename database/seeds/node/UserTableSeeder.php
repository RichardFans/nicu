<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 15-5-7
 * Time: 下午12:12
 */
use App\Models\Node\User;
use App\Utils\TestHelper;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    public function run()
    {
//        DB::table('users')->delete();
        User::truncate();

        $users = [
            //1
            ['username' => 'richard',
                'password' => bcrypt('888888'),

                'last_ip' => '192.168.1.5',
                'last_time' => Carbon::now(),

                'name' => '范范',
                'phone' => '15928792340',
                'email' => 'fanfan@163.com',

                'sex' => false,
                'birthday' => Carbon::parse('1986-10-17'),

                'title' => 1,
                'post' => '主任',
                'is_licensed' => true,

                'edu_level' => 2,
                'entry_time' => Carbon::parse('2013-02-20'),

                'type_id' => 1,
            ],
            //2
            ['username' => 'he_lan',
                'password' => bcrypt('888888'),

                'last_ip' => '192.168.1.3',
                'last_time' => Carbon::now(),

                'name' => '何兰',
                'phone' => '18615797850',
                'email' => 'helan@163.com',

                'sex' => false,
                'birthday' => Carbon::parse('1978-11-28'),

                'title' => 1,
                'post' => '副主任',
                'is_licensed' => true,

                'edu_level' => 2,
                'entry_time' => Carbon::parse('2012-02-20'),

                'type_id' => 1,
            ],
            //3
            ['username' => 'sun_yong',
                'password' => bcrypt('123456'),

                'last_ip' => '192.168.1.4',
                'last_time' => Carbon::now(),

                'name' => '孙勇',
                'phone' => '13666179587',
                'email' => 'sunyong@163.com',

                'sex' => true,
                'birthday' => Carbon::parse('1976-07-24'),

                'title' => 1,
                'post' => '主治医师',
                'is_licensed' => true,

                'edu_level' => 2,
                'entry_time' => Carbon::parse('2013-10-01'),

                'type_id' => 1,
            ],
            //4
            ['username' => 'wang_jin_rong',
                'password' => bcrypt('123456'),

                'last_ip' => '192.168.1.5',
                'last_time' => Carbon::now(),

                'name' => '王金容',
                'phone' => '18382148620',
                'email' => 'wjr@163.com',

                'sex' => false,
                'birthday' => Carbon::parse('1990-04-17'),

                'title' => 1,
                'post' => '护士',
                'is_licensed' => true,

                'edu_level' => 3,
                'entry_time' => Carbon::parse('2014-04-15'),

                'type_id' => 1,
            ],
            //5
            ['username' => 'alayang',
                'password' => bcrypt('888888'),

                'last_ip' => '192.168.1.6',
                'last_time' => Carbon::now(),

                'name' => '莹莹',
                'phone' => '15528429375',
                'email' => 'alayang@163.com',

                'sex' => false,
                'birthday' => Carbon::parse('1990-10-17'),

                'title' => 1,
                'post' => '护士',
                'is_licensed' => true,

                'edu_level' => 3,
                'entry_time' => Carbon::parse('2014-04-15'),

                'type_id' => 1,
            ],
        ];

        foreach ($users as $i => $user) {
            $users[$i]['created_at'] = Carbon::now();
            $users[$i]['updated_at'] = Carbon::now();
        }
        TestHelper::start();
//        foreach ($users as $user) {
//            User::create($user);
//        }
        User::insert($users);
        TestHelper::end($this->command, 'users create');
    }
}
