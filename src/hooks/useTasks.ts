import { useState, useEffect, useCallback } from 'react';
import { type DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import type { Task } from '../types';

export const useTasks = () => {
    const [tasks, setTasks] = useState<Task[]>(() => {
        try {
            const saved = localStorage.getItem('nebula-tasks');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Failed to parse tasks from localStorage:', error);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('nebula-tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = useCallback((text: string, category: string) => {
        if (!text.trim()) return;

        const newTask: Task = {
            id: Date.now().toString(),
            text,
            completed: false,
            category: category as Task['category']
        };

        setTasks(prev => [newTask, ...prev]);
    }, []);

    const toggleTask = useCallback((id: string) => {
        setTasks(prev => prev.map(t =>
            t.id === id ? { ...t, completed: !t.completed } : t
        ));
    }, []);

    const deleteTask = useCallback((id: string) => {
        setTasks(prev => prev.filter(t => t.id !== id));
    }, []);

    const clearCompleted = useCallback(() => {
        setTasks(prev => prev.filter(t => !t.completed));
    }, []);

    const handleDragEnd = useCallback((event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setTasks((items) => {
                const oldIndex = items.findIndex((i) => i.id === active.id);
                const newIndex = items.findIndex((i) => i.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }, []);

    return {
        tasks,
        addTask,
        toggleTask,
        deleteTask,
        clearCompleted,
        handleDragEnd
    };
};
