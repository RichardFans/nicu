<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 15-5-7
 * Time: 上午1:24
 */
use Illuminate\Database\Seeder;
use App\Models\Nodes\Node;

class NodeTableSeeder extends Seeder
{

    public function run()
    {
//        DB::table('nodes')->delete();
        Node::truncate();

        $nodes = [
            ['name' => '华西医科大学ICU',
                'bed_number' => '100',
                'is_applied' => true,

                'db_host' => 'localhost',
                'db_name' => 'huaxi',
                'username' => 'huaxi',
                'password' => bcrypt('123456'),

                'create_time' => Carbon\Carbon::now(),
                'expire_time' => Carbon\Carbon::now()->addMonths(6),

                'contacts' => '吴小东',
                'phone' => '028-87581178',
                'mobile' => '18328322322',
                'email' => 'wxd_997@163.com',
                'post' => '副主任',
                'created_at' => Carbon\Carbon::now(),
                'updated_at' => Carbon\Carbon::now(),
            ],
            ['name' => '重庆医科大学ICU',
                'bed_number' => '80',
                'is_applied' => true,

                'db_host' => 'localhost',
                'db_name' => 'chongyi',
                'username' => 'chongyi',
                'password' => bcrypt('888888'),

                'create_time' => Carbon\Carbon::now(),
                'expire_time' => Carbon\Carbon::now()->addMonths(3),

                'contacts' => '王明',
                'phone' => '023-65334568',
                'mobile' => '13528322887',
                'email' => 'wm_998@163.com',
                'post' => '副主任',
                'created_at' => Carbon\Carbon::now(),
                'updated_at' => Carbon\Carbon::now(),]
        ];

//        foreach ($nodes as $node) {
//            Node::create($node);
//        }
        Node::insert($nodes);

    }
}
