<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Class CreateUsersTable 用于创建员工信息表
 */
class CreateUsersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('users', function(Blueprint $table)
		{
			$table->increments('id');

            $table->string('username', 20)->unique(); //用户名应该唯一
            $table->string('password', 60); //md5加密

            $table->string('last_ip', 20);       //上次登录ip
            $table->timestamp('last_time');      //上次登录时间
            $table->unsignedInteger('login_count')->default(0);      //登录次数

            $table->string('name', 20);
            $table->boolean('sex');     //男：true，女：false
            $table->date('birthday');

            $table->string('email', 80);
            $table->string('phone', 20);
            //职称：
            //  1：高级；2：副高；3：中级；4：初级；9：其它
            $table->tinyInteger('title');   //职称
            $table->string('post', 20);    //职务
            $table->boolean('is_licensed'); //是否有执照
            //1：博研；2：硕研；3：普本；4：成本；5：大专；6：中专；7：高中；8：其它
            $table->tinyInteger('edu_level');   //最高学历
            $table->date('entry_time');

            $table->unsignedInteger('type_id'); //分类，与员工的分类表关联，外键

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
		Schema::drop('users');
	}

}
