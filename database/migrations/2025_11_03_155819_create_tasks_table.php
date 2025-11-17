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
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->text('description')->nullable();
            $table->enum('category', ['Travail', 'Loisir', 'Santé', 'Autre'])->default('Autre');
            $table->enum('priority', ['Faible', 'Moyenne', 'Haute'])->default('Moyenne');
            $table->string('color')->default('#C8A2C8');
            $table->date('start_date')->nullable();
            $table->date('due_date')->nullable();
            $table->enum('recurrence', ['Aucune', 'Quotidienne', 'Hebdomadaire', 'Mensuelle'])->default('Aucune');
            $table->boolean('is_completed')->default(false);
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
