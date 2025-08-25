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
        Schema::create('student_transfers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained('students')->onDelete('cascade');
            $table->enum('type', ['in', 'out'])->comment('Transfer type: in or out');
            $table->date('transfer_date')->comment('Date of transfer');
            $table->text('notes')->nullable()->comment('Transfer notes/reason');
            $table->string('from_school')->nullable()->comment('Previous school (for transfer in)');
            $table->string('to_school')->nullable()->comment('Destination school (for transfer out)');
            $table->timestamps();

            // Indexes for performance
            $table->index('transfer_date');
            $table->index('type');
            $table->index(['student_id', 'type']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_transfers');
    }
};