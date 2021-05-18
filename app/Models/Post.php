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
        'post_id',
        'user_email',
        'post_text',
        'post_image'
    ];

    protected $primaryKey = 'post_id';
    public $incrementing = false;

    /**
     * Get user that owns the post
     */
    public function user(){
        return $this->belongsTo(User::class, 'user_email');
    }

}
