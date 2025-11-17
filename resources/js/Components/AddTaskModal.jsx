import { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

export default function AddTaskModal({ show, onClose, taskTemplates = [] }) {
    const [showTemplateForm, setShowTemplateForm] = useState(false);
    const [templateName, setTemplateName] = useState('');

    // Obtenir la date et l'heure actuelle
    const now = new Date();
    const todayDate = now.toISOString().split('T')[0];
    const currentTime = now.toTimeString().slice(0, 5);

    // Calculer l'heure de fin (1h plus tard)
    const endTimeDate = new Date(now.getTime() + 60 * 60 * 1000); // Ajouter 1 heure en millisecondes
    const endTime = endTimeDate.toTimeString().slice(0, 5);

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        category: 'Autre',
        priority: 'Moyenne',
        color: '#C8A2C8',
        start_date: todayDate,
        start_time: currentTime,
        due_date: todayDate,
        end_time: endTime,
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

    const handleSaveAsTemplate = () => {
        if (!templateName.trim()) {
            alert('Merci de donner un nom au template ! 💜');
            return;
        }

        router.post('/task-templates', {
            name: templateName,
            ...data,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setTemplateName('');
                setShowTemplateForm(false);
            },
        });
    };

    const handleLoadTemplate = (template) => {
        setData({
            ...data,
            title: template.title,
            description: template.description || '',
            category: template.category,
            priority: template.priority,
            color: template.color,
            start_time: template.start_time || currentTime,
            end_time: template.end_time || endTime,
            all_day: template.all_day,
            recurrence: template.recurrence,
        });
    };

    const handleDeleteTemplate = (templateId) => {
        if (confirm('Supprimer ce template ? 🗑️')) {
            router.delete(`/task-templates/${templateId}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <Modal show={show} onClose={onClose} maxWidth="7xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Formulaire de création - 2/3 */}
                <div className="lg:col-span-2">
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

                        <div className="flex flex-col justify-between gap-2 mt-4 sm:flex-row sm:mt-6 sm:gap-0 sm:space-x-3">
                            <button
                                type="button"
                                onClick={() => setShowTemplateForm(!showTemplateForm)}
                                className="order-3 w-full text-xs btn-ghost sm:w-auto sm:order-1"
                            >
                                {showTemplateForm ? '❌ Annuler' : '💾 Sauvegarder comme template'}
                            </button>
                            <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="order-2 w-full btn-ghost sm:w-auto"
                                    disabled={processing}
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className="order-1 w-full btn-primary sm:w-auto"
                                    disabled={processing}
                                >
                                    {processing ? 'Création...' : 'Créer la tâche 💜'}
                                </button>
                            </div>
                        </div>

                        {showTemplateForm && (
                            <div className="mt-4 p-4 bg-lavender-50 rounded-lg border border-mauve-200">
                                <InputLabel htmlFor="template_name" value="Nom du template" />
                                <div className="flex gap-2 mt-2">
                                    <TextInput
                                        id="template_name"
                                        type="text"
                                        className="flex-1 input-pastel"
                                        value={templateName}
                                        onChange={(e) => setTemplateName(e.target.value)}
                                        placeholder="Ex: Réunion hebdomadaire"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleSaveAsTemplate}
                                        className="px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg bg-mauve-600 hover:bg-mauve-700"
                                    >
                                        💾 Sauvegarder
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>
                </div>

                {/* Templates sauvegardés - 1/3 */}
                {taskTemplates.length > 0 && (
                    <div className="lg:col-span-1 border-l border-gray-200 p-4 sm:p-6 bg-lavender-50">
                        <h3 className="mb-4 text-lg font-semibold text-mauve-700">
                            📋 Mes templates
                        </h3>
                        <div className="space-y-3 max-h-[600px] overflow-y-auto">
                            {taskTemplates.map((template) => (
                                <div
                                    key={template.id}
                                    className="p-3 bg-white rounded-lg border border-mauve-200 hover:border-mauve-400 transition-colors cursor-pointer"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <h4 className="font-semibold text-sm text-gray-800">{template.name}</h4>
                                        <button
                                            onClick={() => handleDeleteTemplate(template.id)}
                                            className="text-red-500 hover:text-red-700 text-xs"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                    <p className="text-xs text-gray-600 mb-2">{template.title}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-mauve-600">
                                            {template.category}
                                        </span>
                                        <button
                                            onClick={() => handleLoadTemplate(template)}
                                            className="text-xs font-medium text-mauve-600 hover:text-mauve-700"
                                        >
                                            ✨ Utiliser
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    );
}
