import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      const onboarded = localStorage.getItem('aamaal_onboarded');
      if (onboarded === 'true') {
        navigate('/home', { replace: true });
      } else {
        navigate('/welcome', { replace: true });
      }
    }, 1800);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className="app-shell"
      style={{
        background: 'linear-gradient(160deg, #0F5132 0%, #082f1d 100%)',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: '88px',
          height: '88px',
          borderRadius: '26px',
          background: 'rgba(212, 175, 55, 0.16)',
          border: '2px solid #D4AF37',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
          boxShadow: '0 12px 30px rgba(0,0,0,0.25)',
        }}
      >
        <Sparkles size={42} color="#D4AF37" />
      </div>

      <h1 className="arabic-text" style={{ color: '#D4AF37', fontSize: '2.4rem', marginBottom: '4px' }}>
        أعمال
      </h1>
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '0.5px', marginBottom: '8px' }}>
        Aamaal
      </h2>
      <p style={{ fontSize: '0.92rem', color: 'rgba(255,255,255,0.78)', maxWidth: '260px', lineHeight: 1.5 }}>
        Daily Ibadaat, 3D Tasbih, Duas & Family Spiritual Tracker
      </p>

      <div style={{ marginTop: '48px', display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#D4AF37',
            animation: 'pulse 1.2s infinite ease-in-out',
          }}
        />
        <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.65)' }}>Preparing your sanctuary...</span>
      </div>
    </div>
  );
}