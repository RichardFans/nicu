<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 15-5-28
 * Time: 上午12:06
 */

namespace App\Utils;


class TestHelper
{
    public static $time;

    public static function start()
    {
        self::$time = microtime(true) * 1000;
    }

    public static function end($command, $name)
    {
        $command->info($name . ': ' . round(microtime(true) * 1000 - self::$time) . 'ms');
    }
}