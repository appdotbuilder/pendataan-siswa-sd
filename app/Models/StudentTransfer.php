<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\StudentTransfer
 *
 * @property int $id
 * @property int $student_id
 * @property string $type
 * @property \Illuminate\Support\Carbon $transfer_date
 * @property string|null $notes
 * @property string|null $from_school
 * @property string|null $to_school
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Student $student
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|StudentTransfer newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|StudentTransfer newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|StudentTransfer query()
 * @method static \Illuminate\Database\Eloquent\Builder|StudentTransfer whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentTransfer whereStudentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentTransfer whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentTransfer whereTransferDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentTransfer whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentTransfer whereFromSchool($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentTransfer whereToSchool($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentTransfer whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentTransfer whereUpdatedAt($value)
 * @method static \Database\Factories\StudentTransferFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class StudentTransfer extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'student_id',
        'type',
        'transfer_date',
        'notes',
        'from_school',
        'to_school',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'transfer_date' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the student that this transfer belongs to.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }
}