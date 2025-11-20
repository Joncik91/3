import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { themes, type Theme } from '../themes';

export type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

interface Settings {
    timerDurations: {
        focus: number;
        shortBreak: number;
        longBreak: number;
    };
    themeId: string;
    soundEnabled: boolean;
}

interface Stats {
    sessionsCompleted: number;
    totalMinutes: number;
}

interface NebulaContextType {
    settings: Settings;
    stats: Stats;
    updateSettings: (newSettings: Partial<Settings>) => void;
    incrementStats: (minutes: number) => void;
    currentTheme: Theme;
}

const defaultSettings: Settings = {
    timerDurations: {
        focus: 25 * 60,
        shortBreak: 5 * 60,
        longBreak: 15 * 60,
    },
    themeId: 'nebula',
    soundEnabled: true,
};

const defaultStats: Stats = {
    sessionsCompleted: 0,
    totalMinutes: 0,
};

const NebulaContext = createContext<NebulaContextType | undefined>(undefined);

export const NebulaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [settings, setSettings] = useState<Settings>(() => {
        const saved = localStorage.getItem('nebula-settings');
        const parsed = saved ? JSON.parse(saved) : {};

        // Migration: If themeColor exists but themeId doesn't, default to 'nebula'
        // We ignore the old color value as we are moving to presets
        const themeId = parsed.themeId || 'nebula';

        return {
            ...defaultSettings,
            ...parsed,
            themeId,
            timerDurations: {
                ...defaultSettings.timerDurations,
                ...(parsed.timerDurations || {})
            }
        };
    });

    const [stats, setStats] = useState<Stats>(() => {
        const saved = localStorage.getItem('nebula-stats');
        return saved ? JSON.parse(saved) : defaultStats;
    });

    const currentTheme = themes.find(t => t.id === settings.themeId) || themes[0];

    useEffect(() => {
        localStorage.setItem('nebula-settings', JSON.stringify(settings));

        // Apply theme variables
        const root = document.documentElement;
        root.style.setProperty('--color-bg-gradient-start', currentTheme.colors.bgGradientStart);
        root.style.setProperty('--color-bg-gradient-mid', currentTheme.colors.bgGradientMid);
        root.style.setProperty('--color-bg-gradient-end', currentTheme.colors.bgGradientEnd);
        root.style.setProperty('--color-primary', currentTheme.colors.primary);
        root.style.setProperty('--color-secondary', currentTheme.colors.secondary);
        root.style.setProperty('--color-accent', currentTheme.colors.accent);
        root.style.setProperty('--color-text-main', currentTheme.colors.textMain);
        root.style.setProperty('--color-text-muted', currentTheme.colors.textMuted);
        root.style.setProperty('--color-text-dim', currentTheme.colors.textDim);
        root.style.setProperty('--glass-bg', currentTheme.colors.glassBg);
        root.style.setProperty('--glass-border', currentTheme.colors.glassBorder);
        root.style.setProperty('--glass-shadow', currentTheme.colors.glassShadow);

    }, [settings, currentTheme]);

    useEffect(() => {
        localStorage.setItem('nebula-stats', JSON.stringify(stats));
    }, [stats]);

    const updateSettings = (newSettings: Partial<Settings>) => {
        setSettings(prev => ({ ...prev, ...newSettings }));
    };

    const incrementStats = (minutes: number) => {
        setStats(prev => ({
            sessionsCompleted: prev.sessionsCompleted + 1,
            totalMinutes: prev.totalMinutes + minutes,
        }));
    };

    return (
        <NebulaContext.Provider value={{ settings, stats, updateSettings, incrementStats, currentTheme }}>
            {children}
        </NebulaContext.Provider>
    );
};

export const useNebula = () => {
    const context = useContext(NebulaContext);
    if (context === undefined) {
        throw new Error('useNebula must be used within a NebulaProvider');
    }
    return context;
};
