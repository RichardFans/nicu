<?php namespace App\Models\Node;

use Baum\Node;

/**
 * Category
 */
class Category extends Node
{
    protected $connection = 'node';

    protected $table = 'categories';

    protected $visible = array('display_name', 'icon', 'children', 'route');

    public function permission()
    {
        return $this->belongsTo('App\Models\Node\Permission');
    }

    public function route()
    {
        return $this->hasOne('App\Models\Node\Route');
    }
}
