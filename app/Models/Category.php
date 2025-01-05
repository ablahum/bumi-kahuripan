<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    use HasFactory;

    protected $guarded = ["id"];
    
    public $timestamps = false;
    
    public function room(): HasMany
    {
        return $this->hasMany(Room::class, 'category_id', 'id');
    }
}
