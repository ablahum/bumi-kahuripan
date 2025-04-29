<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Support\Facades\Log;

class SettingsController extends Controller
{
  public function index()
  {
    $categories = Category::all();

    if (!$categories)
      return response()->json([
        'message' => 'Categories not found.',
      ], 404);

    return response()->json([
      'message' => 'All settings successfully fetched.',
      'data' => [
        'categories' => $categories
      ]
    ], 200);
  }

  public function update(Request $request)
  {
    $data = $request->validate([
      'category' => 'required|integer',
    ]);

    $category = Category::where('name', 'ac')->first();

    if (!$category)
      return response()->json([
        'message' => 'Category not found.',
      ], 404);

    $category->additional_price = $data['category'];
    $category->save();
    return response()->json([
      'message' => 'Settings successfully updated.',
      'data' => [
        'category' => $category
      ]
    ], 204);
  }
}
