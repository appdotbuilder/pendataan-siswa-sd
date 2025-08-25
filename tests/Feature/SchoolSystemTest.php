<?php

namespace Tests\Feature;

use App\Models\SchoolClass;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SchoolSystemTest extends TestCase
{
    use RefreshDatabase;

    public function test_welcome_page_displays_correctly(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
        // Since this is an Inertia app, the content is rendered client-side
        // Just verify the page loads correctly
        $response->assertInertia(fn ($page) => $page
            ->component('welcome')
        );
    }

    public function test_admin_can_access_dashboard(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);

        $response = $this->actingAs($admin)->get('/dashboard');

        $response->assertStatus(200);
    }

    public function test_teacher_can_access_dashboard(): void
    {
        $teacher = User::factory()->create(['role' => 'teacher']);

        $response = $this->actingAs($teacher)->get('/dashboard');

        $response->assertStatus(200);
    }

    public function test_can_view_students_list(): void
    {
        $user = User::factory()->create(['role' => 'teacher']);
        $class = SchoolClass::factory()->create();
        Student::factory()->create(['class_id' => $class->id]);

        $response = $this->actingAs($user)->get('/students');

        $response->assertStatus(200);
    }

    public function test_admin_can_access_teachers_list(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);

        $response = $this->actingAs($admin)->get('/teachers');

        $response->assertStatus(200);
    }

    public function test_teacher_cannot_access_teachers_list(): void
    {
        $teacher = User::factory()->create(['role' => 'teacher']);

        $response = $this->actingAs($teacher)->get('/teachers');

        $response->assertStatus(403);
    }
}