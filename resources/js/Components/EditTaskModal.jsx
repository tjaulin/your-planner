import { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

export default function EditTaskModal({ task, show, onClose }) {
    const { data, setData, patch, processing, errors, reset } = useForm({
        title: task?.title || '',
        description: task?.description || '',
        category: task?.category || 'Autre',
        priority: task?.priority || 'Moyenne',
        color: task?.color || '#C8A2C8',
        start_date: task?.start_date || '',
        due_date: task?.due_date || '',
        recurrence: task?.recurrence || 'Aucune',
    });

    useEffect(() => {
        if (task) {
            setData({
                title: task.title || '',
                description: task.description || '',
                category: task.category || 'Autre',
                priority: task.priority || 'Moyenne',
                color: task.color || '#C8A2C8',
                start_date: task.start_date || '',
                due_date: task.due_date || '',
                recurrence: task.recurrence || 'Aucune',
            });
        }
    }, [task]);

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(`/tasks/${task.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                onClose();
            },
        });
    };

    if (!task) return null;

    return (
        <Modal show={show} onClose={onClose} maxWidth="2xl">
            <form onSubmit={handleSubmit} className="p-4 sm:p-6">
                <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl font-semibold text-mauve-700">
                    ✏️ Modifier la tâche
                </h2>

                <div className="space-y-3 sm:space-y-4">
                    <div>
                        <InputLabel htmlFor="title" value="Titre" />
                        <TextInput
                            id="title"
                            type="text"
                            className="input-pastel mt-1"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            required
                            placeholder="Que souhaites-tu accomplir ?"
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                            <InputLabel htmlFor="category" value="Catégorie" />
                            <select
                                id="category"
                                className="input-pastel mt-1"
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
                                className="input-pastel mt-1"
                                value={data.priority}
                                onChange={(e) => setData('priority', e.target.value)}
                            >
                                <option value="Faible">⭐ Faible</option>
                                <option value="Moyenne">⭐⭐ Moyenne</option>
                                <option value="Haute">⭐⭐⭐ Haute</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                            <InputLabel htmlFor="start_date" value="Date de début" />
                            <TextInput
                                id="start_date"
                                type="date"
                                className="input-pastel mt-1"
                                value={data.start_date}
                                onChange={(e) => setData('start_date', e.target.value)}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="due_date" value="Date d'échéance" />
                            <TextInput
                                id="due_date"
                                type="date"
                                className="input-pastel mt-1"
                                value={data.due_date}
                                onChange={(e) => setData('due_date', e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <InputLabel htmlFor="recurrence" value="Récurrence" />
                        <select
                            id="recurrence"
                            className="input-pastel mt-1"
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

                <div className="flex flex-col sm:flex-row justify-end mt-4 sm:mt-6 gap-2 sm:gap-0 sm:space-x-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="btn-ghost w-full sm:w-auto order-2 sm:order-1"
                        disabled={processing}
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        className="btn-primary w-full sm:w-auto order-1 sm:order-2"
                        disabled={processing}
                    >
                        {processing ? 'Mise à jour...' : 'Mettre à jour 💜'}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
