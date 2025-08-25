<?php

namespace Database\Factories;

use App\Models\Teacher;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Teacher>
 */
class TeacherFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Teacher>
     */
    protected $model = Teacher::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $subjects = [
            'Bahasa Indonesia',
            'Matematika',
            'IPA',
            'IPS',
            'Pendidikan Agama',
            'Pendidikan Jasmani',
            'Seni Budaya',
            'Bahasa Inggris',
            'Pendidikan Kewarganegaraan',
        ];

        return [
            'user_id' => User::factory(),
            'name' => $this->faker->name(),
            'nip' => $this->faker->unique()->numerify('##########'),
            'subject' => $this->faker->randomElement($subjects),
            'homeroom_class_id' => null,
        ];
    }
}