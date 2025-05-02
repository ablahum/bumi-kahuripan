<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Order;
use Carbon\Carbon;

class CheckoutTask extends Command
{
  /**
   * The name and signature of the console command.
   *
   * @var string
   */
  protected $signature = 'app:checkout-task';

  /**
   * The console command description.
   *
   * @var string
   */
  protected $description = 'Command description';

  /**
   * Execute the console command.
   */
  public function handle()
  {
    $today = Carbon::today()->toDateString();

    Order::whereDate('end_date', $today)
      ->where('status_id', '!=', 4)
      ->update(['status_id' => 4]);
  }
}
