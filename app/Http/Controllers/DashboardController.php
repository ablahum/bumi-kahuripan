<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Room;

class DashboardController extends Controller
{
  public function orderStats()
  {
    $dailyOrders = Order::whereDate('start_date', now());
    $dailyCount = $dailyOrders->count();
    $dailyRevenue = $dailyOrders->sum('total_price');
    $checkIn = (clone $dailyOrders)
      ->whereHas('status', function ($q) {
        $q->where('name', 'checkin');
      })->count();
    $checkOut = (clone $dailyOrders)
      ->whereHas('status', function ($q) {
        $q->where('name', 'checkout');
      })->count();

    $weeklyOrders = Order::whereBetween('start_date', [now()->startOfWeek(), now()->endOfWeek()]);
    $weeklyCount = $weeklyOrders->count();
    $weeklyRevenue = $weeklyOrders->sum('total_price');

    $monthlyOrders = Order::whereMonth('start_date', now()->month);
    $monthlyCount = $monthlyOrders->count();
    $monthlyRevenue = $monthlyOrders->sum('total_price');

    $annuallyOrders = Order::whereYear('start_date', now()->year);
    $annuallyCount = $annuallyOrders->count();
    $annuallyRevenue = $annuallyOrders->sum('total_price');

    return response()->json([
      'message' => 'Order stats successfully fetched.',
      'data' => [
        'status' => [
          'check-in' => $checkIn,
          'check-out' => $checkOut
        ],
        'total' => [
          'daily' => [
            'count' => $dailyCount,
            'revenue' => $dailyRevenue,
          ],
          'weekly' => [
            'count' => $weeklyCount,
            'revenue' => $weeklyRevenue,
          ],
          'monthly' => [
            'count' => $monthlyCount,
            'revenue' => $monthlyRevenue,
          ],
          'annually' => [
            'count' => $annuallyCount,
            'revenue' => $annuallyRevenue,
          ],
        ]
      ],
    ], 200);
  }


  public function roomStats()
  {
    $availableRooms = Room::whereHas('status', function ($q) {
      $q->where('name', 'available');
    })->count();
    $unavailableRooms = Room::whereHas('status', function ($q) {
      $q->where('name', 'unavailable');
    })->count();

    return response()->json([
      'message' => 'Room stats successfully fetched.',
      'data' => [
        'available' => $availableRooms,
        'unavailable' => $unavailableRooms,
      ]
    ], 200);
  }
}
