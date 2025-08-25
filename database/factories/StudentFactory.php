<?php

namespace Database\Factories;

use App\Models\SchoolClass;
use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Student>
     */
    protected $model = Student::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $gender = $this->faker->randomElement(['male', 'female']);
        
        return [
            'nis' => $this->faker->unique()->numerify('##########'),
            'nisn' => $this->faker->unique()->numerify('##########'),
            'name' => $this->faker->name($gender === 'male' ? 'male' : 'female'),
            'gender' => $gender,
            'birth_place' => $this->faker->city(),
            'birth_date' => $this->faker->dateTimeBetween('-12 years', '-6 years'),
            'address' => $this->faker->address(),
            'parent_name' => $this->faker->name(),
            'class_id' => SchoolClass::factory(),
            'status' => 'active',
        ];
    }
}