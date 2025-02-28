<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// Define the login route (GET method to show the login form)
Route::get('login', [AuthController::class, 'showLoginForm'])->name('login');

// Define the login route (POST method to handle form submission)
Route::post('login', [AuthController::class, 'login']);
