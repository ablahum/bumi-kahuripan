<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Room extends Model
{
  use HasFactory;

  protected $guarded = ["id"];

  public $timestamps = false;

  public function room(): HasOne
  {
    return $this->hasOne(Order::class, 'order_id', 'id');
  }

  public function category(): BelongsTo
  {
    return $this->belongsTo(Category::class, 'category_id', 'id');
  }

  public function status(): BelongsTo
  {
    return $this->belongsTo(Status::class, 'status_id', 'id');
  }
}
