<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $notes = auth()->user()->notes()
            ->orderBy('note_date', 'desc')
            ->get();

        $weeklyActivities = auth()->user()->notes()
            ->where('note_date', '>=', now()->subDays(7))
            ->count();

        return Inertia::render('Wellbeing', [
            'notes' => $notes,
            'stats' => [
                'weeklyActivities' => $weeklyActivities,
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'content' => 'required|string',
            'mood' => 'nullable|in:Joyeux,Calme,Fatigué,Stressé,Autre',
            'note_date' => 'required|date',
        ]);

        auth()->user()->notes()->create($validated);

        return redirect()->back()->with('success', 'Note enregistrée avec amour 💜');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Note $note)
    {
        $this->authorize('delete', $note);

        $note->delete();

        return redirect()->back()->with('success', 'Note supprimée.');
    }
}
