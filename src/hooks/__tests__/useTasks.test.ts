import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useTasks } from '../useTasks';

describe('useTasks', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
    });

    it('should initialize with empty tasks', () => {
        const { result } = renderHook(() => useTasks());
        expect(result.current.tasks).toEqual([]);
    });

    it('should add a task', () => {
        const { result } = renderHook(() => useTasks());

        act(() => {
            result.current.addTask('New Task', 'Work');
        });

        expect(result.current.tasks).toHaveLength(1);
        expect(result.current.tasks[0].text).toBe('New Task');
        expect(result.current.tasks[0].category).toBe('Work');
        expect(result.current.tasks[0].completed).toBe(false);
    });

    it('should toggle a task completion status', () => {
        const { result } = renderHook(() => useTasks());

        act(() => {
            result.current.addTask('Task to toggle', 'Work');
        });

        const taskId = result.current.tasks[0].id;

        act(() => {
            result.current.toggleTask(taskId);
        });

        expect(result.current.tasks[0].completed).toBe(true);

        act(() => {
            result.current.toggleTask(taskId);
        });

        expect(result.current.tasks[0].completed).toBe(false);
    });

    it('should delete a task', () => {
        const { result } = renderHook(() => useTasks());

        act(() => {
            result.current.addTask('Task to delete', 'Work');
        });

        const taskId = result.current.tasks[0].id;

        act(() => {
            result.current.deleteTask(taskId);
        });

        expect(result.current.tasks).toHaveLength(0);
    });

    it('should clear completed tasks', () => {
        const { result } = renderHook(() => useTasks());

        // Mock Date.now to ensure unique IDs
        const dateSpy = vi.spyOn(Date, 'now');

        dateSpy.mockReturnValue(1000);
        act(() => {
            result.current.addTask('Task 1', 'Work');
        });

        dateSpy.mockReturnValue(2000);
        act(() => {
            result.current.addTask('Task 2', 'Work');
        });

        // Task 2 is at index 0 (timestamp 2000), Task 1 is at index 1 (timestamp 1000)
        const task1Id = result.current.tasks[1].id;

        act(() => {
            result.current.toggleTask(task1Id);
        });

        act(() => {
            result.current.clearCompleted();
        });

        expect(result.current.tasks).toHaveLength(1);
        expect(result.current.tasks[0].text).toBe('Task 2');

        dateSpy.mockRestore();
    });
});
