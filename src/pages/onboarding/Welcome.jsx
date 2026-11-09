import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckSquare, Disc, BookOpen, Users, ArrowRight } from 'lucide-react';

const SLIDES = [
  {
    id: 'welcome',
    badge: '02 • Welcome to Aamaal',
    title: 'Your Daily Spiritual Companion',
    description:
      'Track your daily Aamaal with cumulative morning and evening logs, build consistency, and keep your heart connected.',
    icon: CheckSquare,
    accent: '#0F5132',
  },
  {
    id: 'tasbih',
    badge: '04 • Signature 3D Tasbih',
    title: 'Tactile Bead Engine & Haptics',
    description:
      'Experience realistic bead movement, authentic acoustic clicks, and gentle haptic feedback for every Dhikr session.',
    icon: Disc,
    accent: '#D97706',
  },
  {
    id: 'duas-stories',
    badge: '05–06 • Duas & Reflections',
    title: 'Authentic Duas & Illustrated Stories',
    description:
      'Read clear Arabic script with translations, audio recitations, and inspiring stories for every member of your household.',
    icon: BookOpen,
    accent: '#0D9488',
  },
  {
    id: 'family',
    badge: '03 • Independent Family Profiles',
    title: 'One Device, Every Family Member',
    description:
      'Switch between parents and children in a single tap. Every family member keeps strictly independent targets, streaks, and reports.',
    icon: Users,
    accent: '#4F46E5',
  },
];

export default function Welcome() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const current = SLIDES[step];
  const Icon = current.icon;

  const handleNext = () => {
    if (step < SLIDES.length - 1) {
      setStep(step + 1);
    } else {
      navigate('/onboarding/language');
    }
  };

  return (
    <div
      className="app-shell"
      style={{
        padding: '32px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Top Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'var(--color-primary)',
            background: 'var(--color-primary-soft)',
            padding: '4px 10px',
            borderRadius: 'var(--radius-full)',
          }}
        >
          {current.badge}
        </span>
        <button
          type="button"
          onClick={() => navigate('/onboarding/language')}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            fontWeight: 600,
            fontSize: '0.85rem',
            cursor: 'pointer',
          }}
        >
          Skip
        </button>
      </div>

      {/* Center Slide Illustration & Copy */}
      <div style={{ textAlign: 'center', padding: '24px 8px' }}>
        <div
          style={{
            width: '96px',
            height: '96px',
            margin: '0 auto 28px',
            borderRadius: '28px',
            backgroundColor: `${current.accent}15`,
            color: current.accent,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon size={46} strokeWidth={1.8} />
        </div>

        <h1 style={{ fontSize: '1.55rem', fontWeight: 700, marginBottom: '12px', color: 'var(--text-primary)' }}>
          {current.title}
        </h1>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          {current.description}
        </p>
      </div>

      {/* Bottom Controls */}
      <div>
        {/* Progress Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
          {SLIDES.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setStep(idx)}
              aria-label={`Slide ${idx + 1}`}
              style={{
                width: idx === step ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: idx === step ? 'var(--color-primary)' : 'var(--border-color)',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleNext}
          style={{
            width: '100%',
            padding: '15px',
            borderRadius: 'var(--radius-md)',
            border: 'none',
            backgroundColor: 'var(--color-primary)',
            color: '#fff',
            fontWeight: 700,
            fontSize: '0.98rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer',
          }}
        >
          <span>{step === SLIDES.length - 1 ? 'Choose Language' : 'Continue'}</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}