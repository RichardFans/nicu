<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRoutesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('routes', function(Blueprint $table)
		{
			$table->increments('id');

            $table->string('state');
            $table->string('url');
            $table->string('templateUrl');
            $table->string('controller')->nullable();

            $table->integer('category_id')->unsigned();    //菜单id
            $table->foreign('category_id')->references('id')->on('permissions')
                ->onUpdate('cascade')->onDelete('cascade');

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
		Schema::drop('routes');
	}

}
