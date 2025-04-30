<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Status extends Model
{
  use HasFactory;

  protected $guarded = ["id"];

  public $timestamps = false;

  public function room(): HasMany
  {
    return $this->hasMany(Room::class, 'status_id', 'id');
  }

  public function order(): HasMany
  {
    return $this->hasMany(Order::class, 'status_id', 'id');
  }
}
