<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('nis')->unique()->comment('Student ID number');
            $table->string('nisn')->unique()->comment('National student ID number');
            $table->string('name')->comment('Full name');
            $table->enum('gender', ['male', 'female'])->comment('Gender');
            $table->string('birth_place')->comment('Place of birth');
            $table->date('birth_date')->comment('Date of birth');
            $table->text('address')->comment('Home address');
            $table->string('parent_name')->comment('Parent/guardian name');
            $table->foreignId('class_id')->constrained('classes')->onDelete('cascade');
            $table->enum('status', ['active', 'transferred_in', 'transferred_out'])->default('active');
            $table->timestamps();

            // Indexes for performance
            $table->index('name');
            $table->index('nis');
            $table->index('nisn');
            $table->index('gender');
            $table->index('status');
            $table->index(['class_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};