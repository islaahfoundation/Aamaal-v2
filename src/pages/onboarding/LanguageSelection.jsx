import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Globe } from 'lucide-react';

const LANGUAGES = [
  { code: 'en', name: 'English', native: 'English', desc: 'Default interface & translations' },
  { code: 'ur', name: 'Urdu', native: 'اردو', desc: 'اردو ترجمہ اور رہنمائی' },
  { code: 'ar', name: 'Arabic', native: 'العربية', desc: 'الواجهة والنصوص العربية الكاملة' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', desc: 'ગુજરાતી લિપિ અને અનુવાદ' },
];

export default function LanguageSelection() {
  const navigate = useNavigate();
  const [selectedLang, setSelectedLang] = useState(
    () => localStorage.getItem('aamaal_language') || 'en'
  );

  const handleContinue = () => {
    localStorage.setItem('aamaal_language', selectedLang);
    navigate('/login');
  };

  return (
    <div
      className="app-shell"
      style={{ padding: '32px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
    >
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'var(--color-primary-soft)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Globe size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)' }}>
              SCREEN 07 • LANGUAGE
            </div>
            <h1 style={{ fontSize: '1.35rem', fontWeight: 700 }}>Select Your Language</h1>
          </div>
        </div>

        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
          You can change your translation and transliteration preferences anytime in Settings.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {LANGUAGES.map((lang) => {
            const active = selectedLang === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => setSelectedLang(lang.code)}
                className="card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  textAlign: 'left',
                  cursor: 'pointer',
                  borderColor: active ? 'var(--color-primary)' : 'var(--border-color)',
                  backgroundColor: active ? 'var(--color-primary-soft)' : 'var(--bg-surface)',
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>
                    {lang.name}{' '}
                    <span style={{ color: 'var(--color-primary)', marginLeft: '6px' }}>({lang.native})</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    {lang.desc}
                  </div>
                </div>
                {active && <Check size={20} color="var(--color-primary)" />}
              </button>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={handleContinue}
        style={{
          width: '100%',
          padding: '15px',
          borderRadius: 'var(--radius-md)',
          border: 'none',
          backgroundColor: 'var(--color-primary)',
          color: '#fff',
          fontWeight: 700,
          fontSize: '0.98rem',
          cursor: 'pointer',
        }}
      >
        Save & Continue to Sign In
      </button>
    </div>
  );
}