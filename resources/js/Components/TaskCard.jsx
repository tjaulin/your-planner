import { router } from '@inertiajs/react';

const categoryColors = {
    'Travail': 'badge-work',
    'Loisir': 'badge-wellness',
    'Santé': 'badge-health',
    'Autre': 'badge-other',
};

const categoryEmojis = {
    'Travail': '💼',
    'Loisir': '🎨',
    'Santé': '💚',
    'Autre': '✨',
};

const priorityEmojis = {
    'Haute': '⭐⭐⭐',
    'Moyenne': '⭐⭐',
    'Faible': '⭐',
};

export default function TaskCard({ task, onToggle, onEdit, onDelete }) {
    const handleToggle = () => {
        router.post(`/tasks/${task.id}/toggle`, {}, {
            preserveScroll: true,
            onSuccess: () => {
                if (onToggle) onToggle();
            },
        });
    };

    const handleEdit = () => {
        if (onEdit) onEdit(task);
    };

    const handleDelete = () => {
        if (confirm('Es-tu sûre de vouloir supprimer cette tâche ? 🌸')) {
            router.delete(`/tasks/${task.id}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <div className="card-hover">
            <div className="flex items-start space-x-4">
                <input
                    type="checkbox"
                    checked={task.is_completed}
                    onChange={handleToggle}
                    className="mt-1 checkbox-pastel"
                />

                <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className={`font-semibold text-lg ${task.is_completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                            {task.title}
                        </h3>
                        <span className={`badge ${categoryColors[task.category]}`}>
                            {categoryEmojis[task.category]} {task.category}
                        </span>
                    </div>

                    {task.description && (
                        <p className={`text-sm mb-3 ${task.is_completed ? 'text-gray-400' : 'text-gray-600'}`}>
                            {task.description}
                        </p>
                    )}

                    <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-3">
                            {task.due_date && (
                                <span className="text-mauve-600">
                                    📅 {new Date(task.due_date).toLocaleDateString('fr-FR')}
                                </span>
                            )}
                            {task.priority && (
                                <span className="text-mauve-600" title={`Priorité: ${task.priority}`}>
                                    {priorityEmojis[task.priority]}
                                </span>
                            )}
                        </div>

                        {task.is_completed && task.completed_at && (
                            <span className="font-medium text-green-600">
                                ✓ Complétée
                            </span>
                        )}
                    </div>

                    {/* Boutons d'édition et suppression */}
                    <div className="flex items-center justify-end gap-2 pt-3 mt-3 border-t border-gray-100">
                        <button
                            onClick={handleEdit}
                            className="text-xs font-medium transition-colors text-mauve-600 hover:text-mauve-700"
                        >
                            ✏️ Modifier
                        </button>
                        <button
                            onClick={handleDelete}
                            className="text-xs font-medium text-red-500 transition-colors hover:text-red-700"
                        >
                            🗑️ Supprimer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
