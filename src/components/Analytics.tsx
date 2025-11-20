import React from 'react';
import { useNebula } from '../context/NebulaContext';

const Analytics: React.FC = () => {
    const { stats } = useNebula();

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', width: '100%', maxWidth: '500px', marginTop: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>Daily Focus</h3>
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                <div className="flex-col flex-center">
                    <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--color-accent)' }}>
                        {stats.sessionsCompleted}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-dim)', textTransform: 'uppercase' }}>
                        Sessions
                    </span>
                </div>
                <div style={{ width: '1px', height: '50px', background: 'rgba(255,255,255,0.1)' }} />
                <div className="flex-col flex-center">
                    <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--color-secondary)' }}>
                        {stats.totalMinutes}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-dim)', textTransform: 'uppercase' }}>
                        Minutes
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
