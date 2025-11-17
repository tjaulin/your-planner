import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

export default function AddTaskModal({ show, onClose }) {
    // Obtenir la date et l'heure actuelle
    const now = new Date();
    const todayDate = now.toISOString().split('T')[0];
    const currentTime = now.toTimeString().slice(0, 5);

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        category: 'Autre',
        priority: 'Moyenne',
        color: '#C8A2C8',
        start_date: todayDate,
        start_time: currentTime,
        due_date: todayDate,
        end_time: currentTime,
        all_day: false,
        recurrence: 'Aucune',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Si "Toute la journée" est coché, ne pas envoyer les heures
        const dataToSubmit = { ...data };
        if (data.all_day) {
            dataToSubmit.start_time = null;
            dataToSubmit.end_time = null;
        }

        post('/tasks', {
            data: dataToSubmit,
            preserveScroll: true,
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    return (
        <Modal show={show} onClose={onClose} maxWidth="2xl">
            <form onSubmit={handleSubmit} className="p-4 sm:p-6">
                <h2 className="mb-4 text-xl font-semibold sm:mb-6 sm:text-2xl text-mauve-700">
                    ✨ Ajouter une nouvelle tâche
                </h2>

                <div className="space-y-3 sm:space-y-4">
                    <div>
                        <InputLabel htmlFor="title" value="Titre" />
                        <TextInput
                            id="title"
                            type="text"
                            className="mt-1 input-pastel"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            required
                            placeholder="Que souhaites-tu accomplir ?"
                        />
                        {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
                    </div>

                    <div>
                        <InputLabel htmlFor="description" value="Description (optionnelle)" />
                        <textarea
                            id="description"
                            className="input-pastel mt-1 min-h-[100px]"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            placeholder="Ajoute des détails si tu le souhaites..."
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                        <div>
                            <InputLabel htmlFor="category" value="Catégorie" />
                            <select
                                id="category"
                                className="mt-1 input-pastel"
                                value={data.category}
                                onChange={(e) => setData('category', e.target.value)}
                            >
                                <option value="Travail">💼 Travail</option>
                                <option value="Loisir">🎨 Loisir</option>
                                <option value="Santé">💚 Santé</option>
                                <option value="Autre">✨ Autre</option>
                            </select>
                        </div>

                        <div>
                            <InputLabel htmlFor="priority" value="Priorité" />
                            <select
                                id="priority"
                                className="mt-1 input-pastel"
                                value={data.priority}
                                onChange={(e) => setData('priority', e.target.value)}
                            >
                                <option value="Faible">⭐ Faible</option>
                                <option value="Moyenne">⭐⭐ Moyenne</option>
                                <option value="Haute">⭐⭐⭐ Haute</option>
                            </select>
                        </div>
                    </div>

                    {/* Toggle Toute la journée */}
                    <div className="flex items-center gap-2">
                        <input
                            id="all_day"
                            type="checkbox"
                            className="checkbox-pastel"
                            checked={data.all_day}
                            onChange={(e) => setData('all_day', e.target.checked)}
                        />
                        <InputLabel htmlFor="all_day" value="Toute la journée" className="!mb-0 cursor-pointer" />
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                        <div>
                            <InputLabel htmlFor="start_date" value="Date de début" />
                            <TextInput
                                id="start_date"
                                type="date"
                                className="mt-1 input-pastel"
                                value={data.start_date}
                                onChange={(e) => setData('start_date', e.target.value)}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="due_date" value="Date de fin" />
                            <TextInput
                                id="due_date"
                                type="date"
                                className="mt-1 input-pastel"
                                value={data.due_date}
                                onChange={(e) => setData('due_date', e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Champs heures - cachés si "Toute la journée" est coché */}
                    {!data.all_day && (
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                            <div>
                                <InputLabel htmlFor="start_time" value="Heure de début" />
                                <TextInput
                                    id="start_time"
                                    type="time"
                                    className="mt-1 input-pastel"
                                    value={data.start_time}
                                    onChange={(e) => setData('start_time', e.target.value)}
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="end_time" value="Heure de fin" />
                                <TextInput
                                    id="end_time"
                                    type="time"
                                    className="mt-1 input-pastel"
                                    value={data.end_time}
                                    onChange={(e) => setData('end_time', e.target.value)}
                                />
                            </div>
                        </div>
                    )}

                    <div>
                        <InputLabel htmlFor="recurrence" value="Récurrence" />
                        <select
                            id="recurrence"
                            className="mt-1 input-pastel"
                            value={data.recurrence}
                            onChange={(e) => setData('recurrence', e.target.value)}
                        >
                            <option value="Aucune">Aucune</option>
                            <option value="Quotidienne">Quotidienne</option>
                            <option value="Hebdomadaire">Hebdomadaire</option>
                            <option value="Mensuelle">Mensuelle</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-col justify-end gap-2 mt-4 sm:flex-row sm:mt-6 sm:gap-0 sm:space-x-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="order-2 w-full btn-ghost sm:w-auto sm:order-1"
                        disabled={processing}
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        className="order-1 w-full btn-primary sm:w-auto sm:order-2"
                        disabled={processing}
                    >
                        {processing ? 'Création...' : 'Créer la tâche 💜'}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
