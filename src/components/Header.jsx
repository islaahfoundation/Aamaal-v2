import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Settings, ChevronDown, Check } from 'lucide-react';
import { useProfile } from '../context/ProfileContext';

export default function Header() {
  const navigate = useNavigate();
  const { profiles, activeProfile, switchProfile, isSwitcherOpen, setIsSwitcherOpen } = useProfile();

  const initials = activeProfile?.display_name
    ? activeProfile.display_name.slice(0, 1).toUpperCase()
    : 'A';

  return (
    <>
      <header className="app-header">
        {/* Active Family Member Selector Pill */}
        <button
          type="button"
          className="profile-pill"
          onClick={() => setIsSwitcherOpen(!isSwitcherOpen)}
          aria-label="Switch Family Profile"
        >
          <span
            className="profile-avatar"
            style={{ backgroundColor: activeProfile?.avatar_color || 'var(--color-primary)' }}
          >
            {initials}
          </span>
          <span>{activeProfile?.display_name}</span>
          <ChevronDown size={15} />
        </button>

        {/* Quick Navigation Icons */}
        <div className="header-actions">
          <button
            type="button"
            className="icon-btn"
            onClick={() => navigate('/home/search')}
            aria-label="Global Search"
          >
            <Search size={20} />
          </button>
          <button
            type="button"
            className="icon-btn"
            onClick={() => navigate('/notifications')}
            aria-label="Notifications"
          >
            <Bell size={20} />
          </button>
          <button
            type="button"
            className="icon-btn"
            onClick={() => navigate('/settings')}
            aria-label="Settings"
          >
            <Settings size={20} />
          </button>
        </div>
      </header>

      {/* Quick Profile Switcher Sheet (Screen 24 Overlay) */}
      {isSwitcherOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.4)',
            zIndex: 150,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: 'calc(var(--header-height) + var(--safe-top) + 8px)',
          }}
          onClick={() => setIsSwitcherOpen(false)}
        >
          <div
            className="card"
            style={{ width: '92%', maxWidth: '420px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '10px' }}>
              SWITCH ACTIVE AAMAAL PROFILE
            </div>
            {profiles.map((member) => {
              const isSelected = member.id === activeProfile?.id;
              return (
                <button
                  key={member.id}
                  type="button"
                  onClick={() => switchProfile(member.id)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: 'none',
                    background: isSelected ? 'var(--color-primary-soft)' : 'transparent',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    marginBottom: '4px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span
                      className="profile-avatar"
                      style={{ backgroundColor: member.avatar_color || 'var(--color-primary)' }}
                    >
                      {member.display_name.slice(0, 1).toUpperCase()}
                    </span>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>{member.display_name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{member.role}</div>
                    </div>
                  </div>
                  {isSelected && <Check size={18} color="var(--color-primary)" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}