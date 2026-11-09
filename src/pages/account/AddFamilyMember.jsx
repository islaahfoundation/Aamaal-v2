import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, ArrowLeft } from 'lucide-react';
import { useProfile } from '../../context/ProfileContext';

const AVATAR_COLORS = ['#0F5132', '#0D9488', '#D97706', '#4F46E5', '#DB2777', '#2563EB'];
const ROLES = ['Spouse', 'Child', 'Parent', 'Sibling', 'Elder'];

export default function AddFamilyMember() {
  const navigate = useNavigate();
  const { addFamilyMember, switchProfile } = useProfile();

  const [displayName, setDisplayName] = useState('');
  const [role, setRole] = useState('Child');
  const [avatarColor, setAvatarColor] = useState(AVATAR_COLORS[1]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!displayName.trim()) return;

    const created = addFamilyMember({
      displayName: displayName.trim(),
      role,
      avatarColor,
    });
    switchProfile(created.id);
    navigate('/account/family');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <button
        type="button"
        onClick={() => navigate(-1)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'none',
          border: 'none',
          color: 'var(--text-secondary)',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        <ArrowLeft size={16} />
        <span>Back to Family Profiles</span>
      </button>

      <div className="card">
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)' }}>
          SCREEN 16 • NEW PROFILE
        </div>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginTop: '4px', marginBottom: '16px' }}>
          Add Family Member
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Member Name
            </label>
            <input
              type="text"
              placeholder="e.g., Maryam or Ibrahim"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
              style={{
                width: '100%',
                marginTop: '6px',
                padding: '11px 12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                fontSize: '0.95rem',
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Household Role
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
              {ROLES.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  style={{
                    padding: '7px 14px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--border-color)',
                    background: role === r ? 'var(--color-primary)' : 'var(--bg-surface)',
                    color: role === r ? '#fff' : 'var(--text-primary)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Profile Badge Colour
            </label>
            <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
              {AVATAR_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setAvatarColor(color)}
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    backgroundColor: color,
                    border: avatarColor === color ? '3px solid var(--text-primary)' : '2px solid transparent',
                    cursor: 'pointer',
                  }}
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            style={{
              marginTop: '8px',
              padding: '14px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: 'var(--color-primary)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
            }}
          >
            <UserPlus size={18} />
            <span>Create Independent Profile</span>
          </button>
        </form>
      </div>
    </div>
  );
}