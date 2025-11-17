import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';

const wellnessActivities = [
    { emoji: '🧩', name: 'Puzzle', description: 'Détends-toi avec un puzzle' },
    { emoji: '🎨', name: 'Dessin', description: 'Exprime-toi artistiquement' },
    { emoji: '✍️', name: 'Écriture', description: 'Écris tes pensées' },
    { emoji: '📖', name: 'Lecture', description: 'Plonge dans un livre' },
    { emoji: '🧘‍♀️', name: 'Méditation', description: 'Prends un moment de calme' },
    { emoji: '🎵', name: 'Musique', description: 'Écoute ta musique préférée' },
    { emoji: '🌿', name: 'Promenade', description: 'Prends l\'air' },
    { emoji: '☕', name: 'Pause thé', description: 'Savoure une boisson chaude' },
];

export default function Wellbeing({ auth, notes = [], stats = { weeklyActivities: 3 } }) {
    const [selectedMood, setSelectedMood] = useState('');
    const { data, setData, post, processing, reset } = useForm({
        title: '',
        content: '',
        mood: '',
        note_date: new Date().toISOString().split('T')[0],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/notes', {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-semibold text-mauve-700">
                    Espace Bien-être 🌸
                </h2>
            }
        >
            <Head title="Bien-être" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Statistiques douces */}
                    <div className="card mb-8 text-center gradient-pastel">
                        <p className="text-5xl mb-4">💕</p>
                        <p className="text-2xl font-semibold text-mauve-700">
                            Tu as pris soin de toi {stats.weeklyActivities} fois cette semaine
                        </p>
                        <p className="text-gray-600 mt-2">
                            Continue comme ça, tu es incroyable !
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Activités bien-être */}
                        <div>
                            <h3 className="text-xl font-semibold text-mauve-700 mb-4">
                                Activités bien-être
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                {wellnessActivities.map((activity, index) => (
                                    <div
                                        key={index}
                                        className="card-hover text-center p-6"
                                    >
                                        <p className="text-4xl mb-2">{activity.emoji}</p>
                                        <p className="font-semibold text-mauve-700">{activity.name}</p>
                                        <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Journal personnel */}
                        <div>
                            <h3 className="text-xl font-semibold text-mauve-700 mb-4">
                                Journal personnel
                            </h3>
                            <div className="card">
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <InputLabel htmlFor="mood" value="Comment te sens-tu aujourd'hui ?" />
                                        <div className="flex space-x-2 mt-2">
                                            {['😊', '😌', '😴', '😰', '😐'].map((emoji, index) => {
                                                const moods = ['Joyeux', 'Calme', 'Fatigué', 'Stressé', 'Autre'];
                                                return (
                                                    <button
                                                        key={index}
                                                        type="button"
                                                        onClick={() => {
                                                            setSelectedMood(moods[index]);
                                                            setData('mood', moods[index]);
                                                        }}
                                                        className={`text-3xl p-3 rounded-xl transition-all ${selectedMood === moods[index]
                                                                ? 'bg-mauve-200 scale-110'
                                                                : 'bg-lavande-100 hover:bg-lavande-200'
                                                            }`}
                                                    >
                                                        {emoji}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="title" value="Titre (optionnel)" />
                                        <input
                                            id="title"
                                            type="text"
                                            className="input-pastel mt-1"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            placeholder="Un titre pour ta note..."
                                        />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="content" value="Tes pensées" />
                                        <textarea
                                            id="content"
                                            className="input-pastel mt-1 min-h-[150px]"
                                            value={data.content}
                                            onChange={(e) => setData('content', e.target.value)}
                                            placeholder="Écris ce que tu ressens, sans jugement..."
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn-primary w-full"
                                        disabled={processing}
                                    >
                                        {processing ? 'Enregistrement...' : '💜 Enregistrer'}
                                    </button>
                                </form>
                            </div>

                            {/* Notes récentes */}
                            {notes.length > 0 && (
                                <div className="mt-6">
                                    <h4 className="text-lg font-semibold text-mauve-700 mb-3">
                                        Notes récentes
                                    </h4>
                                    <div className="space-y-3">
                                        {notes.slice(0, 3).map(note => (
                                            <div key={note.id} className="card">
                                                <div className="flex items-start justify-between mb-2">
                                                    {note.title && (
                                                        <h5 className="font-semibold text-gray-800">{note.title}</h5>
                                                    )}
                                                    <span className="text-sm text-gray-500">
                                                        {new Date(note.note_date).toLocaleDateString('fr-FR')}
                                                    </span>
                                                </div>
                                                <p className="text-gray-600 text-sm">
                                                    {note.content.substring(0, 100)}
                                                    {note.content.length > 100 ? '...' : ''}
                                                </p>
                                                {note.mood && (
                                                    <span className="inline-block mt-2 text-xs bg-lavande-100 text-lavande-600 px-2 py-1 rounded-full">
                                                        {note.mood}
                                                    </span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
