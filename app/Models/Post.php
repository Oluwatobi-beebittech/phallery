<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

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

    /**
     * Get user that owns the post
     * @return App\User
     */
    public function user(){
        return $this->belongsTo(User::class, 'user_email');
    }

}
