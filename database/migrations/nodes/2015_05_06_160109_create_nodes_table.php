<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNodesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('nodes', function(Blueprint $table)
		{
			$table->increments('id');
            $table->string('name', 80);         //节点名称，也即学科名称
            $table->smallInteger('bed_number'); //最大开放床位数 ~32767
            $table->boolean('is_applied');       //是否接受新入申请

            $table->string('db_host', 80);      //节点数据库主机名
            $table->string('db_name', 20);      //节点数据库名称
            $table->string('username', 20);     //节点数据库用户名
            $table->string('password', 60);     //节点数据库密码

            $table->dateTime('create_time');     //账号创建时间
            $table->dateTime('expire_time');     //账号过期时间

            $table->string('contacts', 20);      //联系人姓名（也就是节点的管理员）
            $table->string('mobile', 20);        //手机
            $table->string('phone', 20);         //学科固定联系电话
            $table->string('email', 80);
            $table->string('post', 20);          //职务

            $table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('nodes');
	}

}
