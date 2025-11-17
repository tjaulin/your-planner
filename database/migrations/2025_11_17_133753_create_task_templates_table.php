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
        Schema::create('task_templates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('name'); // Nom du template
            $table->string('title');
            $table->text('description')->nullable();
            $table->enum('category', ['Travail', 'Loisir', 'Santé', 'Autre'])->default('Autre');
            $table->enum('priority', ['Faible', 'Moyenne', 'Haute'])->default('Moyenne');
            $table->string('color')->default('#C8A2C8');
            $table->time('start_time')->nullable();
            $table->time('end_time')->nullable();
            $table->boolean('all_day')->default(false);
            $table->enum('recurrence', ['Aucune', 'Quotidienne', 'Hebdomadaire', 'Mensuelle'])->default('Aucune');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('task_templates');
    }
};
