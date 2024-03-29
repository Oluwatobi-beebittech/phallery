<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Uuid;

class Post extends Model
{
    use HasFactory, Uuid;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_email',
        'post_text',
        'post_image'
    ];

    /**
     * Set the primary key to 'post_id' instead of default'id'
     * @var String
     */
    protected $primaryKey = 'post_id';

    /**
     * Deactivates primary key auto increment
     * @var boolean
     */
    public $incrementing = false;

    protected $attributes=['likes'=>0, 
                            'hearts'=>0, 
                            'comments'=>0
                        ];

    /**
     * The assessors to append to the model's array form
     * @var array
     */
    protected $appends=['poster_first_name', 'poster_last_name', 'poster_profile_image'];

    /**
     * Get user that owns the post
     * @return App\User
     */
    public function user(){
        return $this->belongsTo(User::class, 'user_email');
    }

    public function likes(){
        return $this->hasMany(Like::class, 'post_id');
    }

    public function hearts(){
        return $this->hasMany(Heart::class, 'post_id');
    }

    public function comments(){
        return $this->hasMany(Comment::class, 'post_id');
    }

    public function getPosterFirstNameAttribute(){
        return User::find($this->attributes['user_email'])->first_name;
    }

    public function getPosterLastNameAttribute(){
        return User::find($this->attributes['user_email'])->last_name;
    }

    public function getPosterProfileImageAttribute(){
        return User::find($this->attributes['user_email'])->profile_image;
    }
}
