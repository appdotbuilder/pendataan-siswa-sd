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
        Schema::create('classes', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Class name (e.g., 1A, 1B)');
            $table->string('grade_level', 2)->comment('Grade level (1-6)');
            $table->string('section', 1)->comment('Section (A, B, C, etc.)');
            $table->timestamps();

            // Indexes for performance
            $table->index('name');
            $table->index('grade_level');
            $table->unique(['grade_level', 'section']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('classes');
    }
};