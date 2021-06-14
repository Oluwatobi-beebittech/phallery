<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Heart extends Model
{
    use HasFactory;

    /**
     * Set the primary key to 'post_id' instead of default'id'
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
        return $this.belongsTo(Post::class,'post_id');
    }
}
