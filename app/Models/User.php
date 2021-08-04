<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone_number',
    ];


    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Set the primary key to email instead of default'id'
     * @var String
     */
    protected $primaryKey = 'email';

    /**
     * Deactivates primary key auto increment
     * @var boolean
     */
    public $incrementing = false;

    /**
     * Get posts created by user
     * 
     * @return \App\Post
     */
    public function posts(){
        return $this->hasMany(Post::class, 'user_email');
    }

    public function comment(){
        return $this->hasMany(Comment::class, 'user_email');
    }
    /**
     * Get people user follows
     * 
     * @return \App\Following
     */
    public function follows(){
        return $this->hasMany(Following::class, 'follower');
    }

    /**
     * Get people following user
     * 
     * @return \App\Following
     */
    public function following(){
        return $this->hasMany(Following::class, 'follows');
    }
}
