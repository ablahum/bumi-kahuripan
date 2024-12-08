<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Guest;
use App\Models\Order;
use App\Models\Room;
use Illuminate\Support\Facades\Log;

class OrdersController extends Controller
{
    public function index()
    {
        $orders = Order::with('guest')->with('room')->get();
        $rooms = Room::all();

        if (!$orders || !$rooms)
            return response()->json([
                'message' => 'Orders or Rooms not found.',
            ], 404);
        
        return response()->json([
            'message' => 'Guest and Order successfully fetched.',
            'orders' => $orders,
            'rooms' => $rooms
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request['room_id'] = (int) $request['room_id'];
        $request['total_price'] = (int) $request['total_price'];
        
        $guest_data = $request->validate([
            'name' => 'required|string|max:255',
            'origin' => 'required|string|max:255',
            'phone' => 'required|string|max:255',
        ]);

        $order_data = $request->validate([
            'room_id' => 'required|integer',
            'start_date' => 'required|string|date_format:Y-m-d',
            'end_date' => 'required|string|date_format:Y-m-d|after_or_equal:start_date',
            'total_price' => 'required|integer'
        ]);

        $guest = Guest::create($guest_data);
        $order_data['guest_id'] = $guest->id;
        Order::create($order_data);

        return response()->json([
            'message' => 'Guest and Order successfully created.',
        ], 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request['room_id'] = (int) $request['room_id'];
        $request['total_price'] = (int) $request['total_price'];
        
        $guest_data = $request->validate([
            'name' => 'required|string|max:255',
            'origin' => 'required|string|max:255',
            'phone' => 'required|string|max:255',
        ]);

        $order_data = $request->validate([
            'room_id' => 'required|integer',
            'start_date' => 'required|string|date_format:Y-m-d',
            'end_date' => 'required|string|date_format:Y-m-d|after_or_equal:start_date',
            'total_price' => 'required|integer'
        ]);

        $order = Order::find($id);
        $guest = Guest::find($order->guest_id);
    
        $guest->update($guest_data);
        $order->update($order_data);
        
        return response()->json([
            'message' => 'Guest and Order successfully updated.',
        ], 204);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        
        $order = Order::find($id);
        $guest = Guest::find($order->guest_id);

        // Log::debug($guest);
    
        if (!$guest || !$order)
            return response()->json([
                'message' => 'Guest or Order not found.',
            ], 404);
    
        $order->delete();
        $guest->delete();
        return response()->json([
            'message' => 'Guest and Order successfully deleted.',
        ], 204);
    }
}