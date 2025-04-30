<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Order extends Model
{
  use HasFactory;

  protected $guarded = ["id"];

  public $timestamps = false;

  public function guest(): BelongsTo
  {
    return $this->belongsTo(Guest::class, 'guest_id', 'id');
  }

  public function room(): BelongsTo
  {
    return $this->belongsTo(Room::class, 'room_id', 'id');
  }

  public function status(): BelongsTo
  {
    return $this->belongsTo(Status::class, 'status_id', 'id');
  }
}
