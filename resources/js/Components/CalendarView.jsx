import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import frLocale from '@fullcalendar/core/locales/fr';

const categoryColors = {
    'Travail': '#9333EA',
    'Loisir': '#EC4899',
    'Santé': '#10B981',
    'Autre': '#C8A2C8',
};

export default function CalendarView({ tasks, onDateClick, onEventClick }) {
    const events = tasks.map(task => {
        let start, end, allDay;

        // Déterminer si c'est un événement toute la journée
        const hasTimeFields = task.start_time && task.end_time;
        const shouldShowAsAllDay = task.all_day || !hasTimeFields;

        if (shouldShowAsAllDay) {
            // Événement toute la journée
            start = task.start_date || task.due_date;
            end = task.due_date || task.start_date;
            allDay = true;
        } else {
            // Événement avec horaires spécifiques
            const startDate = task.start_date || task.due_date;
            const endDate = task.due_date || task.start_date;
            start = `${startDate}T${task.start_time}`;
            end = `${endDate}T${task.end_time}`;
            allDay = false;
        }

        return {
            id: task.id,
            title: task.title,
            start: start,
            end: end,
            allDay: allDay,
            backgroundColor: task.is_completed ? '#9CA3AF' : categoryColors[task.category],
            borderColor: task.is_completed ? '#6B7280' : categoryColors[task.category],
            textColor: '#FFFFFF',
            extendedProps: {
                description: task.description,
                category: task.category,
                priority: task.priority,
                is_completed: task.is_completed,
                task: task,
            },
        };
    });

    const handleDateClick = (info) => {
        if (onDateClick) {
            onDateClick(info.dateStr);
        }
    };

    const handleEventClick = (info) => {
        if (onEventClick) {
            onEventClick(info.event.extendedProps.task);
        }
    };

    return (
        <div className="calendar-container">
            <style>
                {`
                    .calendar-container {
                        background: white;
                        padding: 0.75rem;
                        border-radius: 1rem;
                        box-shadow: 0 4px 6px -1px rgba(200, 162, 200, 0.1);
                    }

                    @media (min-width: 640px) {
                        .calendar-container {
                            padding: 1.5rem;
                        }
                    }

                    .fc {
                        font-family: 'Poppins', sans-serif;
                    }

                    .fc .fc-button-primary {
                        background-color: #C8A2C8;
                        border-color: #C8A2C8;
                        color: white;
                        font-size: 0.75rem;
                        padding: 0.25rem 0.5rem;
                    }

                    @media (min-width: 640px) {
                        .fc .fc-button-primary {
                            font-size: 0.875rem;
                            padding: 0.4rem 0.75rem;
                        }
                    }

                    .fc .fc-button-primary:hover {
                        background-color: #B48FB4;
                        border-color: #B48FB4;
                    }

                    .fc .fc-button-primary:not(:disabled).fc-button-active,
                    .fc .fc-button-primary:not(:disabled):active {
                        background-color: #A080A0;
                        border-color: #A080A0;
                    }

                    .fc .fc-toolbar-title {
                        font-size: 1rem;
                    }

                    @media (min-width: 640px) {
                        .fc .fc-toolbar-title {
                            font-size: 1.5rem;
                        }
                    }

                    .fc-theme-standard td,
                    .fc-theme-standard th {
                        border-color: #F2D7EE;
                    }

                    .fc-day-today {
                        background-color: #F8F8FF !important;
                    }

                    .fc-event {
                        cursor: pointer;
                        border-radius: 0.375rem;
                        padding: 2px 4px;
                        font-size: 0.75rem;
                    }

                    @media (min-width: 640px) {
                        .fc-event {
                            font-size: 0.875rem;
                        }
                    }

                    .fc-event:hover {
                        opacity: 0.85;
                    }

                    .fc .fc-daygrid-day-number {
                        color: #6B7280;
                        font-weight: 500;
                        font-size: 0.75rem;
                        padding: 2px;
                    }

                    @media (min-width: 640px) {
                        .fc .fc-daygrid-day-number {
                            font-size: 0.875rem;
                            padding: 4px;
                        }
                    }

                    .fc .fc-col-header-cell-cushion {
                        color: #C8A2C8;
                        font-weight: 600;
                        font-size: 0.75rem;
                        padding: 4px 2px;
                    }

                    @media (min-width: 640px) {
                        .fc .fc-col-header-cell-cushion {
                            font-size: 0.875rem;
                            padding: 8px 4px;
                        }
                    }

                    /* Simplifier la toolbar sur mobile */
                    @media (max-width: 639px) {
                        .fc .fc-toolbar {
                            flex-direction: column;
                            gap: 0.5rem;
                        }

                        .fc .fc-toolbar-chunk {
                            display: flex;
                            justify-content: center;
                        }
                    }
                `}
            </style>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                initialView="dayGridMonth"
                locale={frLocale}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
                }}
                events={events}
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                height="auto"
                eventDisplay="block"
                displayEventTime={true}
                fixedWeekCount={false}
                buttonText={{
                    today: "Aujourd'hui",
                    month: 'Mois',
                    week: 'Semaine',
                    day: 'Jour',
                    list: 'Liste',
                }}
                dayMaxEvents={2}
                moreLinkText={(num) => `+${num}`}
            />
        </div>
    );
}
