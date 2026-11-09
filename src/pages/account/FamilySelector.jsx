import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, UserPlus, Trash2, BarChart2 } from 'lucide-react';
import { useProfile } from '../../context/ProfileContext';

export default function FamilySelector() {
  const navigate = useNavigate();
  const { profiles, activeProfile, switchProfile, removeFamilyMember } = useProfile();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)' }}>
            SCREEN 15 • FAMILY DIRECTORY
          </div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Family Profiles</h2>
        </div>

        <button
          type="button"
          onClick={() => navigate('/account/family/add')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '9px 14px',
            borderRadius: 'var(--radius-sm)',
            border: 'none',
            background: 'var(--color-primary)',
            color: '#fff',
            fontWeight: 600,
            fontSize: '0.82rem',
            cursor: 'pointer',
          }}
        >
          <UserPlus size={16} />
          <span>Add Member</span>
        </button>
      </div>

      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
        Tap any family member to make them the active profile across Home, Aamaal, and Tasbih.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {profiles.map((member) => {
          const isCurrent = member.id === activeProfile?.id;
          return (
            <div
              key={member.id}
              className="card"
              style={{
                borderColor: isCurrent ? 'var(--color-primary)' : 'var(--border-color)',
                background: isCurrent ? 'var(--color-primary-soft)' : 'var(--bg-surface)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <button
                type="button"
                onClick={() => switchProfile(member.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  flex: 1,
                }}
              >
                <span
                  className="profile-avatar"
                  style={{
                    width: '40px',
                    height: '40px',
                    fontSize: '1rem',
                    backgroundColor: member.avatar_color || 'var(--color-primary)',
                  }}
                >
                  {member.display_name.slice(0, 1).toUpperCase()}
                </span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.98rem', color: 'var(--text-primary)' }}>
                    {member.display_name}
                    {isCurrent && (
                      <span
                        style={{
                          marginLeft: '8px',
                          fontSize: '0.72rem',
                          padding: '2px 8px',
                          borderRadius: '999px',
                          background: 'var(--color-primary)',
                          color: '#fff',
                        }}
                      >
                        Active
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    {member.role} {member.is_primary ? '• Primary Account Holder' : ''}
                  </div>
                </div>
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <button
                  type="button"
                  onClick={() => navigate(`/account/family/${member.id}/aamaal`)}
                  className="icon-btn"
                  title="View Member Aamaal"
                >
                  <BarChart2 size={18} color="var(--color-primary)" />
                </button>

                {!member.is_primary && (
                  <button
                    type="button"
                    onClick={() => removeFamilyMember(member.id)}
                    className="icon-btn"
                    title="Remove Member"
                  >
                    <Trash2 size={18} color="var(--color-danger)" />
                  </button>
                )}

                {isCurrent && <Check size={18} color="var(--color-primary)" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}