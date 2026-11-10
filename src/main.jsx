import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

const PROFILES = [
  { id: '1', name: 'Ahmad (Self)', role: 'Parent' },
  { id: '2', name: 'Fatima', role: 'Spouse' },
  { id: '3', name: 'Zayd', role: 'Child' },
];

function App() {
  const [activeId, setActiveId] = useState('1');
  const [tab, setTab] = useState('Home');
  const [counts, setCounts] = useState({ '1': 313, '2': 150, '3': 45 });
  const [tasbih, setTasbih] = useState(0);

  const active = PROFILES.find((p) => p.id === activeId);
  const total = counts[activeId] || 0;

  const add = (amt) => setCounts((prev) => ({ ...prev, [activeId]: (prev[activeId] || 0) + amt }));

  return (
    <div style={{ maxWidth: 460, minHeight: '100vh', margin: '0 auto', background: '#f8f9fa', display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: 16, background: '#fff', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <strong style={{ color: '#0F5132', fontSize: 18 }}>Aamaal • أعمال</strong>
        <select value={activeId} onChange={(e) => setActiveId(e.target.value)} style={{ padding: '6px 12px', borderRadius: 20, background: '#e8f5e9', color: '#0F5132', fontWeight: 700 }}>
          {PROFILES.map((p) => (
            <option key={p.id} value={p.id}>👤 {p.name} ({p.role})</option>
          ))}
        </select>
      </header>

      <main style={{ flex: 1, padding: 16 }}>
        <div style={{ background: '#0F5132', color: '#fff', padding: 18, borderRadius: 14, marginBottom: 16 }}>
          <div style={{ fontSize: 11, opacity: 0.8 }}>{tab.toUpperCase()} • ACTIVE FAMILY PROFILE</div>
          <h2 style={{ margin: '6px 0' }}>{active.name}</h2>
          <div style={{ fontSize: 13 }}>Morning (150) + Evening (163) combine into 313</div>
        </div>

        {tab === 'Tasbih' ? (
          <div style={{ background: '#fff', padding: 24, borderRadius: 14, textAlign: 'center' }}>
            <h3>3D Tasbih Counter</h3>
            <button onClick={() => setTasbih(tasbih + 1)} style={{ width: 140, height: 140, borderRadius: '50%', background: '#0F5132', color: '#fff', fontSize: 36, fontWeight: 800, border: '4px solid #D4AF37', cursor: 'pointer' }}>
              {tasbih}
            </button>
          </div>
        ) : (
          <div style={{ background: '#fff', padding: 18, borderRadius: 14, border: '1px solid #ddd' }}>
            <h3 style={{ marginTop: 0 }}>Daily Astaghfirullah Target</h3>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#0F5132', marginBottom: 14 }}>
              {total} <span style={{ fontSize: 15, color: '#666' }}>/ 313</span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => add(150)} style={{ flex: 1, padding: 10, borderRadius: 8, border: 'none', background: '#e8f5e9', color: '#0F5132', fontWeight: 700, cursor: 'pointer' }}>+150 Morning</button>
              <button onClick={() => add(163)} style={{ flex: 1, padding: 10, borderRadius: 8, border: 'none', background: '#0F5132', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>+163 Evening</button>
            </div>
          </div>
        )}
      </main>

      <nav style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', background: '#fff', borderTop: '1px solid #ddd', padding: '12px 0' }}>
        {['Home', 'Aamaal', 'Tasbih', 'Duas', 'Stories'].map((t) => (
          <button key={t} onClick={() => setTab(t)} style={{ background: 'none', border: 'none', color: tab === t ? '#0F5132' : '#666', fontWeight: tab === t ? 800 : 500, cursor: 'pointer' }}>
            {t}
          </button>
        ))}
      </nav>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);