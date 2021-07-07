<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Uuid;

class Notification extends Model
{
    use HasFactory, Uuid;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'recipient',
        'message'
    ];

    /**
     * Set the primary key to 'notification_id' instead of default'id'
     * @var String
     */
    protected $primaryKey = 'notification_id';

    /**
     * Deactivates primary key auto increment
     * @var boolean
     */
    public $incrementing = false;

}
