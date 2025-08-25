<?php

namespace Database\Factories;

use App\Models\Student;
use App\Models\StudentTransfer;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StudentTransfer>
 */
class StudentTransferFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\StudentTransfer>
     */
    protected $model = StudentTransfer::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type = $this->faker->randomElement(['in', 'out']);
        
        return [
            'student_id' => Student::factory(),
            'type' => $type,
            'transfer_date' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'notes' => $this->faker->optional()->sentence(),
            'from_school' => $type === 'in' ? $this->faker->company() . ' Elementary School' : null,
            'to_school' => $type === 'out' ? $this->faker->company() . ' Elementary School' : null,
        ];
    }
}