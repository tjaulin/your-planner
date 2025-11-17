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
    const events = tasks.map(task => ({
        id: task.id,
        title: task.title,
        start: task.start_date || task.due_date,
        end: task.due_date,
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
    }));

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
                        padding: 1.5rem;
                        border-radius: 1rem;
                        box-shadow: 0 4px 6px -1px rgba(200, 162, 200, 0.1);
                    }

                    .fc {
                        font-family: 'Poppins', sans-serif;
                    }

                    .fc .fc-button-primary {
                        background-color: #C8A2C8;
                        border-color: #C8A2C8;
                        color: white;
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
                    }

                    .fc-event:hover {
                        opacity: 0.85;
                    }

                    .fc .fc-daygrid-day-number {
                        color: #6B7280;
                        font-weight: 500;
                    }

                    .fc .fc-col-header-cell-cushion {
                        color: #C8A2C8;
                        font-weight: 600;
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
                    right: 'dayGridMonth,timeGridWeek,listWeek',
                }}
                events={events}
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                height="auto"
                eventDisplay="block"
                displayEventTime={false}
                fixedWeekCount={false}
                buttonText={{
                    today: "Aujourd'hui",
                    month: 'Mois',
                    week: 'Semaine',
                    list: 'Liste',
                }}
            />
        </div>
    );
}
