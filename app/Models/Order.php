<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    
    protected $guarded = ["id"];
    
    public $timestamps = false;

    public function guest()
    {
        return $this->belongsTo(Guest::class, 'guest_id', 'id');
    }

    public function room()
    {
        return $this->belongsTo(Room::class, 'room_id', 'id');
    }
}
