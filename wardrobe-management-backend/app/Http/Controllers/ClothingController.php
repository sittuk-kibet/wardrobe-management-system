<?php

namespace App\Http\Controllers;

use App\Models\Clothing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ClothingController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function index()
    {
        return Clothing::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'category' => 'required|string',
            'size' => 'required|string',
            'color' => 'required|string',
        ]);

        $clothing = Clothing::create($validated);
        return response()->json($clothing, 201);
    }

    public function update(Request $request, $id)
    {
        $clothing = Clothing::findOrFail($id);
        $clothing->update($request->all());
        return response()->json($clothing);
    }

    public function destroy($id)
    {
        Clothing::findOrFail($id)->delete();
        return response()->noContent();
    }
}

