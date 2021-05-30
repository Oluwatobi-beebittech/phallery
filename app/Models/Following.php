<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Uuid;

class Following extends Model
{
    use HasFactory, Uuid;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'follower',
        'follows'
    ];

    /**
     * Set the primary key to following_id
     * @var String
     */
    protected $primaryKey = 'following_id';

    /**
     * Deactivates primary key auto increment
     * @var boolean
     */
    public $incrementing = false;

    /**
     * Gets the user's followers'
     * @return App\Model\User
     */
    public function followers(){
        return $this->belongsTo(User::class,'follower');
    }

    /**
     * Gets the people that user follows
     * @return App\Model\User
     */
    public function follows(){
        return $this->belongsTo(User::class,'follows');
    }
}
