<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = auth()->user()->tasks()
            ->orderBy('is_completed')
            ->orderBy('due_date', 'asc')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Dashboard', [
            'tasks' => $tasks,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'required|in:Travail,Loisir,Santé,Autre',
            'priority' => 'required|in:Faible,Moyenne,Haute',
            'color' => 'nullable|string',
            'start_date' => 'nullable|date',
            'due_date' => 'nullable|date',
            'recurrence' => 'required|in:Aucune,Quotidienne,Hebdomadaire,Mensuelle',
        ]);

        auth()->user()->tasks()->create($validated);

        return redirect()->back()->with('success', 'Tâche créée avec succès ! 💜');
    }

    /**
     * Toggle task completion status.
     */
    public function toggle(Task $task)
    {
        $this->authorize('update', $task);

        if ($task->is_completed) {
            $task->markAsIncomplete();
        } else {
            $task->markAsCompleted();
        }

        return redirect()->back();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task)
    {
        $this->authorize('update', $task);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'required|in:Travail,Loisir,Santé,Autre',
            'priority' => 'required|in:Faible,Moyenne,Haute',
            'color' => 'nullable|string',
            'start_date' => 'nullable|date',
            'due_date' => 'nullable|date',
            'recurrence' => 'required|in:Aucune,Quotidienne,Hebdomadaire,Mensuelle',
        ]);

        $task->update($validated);

        return redirect()->back()->with('success', 'Tâche mise à jour ! ✨');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $this->authorize('delete', $task);

        $task->delete();

        return redirect()->back()->with('success', 'Tâche supprimée.');
    }
}
