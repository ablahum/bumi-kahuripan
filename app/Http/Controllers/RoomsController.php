<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Room;
use App\Models\Category;

class RoomsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $rooms = Room::with('category')->get()->makeHidden('category_id');
        $rooms = Room::with('category')->get();
        $categories = Category::all();

        if (!$rooms || !$categories)
            return response()->json([
                'message' => 'Rooms or Categories not found.',
            ], 404);
        
        return response()->json([
            'message' => 'Rooms successfully fetched.',
            'rooms' => $rooms,
            'categories' => $categories
        ], 200);
    }
    
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request['number'] = (int) $request['number'];
        $request['category_id'] = (int) $request['category_id'];
        $request['price'] = (int) $request['price'];
        
        $data = $request->validate([
            'number' => 'required|integer',
            'price' => 'required|integer',
            'status' => 'required|string',
            'category_id' => 'required|integer',
        ]);

        Room::create($data);
        return response()->json([
            'message' => 'Room successfully created.',
        ], 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request['number'] = (int) $request['number'];
        $request['category_id'] = (int) $request['category_id'];
        $request['price'] = (int) $request['price'];
        
        $data = $request->validate([
            'number' => 'required|integer',
            'price' => 'required|integer',
            'status' => 'required|string',
            'category_id' => 'required|integer',
        ]);

        $room = Room::find($id);

        if (!$room)
            return response()->json([
                'message' => 'Room not found.',
            ], 404);
        
        $room->update($data);
        return response()->json([
            'message' => 'Room successfully updated.',
        ], 204);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $room = Room::find($id);
    
        if (!$room)
            return response()->json([
                'message' => 'Room not found.',
            ], 404);
    
        $room->destroy($id);
        return response()->json([
            'message' => 'Room successfully deleted.',
        ], 204);
    }
}
