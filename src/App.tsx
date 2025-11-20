import { useState } from 'react';
import Timer from './components/Timer';
import TaskList from './components/TaskList';
import SettingsModal from './components/SettingsModal';
import Analytics from './components/Analytics';
import { NebulaProvider } from './context/NebulaContext';

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <NebulaProvider>
      <div className="container flex-col flex-center" style={{ minHeight: '100vh', paddingBottom: '4rem', position: 'relative' }}>
        <button
          onClick={() => setIsSettingsOpen(true)}
          style={{
            position: 'absolute',
            top: '2rem',
            right: '2rem',
            background: 'transparent',
            color: 'var(--color-text-muted)',
            fontSize: '1.5rem',
            cursor: 'pointer'
          }}
        >
          ⚙
        </button>

        <header style={{ marginBottom: '3rem', textAlign: 'center', marginTop: '2rem' }}>
          <h1 style={{
            fontSize: '3rem',
            background: 'linear-gradient(to right, #fff, #a18cd1)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem'
          }}>
            Nebula
          </h1>
          <p style={{ color: 'var(--color-text-muted)', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.8rem' }}>
            Zen Focus & Task Manager
          </p>
        </header>

        <main className="flex-col flex-center" style={{ width: '100%', gap: '3rem' }}>
          <Timer />
          <Analytics />
          <TaskList />
        </main>

        <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

        <footer style={{
          marginTop: 'auto',
          paddingTop: '3rem',
          color: 'var(--color-text-dim)',
          fontSize: '0.8rem'
        }}>
          <p>© {new Date().getFullYear()} Nebula. Stay Focused.</p>
        </footer>
      </div>
    </NebulaProvider>
  );
}

export default App;
