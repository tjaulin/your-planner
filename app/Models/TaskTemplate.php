<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TaskTemplate extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'title',
        'description',
        'category',
        'priority',
        'color',
        'start_time',
        'end_time',
        'all_day',
        'recurrence',
    ];

    protected $casts = [
        'all_day' => 'boolean',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
