<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('orders', function (Blueprint $table) {
      $table->id();
      $table->foreignId('guest_id')->constrained('guests');
      $table->foreignId('room_id')->constrained('rooms');
      $table->date('start_date');
      $table->date('end_date');
      $table->integer('total_price');
      $table->foreignId('status_id')->constrained('statuses');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('orders');
  }
};
