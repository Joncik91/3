import React, { useState, useEffect, useRef } from 'react';
import { useNebula } from '../context/NebulaContext';
import type { TimerMode } from '../types';
import { themes } from '../themes';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { settings, updateSettings } = useNebula();
  const [durations, setDurations] = useState(settings.timerDurations);
  const [selectedTheme, setSelectedTheme] = useState(settings.themeId);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setDurations(settings.timerDurations);
      setSelectedTheme(settings.themeId);
    }
  }, [isOpen, settings]);

  // Focus Trap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      }

      if (e.key === 'Tab') {
        if (!modalRef.current) return;

        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus the first element when modal opens
      setTimeout(() => {
        const firstElement = modalRef.current?.querySelector('button, input') as HTMLElement;
        firstElement?.focus();
      }, 10);
    } else {
      document.body.style.overflow = 'unset';
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

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

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all settings and data? This cannot be undone.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div
      className="modal-overlay flex-center"
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(5px)',
        zIndex: 1000,
        animation: 'fadeIn 0.2s ease'
      }}
    >
      <div
        ref={modalRef}
        className="glass-panel"
        onClick={e => e.stopPropagation()}
        style={{
          width: '90%',
          maxWidth: '500px',
          padding: '2rem',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative'
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
      >
        <button
          onClick={onClose}
          aria-label="Close settings"
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            background: 'transparent',
            border: 'none',
            color: 'var(--color-text-muted)',
            fontSize: '1.2rem',
            cursor: 'pointer'
          }}
        >
          ✕
        </button>

        <h2 id="settings-title" style={{ marginBottom: '2rem', textAlign: 'center' }}>Settings</h2>

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
                aria-label={`Select ${theme.name} theme`}
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

        <div style={{ marginBottom: '2rem', borderTop: '1px solid var(--glass-border)', paddingTop: '1rem' }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1rem', color: 'var(--color-text-muted)' }}>Danger Zone</h3>
          <button
            onClick={handleReset}
            style={{
              background: 'rgba(255, 50, 50, 0.1)',
              border: '1px solid rgba(255, 50, 50, 0.3)',
              color: '#ff6b6b',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            Reset to Defaults
          </button>
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
