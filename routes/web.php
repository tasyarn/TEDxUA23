<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PreeventAnswerController;
use App\Http\Controllers\PreeventQuestionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PartnershipController;
use App\Http\Controllers\MerchQuizController;
use App\Http\Controllers\Auth\RedirectAuthenticatedUsersController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });
Route::get('/', function () {
    return Inertia::render('main', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'isLoggedIn' => auth()->check(),
        'user' => auth()->user(),
    ]);
})->name('main');

Route::get('/login', function () {
    return Inertia::render('Login', []);
})->name('login');

Route::get('/register', function () {
    return Inertia::render('Register', []);
})->name('register');

Route::get('/merch', function () {
    return Inertia::render('merch', []);
})->name('merch');

Route::get('/gallery', function () {
    return Inertia::render('gallery', []);
})->name('gallery');

Route::get('/detailProduk', function () {
    return Inertia::render('detailProduk', []);
})->name('detailProduk');

//Pre-Event-1
Route::get('/after', function () {
    return Inertia::render('Preevent1After', []);
})->name('preevent1After');

Route::post('/preevent1', [PreeventAnswerController::class, 'store']);
Route::get('pre-event-1/{questionNumber}', [PreeventQuestionController::class, 'showQuestion']);

//Role Authentication
Route::group(['middleware' => 'auth'], function() {
    Route::inertia('/dashboard', 'Dashboard')->name('dashboard');

    Route::get("/redirectAuthenticatedUsers", [RedirectAuthenticatedUsersController::class, "home"]);

    Route::group(['middleware' => 'role:admin'], function() {
        Route::inertia('/admin', 'AdminDashboard')->name('adminDashboard');
    });
    Route::group(['middleware' => 'role:user'], function() {
        Route::inertia('/home', 'main');
    });
});

//Profile
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

//Partnership email
Route::get('/partnership', [PartnershipController::class, 'showForm'])->name('partnership.form');
Route::post('/send-partnership-email', [PartnershipController::class, 'sendEmail']);

//Quiz Merch
Route::get('/quiz-merch', function () {
    return Inertia::render('quizMerch');
});
Route::post('/quiz-merch/after', [MerchQuizController::class, 'submitQuiz']);

require __DIR__.'/auth.php';