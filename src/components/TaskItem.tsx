import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Task {
    id: string;
    text: string;
    completed: boolean;
    category: string;
}

interface TaskItemProps {
    task: Task;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: task.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const categoryColors: Record<string, string> = {
        'Work': '#a18cd1',
        'Personal': '#fbc2eb',
        'Urgent': '#ff4b4b',
        'Other': '#00d2ff'
    };

    return (
        <div
            ref={setNodeRef}
            style={{
                ...style,
                marginBottom: '0.5rem',
                position: 'relative'
            }}
        >
            <div className="glass-panel" style={{
                padding: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.3s ease',
                opacity: task.completed ? 0.6 : 1,
                background: task.completed ? 'rgba(255, 255, 255, 0.02)' : 'var(--glass-bg)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                    {/* Drag Handle */}
                    <div
                        {...attributes}
                        {...listeners}
                        style={{
                            cursor: 'grab',
                            color: 'var(--color-text-dim)',
                            display: 'flex',
                            alignItems: 'center',
                            padding: '0 0.5rem'
                        }}
                    >
                        ⋮⋮
                    </div>

                    <div
                        onClick={() => onToggle(task.id)}
                        style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            border: `2px solid ${categoryColors[task.category] || 'var(--color-secondary)'}`,
                            cursor: 'pointer',
                            background: task.completed ? (categoryColors[task.category] || 'var(--color-secondary)') : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s ease',
                            flexShrink: 0
                        }}
                    >
                        {task.completed && <span style={{ color: '#000', fontSize: '12px' }}>✓</span>}
                    </div>

                    <div className="flex-col" style={{ gap: '0.2rem' }}>
                        <span style={{
                            textDecoration: task.completed ? 'line-through' : 'none',
                            color: task.completed ? 'var(--color-text-muted)' : 'var(--color-text-main)',
                            fontSize: '1.1rem',
                            fontWeight: 400
                        }}>
                            {task.text}
                        </span>
                        <span style={{
                            fontSize: '0.7rem',
                            color: categoryColors[task.category] || 'var(--color-text-dim)',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}>
                            {task.category}
                        </span>
                    </div>
                </div>

                <button
                    onClick={() => onDelete(task.id)}
                    style={{
                        background: 'transparent',
                        color: 'var(--color-text-dim)',
                        fontSize: '1.2rem',
                        padding: '0.5rem',
                        cursor: 'pointer',
                        transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#ff4b4b'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-dim)'}
                >
                    ×
                </button>
            </div>
        </div>
    );
};

export default TaskItem;
