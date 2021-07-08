<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Uuid;

class Heart extends Model
{
    use HasFactory, Uuid;

    /**
     * Set the primary key to 'heart_id' instead of default'id'
     * @var String
     */
    protected $primaryKey='heart_id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['post_id', 'user_email'];

    /**
     * Deactivates primary key auto increment
     * @var boolean
     */
    public $incrementing = false;

    public function post(){
        return $this->belongsTo(Post::class,'post_id');
    }

    public function user(){
        return $this->belongsTo(User::class,'user_email');
    }
}
