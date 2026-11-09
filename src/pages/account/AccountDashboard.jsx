import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, UserPlus, BarChart3, Shield, LogOut, ChevronRight } from 'lucide-react';
import { useProfile } from '../../context/ProfileContext';

export default function AccountDashboard() {
  const navigate = useNavigate();
  const { activeProfile, profiles } = useProfile();

  const menuItems = [
    {
      title: 'Switch or Manage Family Profiles',
      subtitle: `${profiles.length} independent profiles configured`,
      icon: Users,
      to: '/account/family',
    },
    {
      title: 'Add New Family Member',
      subtitle: 'Create an isolated Aamaal & Tasbih profile',
      icon: UserPlus,
      to: '/account/family/add',
    },
    {
      title: `${activeProfile?.display_name}'s Aamaal Records`,
      subtitle: 'View independent daily totals & completion streaks',
      icon: BarChart3,
      to: `/account/family/${activeProfile?.id}/aamaal`,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem('aamaal_authenticated');
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Active Profile Banner */}
      <div
        className="card"
        style={{
          background: 'linear-gradient(135deg, #0F5132 0%, #198754 100%)',
          color: '#fff',
          border: 'none',
        }}
      >
        <div style={{ fontSize: '0.75rem', opacity: 0.85, fontWeight: 600 }}>
          SCREEN 13 • ACTIVE HOUSEHOLD PROFILE
        </div>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 700, marginTop: '4px' }}>
          {activeProfile?.display_name}
        </h2>
        <p style={{ fontSize: '0.85rem', opacity: 0.9, marginTop: '2px' }}>
          Role: {activeProfile?.role} • Independent Aamaal Ledger Active
        </p>
      </div>

      {/* Navigation Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.to}
              type="button"
              onClick={() => navigate(item.to)}
              className="card"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                textAlign: 'left',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: 'var(--color-primary-soft)',
                    color: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    {item.subtitle}
                  </div>
                </div>
              </div>
              <ChevronRight size={18} color="var(--text-muted)" />
            </button>
          );
        })}
      </div>

      {/* Security & Sign Out */}
      <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Shield size={18} color="var(--color-primary)" />
          <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>Supabase Row-Level Isolation Enabled</span>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 12px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--color-danger)',
            background: 'transparent',
            color: 'var(--color-danger)',
            fontWeight: 600,
            fontSize: '0.82rem',
            cursor: 'pointer',
          }}
        >
          <LogOut size={15} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}