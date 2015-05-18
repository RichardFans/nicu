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

Route::group(array('prefix' => 'api'), function () {

    Route::group(array('prefix' => 'v1'), function () {

        Route::resource('users', 'Api\V1\UserController',
            array('only' => array('index', 'store', 'show', 'update', 'destroy')));

        Route::resource('nodes', 'Api\V1\NodeController',
            array('only' => array('index')));

    });
});
