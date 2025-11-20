import React, { useState, useEffect } from 'react';
import { useNebula, type TimerMode } from '../context/NebulaContext';
import { themes } from '../themes';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { settings, updateSettings } = useNebula();
  const [durations, setDurations] = useState(settings.timerDurations);
  const [selectedTheme, setSelectedTheme] = useState(settings.themeId);

  useEffect(() => {
    if (isOpen) {
      setDurations(settings.timerDurations);
      setSelectedTheme(settings.themeId);
    }
  }, [isOpen, settings]);

  if (!isOpen) return null;

  const handleDurationChange = (mode: TimerMode, value: string) => {
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue > 0) {
      setDurations(prev => ({ ...prev, [mode]: numValue * 60 }));
    }
  };

  const handleSave = () => {
    updateSettings({
      timerDurations: durations,
      themeId: selectedTheme
    });
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      backdropFilter: 'blur(5px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div className="glass-panel" style={{
        width: '90%',
        maxWidth: '500px',
        padding: '2rem',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>Settings</h2>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1rem', color: 'var(--color-text-muted)' }}>Timer (minutes)</h3>
          <div className="flex-col gap-4">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label>Focus</label>
              <input
                type="number"
                className="glass-input"
                style={{ width: '80px' }}
                value={durations.focus / 60}
                onChange={(e) => handleDurationChange('focus', e.target.value)}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label>Short Break</label>
              <input
                type="number"
                className="glass-input"
                style={{ width: '80px' }}
                value={durations.shortBreak / 60}
                onChange={(e) => handleDurationChange('shortBreak', e.target.value)}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label>Long Break</label>
              <input
                type="number"
                className="glass-input"
                style={{ width: '80px' }}
                value={durations.longBreak / 60}
                onChange={(e) => handleDurationChange('longBreak', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1rem', color: 'var(--color-text-muted)' }}>Theme</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setSelectedTheme(theme.id)}
                title={theme.name}
                style={{
                  width: '45px',
                  height: '45px',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${theme.colors.bgGradientStart}, ${theme.colors.bgGradientMid})`,
                  border: selectedTheme === theme.id ? '2px solid #fff' : '2px solid rgba(255,255,255,0.2)',
                  cursor: 'pointer',
                  boxShadow: selectedTheme === theme.id ? '0 0 15px var(--color-accent)' : 'none',
                  transition: 'all 0.2s ease',
                  transform: selectedTheme === theme.id ? 'scale(1.1)' : 'scale(1)'
                }}
              />
            ))}
          </div>
        </div>

        <div className="flex-center gap-4">
          <button
            className="glass-button"
            onClick={onClose}
            style={{ background: 'rgba(255,255,255,0.05)' }}
          >
            Cancel
          </button>
          <button
            className="glass-button"
            onClick={handleSave}
            style={{ background: 'var(--color-primary)', color: '#fff' }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
