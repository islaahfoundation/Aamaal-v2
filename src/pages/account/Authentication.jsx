import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, User } from 'lucide-react';

export default function Authentication() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [name, setName] = useState('Ahmad');
  const [email, setEmail] = useState('family@aamaal.app');
  const [password, setPassword] = useState('••••••••');

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('aamaal_onboarded', 'true');
    localStorage.setItem('aamaal_authenticated', 'true');
    navigate('/home');
  };

  return (
    <div className="app-shell" style={{ padding: '32px 20px', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '18px',
            background: 'var(--color-primary-soft)',
            color: 'var(--color-primary)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '12px',
          }}
        >
          <ShieldCheck size={30} />
        </div>
        <h1 style={{ fontSize: '1.45rem', fontWeight: 700 }}>
          {mode === 'login' ? 'Welcome Back to Aamaal' : 'Create Family Account'}
        </h1>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
          One account securely syncs independent profiles for your whole family.
        </p>
      </div>

      {/* Mode Switcher */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          background: 'var(--border-color)',
          padding: '4px',
          borderRadius: 'var(--radius-sm)',
          marginBottom: '20px',
        }}
      >
        <button
          type="button"
          onClick={() => setMode('login')}
          style={{
            padding: '9px',
            borderRadius: '6px',
            border: 'none',
            fontWeight: 600,
            background: mode === 'login' ? 'var(--bg-surface)' : 'transparent',
            color: 'var(--text-primary)',
            cursor: 'pointer',
          }}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => setMode('register')}
          style={{
            padding: '9px',
            borderRadius: '6px',
            border: 'none',
            fontWeight: 600,
            background: mode === 'register' ? 'var(--bg-surface)' : 'transparent',
            color: 'var(--text-primary)',
            cursor: 'pointer',
          }}
        >
          Register
        </button>
      </div>

      <form onSubmit={handleSubmit} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {mode === 'register' && (
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Primary Head of Household Name
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
              <User size={18} color="var(--text-muted)" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.92rem',
                }}
              />
            </div>
          </div>
        )}

        <div>
          <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Email Address
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
            <Mail size={18} color="var(--text-muted)" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                fontSize: '0.92rem',
              }}
            />
          </div>
        </div>

        <div>
          <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Password
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
            <Lock size={18} color="var(--text-muted)" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                fontSize: '0.92rem',
              }}
            />
          </div>
        </div>

        <button
          type="submit"
          style={{
            marginTop: '6px',
            padding: '14px',
            borderRadius: 'var(--radius-sm)',
            border: 'none',
            backgroundColor: 'var(--color-primary)',
            color: '#fff',
            fontWeight: 700,
            fontSize: '0.95rem',
            cursor: 'pointer',
          }}
        >
          {mode === 'login' ? 'Sign In & Open Dashboard' : 'Create Account & Continue'}
        </button>
      </form>
    </div>
  );
}