<?php

namespace App\Http\Controllers;

use App\Models\TaskTemplate;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;

class TaskTemplateController extends Controller
{
    use AuthorizesRequests;

    /**
     * Store a newly created template.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'required|in:Travail,Loisir,Santé,Autre',
            'priority' => 'required|in:Faible,Moyenne,Haute',
            'color' => 'nullable|string',
            'start_time' => 'nullable|date_format:H:i',
            'end_time' => 'nullable|date_format:H:i',
            'all_day' => 'boolean',
            'recurrence' => 'required|in:Aucune,Quotidienne,Hebdomadaire,Mensuelle',
        ]);

        auth()->user()->taskTemplates()->create($validated);

        return redirect()->back()->with('success', 'Template sauvegardé ! 💾');
    }

    /**
     * Remove the specified template.
     */
    public function destroy(TaskTemplate $taskTemplate)
    {
        if ($taskTemplate->user_id !== auth()->id()) {
            abort(403);
        }

        $taskTemplate->delete();

        return redirect()->back()->with('success', 'Template supprimé.');
    }
}
