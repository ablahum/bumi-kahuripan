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
        ],
        'breakdown' => [
          'weekly' => $this->breakdown('weekly'),
          'monthly' => $this->breakdown('monthly'),
          'annually' => $this->breakdown('annually'),
        ]
      ],
    ], 200);
  }

  private function breakdown(String $type)
  {
    switch ($type) {
      case 'weekly':
        $days = [];
        $startOfWeek = now()->startOfWeek();

        for ($i = 0; $i < 7; $i++) {
          $day = $startOfWeek->copy()->addDays($i);

          $count = Order::whereDate('start_date', $day)->count();
          $revenue = Order::whereDate('start_date', $day)->sum('total_price');

          $days[] = [
            'label' => $day->translatedFormat('l'),
            'count' => $count,
            'revenue' => $revenue
          ];
        }
        return $days;

      case 'monthly':
        $weeks = [];
        $startOfMonth = now()->startOfMonth();
        $endOfMonth = now()->endOfMonth();
        $current = $startOfMonth->copy();

        while ($current <= $endOfMonth) {
          $startOfWeek = $current->copy()->startOfWeek();
          $endOfWeek = $current->copy()->endOfWeek();

          $count = Order::whereBetween('start_date', [$startOfWeek, $endOfWeek])->count();
          $revenue = Order::whereBetween('start_date', [$startOfWeek, $endOfWeek])->sum('total_price');

          $weeks[] = [
            'label' => 'Minggu ' . $current->weekOfMonth,
            'count' => $count,
            'revenue' => $revenue
          ];

          $current->addWeek();
        }

        return $weeks;

      case 'annually':
        $months = [];

        for ($i = 1; $i <= 12; $i++) {
          $month = now()->copy()->month($i);

          $count = Order::whereMonth('start_date', $i)->whereYear('start_date', now()->year)->count();
          $revenue = Order::whereMonth('start_date', $i)->whereYear('start_date', now()->year)->sum('total_price');

          $months[] = [
            'label' => $month->translatedFormat('F'),
            'count' => $count,
            'revenue' => $revenue
          ];
        }
        return $months;

      default:
        return [];
    }
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
