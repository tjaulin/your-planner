import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DailyQuote from '@/Components/DailyQuote';
import TaskCard from '@/Components/TaskCard';
import AddTaskModal from '@/Components/AddTaskModal';
import EditTaskModal from '@/Components/EditTaskModal';
import CalendarView from '@/Components/CalendarView';

export default function Dashboard({ auth, tasks = [] }) {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [viewMode, setViewMode] = useState('list'); // 'list' ou 'calendar'

    const handleEditTask = (task) => {
        setTaskToEdit(task);
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setTaskToEdit(null);
    };

    const todayTasks = tasks.filter(task => !task.is_completed);
    const completedTasks = tasks.filter(task => task.is_completed);

    const tasksByCategory = {
        'Travail': todayTasks.filter(t => t.category === 'Travail'),
        'Loisir': todayTasks.filter(t => t.category === 'Loisir'),
        'Santé': todayTasks.filter(t => t.category === 'Santé'),
        'Autre': todayTasks.filter(t => t.category === 'Autre'),
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold text-mauve-700">
                        Bonjour {auth.user.name} 🌸
                    </h2>
                    <div className="flex items-center space-x-3">
                        {/* Toggle vue liste/calendrier */}
                        <div className="inline-flex rounded-lg border border-mauve-200 bg-white p-1">
                            <button
                                onClick={() => setViewMode('list')}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${viewMode === 'list'
                                        ? 'bg-mauve-600 text-white'
                                        : 'text-mauve-600 hover:bg-mauve-50'
                                    }`}
                            >
                                📋 Liste
                            </button>
                            <button
                                onClick={() => setViewMode('calendar')}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${viewMode === 'calendar'
                                        ? 'bg-mauve-600 text-white'
                                        : 'text-mauve-600 hover:bg-mauve-50'
                                    }`}
                            >
                                📅 Calendrier
                            </button>
                        </div>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="btn-primary"
                        >
                            ✨ Nouvelle tâche
                        </button>
                    </div>
                </div>
            }
        >
            <Head title="Mon Planner" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Citation du jour */}
                    <div className="mb-8">
                        <DailyQuote />
                    </div>

                    {/* Vue Calendrier */}
                    {viewMode === 'calendar' ? (
                        <CalendarView
                            tasks={tasks}
                            onEventClick={handleEditTask}
                        />
                    ) : (
                        <>
                            {/* Statistiques douces */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="card text-center">
                                    <p className="text-3xl mb-2">📋</p>
                                    <p className="text-2xl font-bold text-mauve-600">{todayTasks.length}</p>
                                    <p className="text-sm text-gray-600">Tâches à faire</p>
                                </div>
                                <div className="card text-center">
                                    <p className="text-3xl mb-2">✓</p>
                                    <p className="text-2xl font-bold text-green-600">{completedTasks.length}</p>
                                    <p className="text-sm text-gray-600">Tâches complétées</p>
                                </div>
                                <div className="card text-center">
                                    <p className="text-3xl mb-2">💜</p>
                                    <p className="text-2xl font-bold text-rosepoudre-500">
                                        {tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0}%
                                    </p>
                                    <p className="text-sm text-gray-600">Tu gères !</p>
                                </div>
                            </div>

                            {/* Tâches du jour par catégorie */}
                            <div className="space-y-8">
                                {Object.entries(tasksByCategory).map(([category, categoryTasks]) => {
                                    if (categoryTasks.length === 0) return null;

                                    return (
                                        <div key={category}>
                                            <h3 className="text-xl font-semibold text-mauve-700 mb-4">
                                                {category === 'Travail' && '💼'}
                                                {category === 'Loisir' && '🎨'}
                                                {category === 'Santé' && '💚'}
                                                {category === 'Autre' && '✨'}
                                                {' '}{category}
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {categoryTasks.map(task => (
                                                    <TaskCard key={task.id} task={task} onEdit={handleEditTask} />
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}

                                {todayTasks.length === 0 && (
                                    <div className="card text-center py-12">
                                        <p className="text-4xl mb-4">🎉</p>
                                        <p className="text-xl font-semibold text-mauve-700 mb-2">
                                            Bravo ! Tu as terminé toutes tes tâches
                                        </p>
                                        <p className="text-gray-600">
                                            Prends du temps pour toi maintenant 💜
                                        </p>
                                    </div>
                                )}

                                {/* Tâches complétées */}
                                {completedTasks.length > 0 && (
                                    <div className="mt-8">
                                        <h3 className="text-xl font-semibold text-green-600 mb-4">
                                            ✓ Tâches complétées aujourd'hui
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {completedTasks.map(task => (
                                                <TaskCard key={task.id} task={task} onEdit={handleEditTask} />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>

            <AddTaskModal show={showAddModal} onClose={() => setShowAddModal(false)} />
            <EditTaskModal task={taskToEdit} show={showEditModal} onClose={handleCloseEditModal} />
        </AuthenticatedLayout>
    );
}

