<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Guest;
use App\Models\Order;
use App\Models\Room;
use Illuminate\Support\Facades\Storage;

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
    $request['status_id'] = (int) $request['status_id'];

    $file = $request->file('identity_photo');
    $guestData = $request->validate([
      'name' => 'required|string|max:255',
      'origin' => 'required|string|max:255',
      'phone' => 'required|string|max:255',
      'identity_photo' => 'required|mimes:jpeg,jpg,png'
    ]);

    $orderData = $request->validate([
      'room_id' => 'required|integer',
      'start_date' => 'required|string|date_format:Y-m-d',
      'end_date' => 'required|string|date_format:Y-m-d|after:start_date',
      'total_price' => 'required|integer',
      'status_id' => 'required|integer',
    ]);

    $path = $file->store('uploads', 'public');

    $guestData['identity_photo'] = $path;
    $guest = Guest::create($guestData);
    $orderData['guest_id'] = $guest->id;
    Order::create($orderData);

    Room::find($request['room_id'])->update(['status' => 'unavailable']);

    return response()->json([
      'message' => 'Guest and Order successfully created.',
      'path' => $path
    ], 201);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, string $id)
  {
    $request['room_id'] = (int) $request['room_id'];
    $request['total_price'] = (int) $request['total_price'];
    $request['status_id'] = (int) $request['status_id'];

    $guestData = $request->validate([
      'name' => 'required|string|max:255',
      'origin' => 'required|string|max:255',
      'phone' => 'required|string|max:255',
      'identity_photo' => [
        'sometimes',
        function ($attribute, $value, $fail) {
          if (request()->hasFile('identity_photo')) {
            $file = request()->file('identity_photo');
            if (!in_array($file->getClientOriginalExtension(), ['jpeg', 'jpg', 'png'])) {
              $fail('Identity photo format must be JPG, JPEG, or PNG.');
            }
          } else if (is_string($value)) {
            if (!preg_match('/\.(jpg|jpeg|png)$/i', $value)) {
              $fail('Old file path format must be JPG, JPEG, or PNG.');
            }
          } else {
            $fail('Format not valid.');
          }
        }
      ]
    ]);

    $orderData = $request->validate([
      'room_id' => 'required|integer',
      'start_date' => 'required|string|date_format:Y-m-d',
      'end_date' => 'required|string|date_format:Y-m-d|after:start_date',
      'total_price' => 'required|integer',
      'status_id' => 'required|integer',
    ]);

    $order = Order::find($id);
    $guest = Guest::find($order->guest_id);

    if (!$order || !$guest)
      return response()->json([
        'message' => 'Guest or Order not found.',
      ], 404);

    if ($oldRoom = Room::find($order->room_id)) {
      $oldRoom->update(['status' => 'available']);
    }
    if ($newRoom = Room::find($request['room_id'])) {
      $newRoom->update(['status' => 'unavailable']);
    }

    if ($request->hasFile('identity_photo')) {
      $file = $request->file('identity_photo');

      if ($guest->identity_photo) Storage::disk('public')->delete($guest->identity_photo);
      $path = $file->store('uploads', 'public');

      $guestData['identity_photo'] = $path;
    }

    $guest->update($guestData);
    $order->update($orderData);

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
    $room = Room::find($order->room_id);

    if (!$guest || !$order)
      return response()->json([
        'message' => 'Guest or Order not found.',
      ], 404);

    if ($guest->identity_photo) Storage::disk('public')->delete($guest->identity_photo);

    $order->delete();
    $guest->delete();
    $room->update(['status' => 'available']);

    return response()->json([
      'message' => 'Guest and Order successfully deleted.',
    ], 204);
  }
}
