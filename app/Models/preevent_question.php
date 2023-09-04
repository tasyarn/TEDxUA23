<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class preevent_question extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function preevent_answers()
    {
        return $this->hasMany(preevent_answer::class);
    }

    public static function addQuestions(array $questions)
    {
        foreach ($questions as $question) {
            self::create(['questions' => $question]);
        }
    }
}