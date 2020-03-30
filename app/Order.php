<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class Order extends Model
{
    public $fillable = ['order_id','card_id','card_title','time','active'];
}
