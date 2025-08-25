<?php

namespace Database\Seeders;

use App\Models\SchoolClass;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class SchoolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::create([
            'name' => 'Admin Sekolah',
            'email' => 'admin@sekolah.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);

        // Create classes for grades 1-6, sections A and B
        $classes = [];
        for ($grade = 1; $grade <= 6; $grade++) {
            foreach (['A', 'B'] as $section) {
                $class = SchoolClass::create([
                    'name' => $grade . $section,
                    'grade_level' => (string) $grade,
                    'section' => $section,
                ]);
                $classes[] = $class;
            }
        }

        // Create teacher users and teacher profiles
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

        $teachers = [];
        foreach ($classes as $index => $class) {
            // Create homeroom teacher for each class
            $teacherUser = User::create([
                'name' => 'Guru ' . $class->name,
                'email' => 'guru' . strtolower($class->name) . '@sekolah.com',
                'password' => Hash::make('password'),
                'role' => 'teacher',
                'email_verified_at' => now(),
            ]);

            $teacher = Teacher::create([
                'user_id' => $teacherUser->id,
                'name' => $teacherUser->name,
                'nip' => '1234567' . str_pad((string)($index + 1), 3, '0', STR_PAD_LEFT),
                'subject' => $subjects[array_rand($subjects)],
                'homeroom_class_id' => $class->id,
            ]);

            $teachers[] = $teacher;
        }

        // Create additional subject teachers
        for ($i = 0; $i < 5; $i++) {
            $teacherUser = User::create([
                'name' => 'Guru ' . fake()->name(),
                'email' => 'guru' . ($i + 20) . '@sekolah.com',
                'password' => Hash::make('password'),
                'role' => 'teacher',
                'email_verified_at' => now(),
            ]);

            Teacher::create([
                'user_id' => $teacherUser->id,
                'name' => $teacherUser->name,
                'nip' => '1234567' . str_pad((string)(20 + $i), 3, '0', STR_PAD_LEFT),
                'subject' => $subjects[array_rand($subjects)],
                'homeroom_class_id' => null,
            ]);
        }

        // Create students for each class
        foreach ($classes as $class) {
            $studentCount = random_int(15, 25); // Each class has 15-25 students
            
            for ($i = 0; $i < $studentCount; $i++) {
                $gender = fake()->randomElement(['male', 'female']);
                Student::create([
                    'nis' => '2024' . str_pad((string)$class->id, 2, '0', STR_PAD_LEFT) . str_pad((string)($i + 1), 3, '0', STR_PAD_LEFT),
                    'nisn' => fake()->unique()->numerify('##########'),
                    'name' => fake()->name($gender === 'male' ? 'male' : 'female'),
                    'gender' => $gender,
                    'birth_place' => fake()->city(),
                    'birth_date' => fake()->dateTimeBetween('-12 years', '-6 years'),
                    'address' => fake()->address(),
                    'parent_name' => fake()->name(),
                    'class_id' => $class->id,
                    'status' => 'active',
                ]);
            }
        }
    }
}