<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Guest extends Model
{
    use HasFactory;

    protected $guarded = ["id"];
    
    public $timestamps = false;

    public function order(): HasMany
    {
        return $this->hasMany(Order::class, 'order_id', 'id');
    }
}
