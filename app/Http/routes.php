<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('app');
});

Route::controllers([
    'auth' => 'Auth\AuthController',
//	'password' => 'Auth\PasswordController',
]);

Route::group(['prefix' => 'api', 'middleware' => 'switch_node_db'], function () {

    Route::group(['prefix' => 'v1'], function () {

        Route::group(['middleware' => 'jwt.auth'], function() {
            Route::resource('users', 'Api\V1\UserController',
                ['only' => ['index', 'store', 'show', 'update', 'destroy']]);

        });

        Route::resource('nodes', 'Api\V1\NodeController',
            ['only' => ['index']]);

    });

});
