import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

export default function AddTaskModal({ show, onClose }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        category: 'Autre',
        priority: 'Moyenne',
        color: '#C8A2C8',
        start_date: '',
        due_date: '',
        recurrence: 'Aucune',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/tasks', {
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
                            <InputLabel htmlFor="due_date" value="Date d'échéance" />
                            <TextInput
                                id="due_date"
                                type="date"
                                className="mt-1 input-pastel"
                                value={data.due_date}
                                onChange={(e) => setData('due_date', e.target.value)}
                            />
                        </div>
                    </div>

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
