import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, PlusCircle, CheckCircle2 } from 'lucide-react';
import { useProfile } from '../../context/ProfileContext';

const INITIAL_MEMBER_AAMAAL = [
  {
    id: 'astaghfirullah',
    title: 'Astaghfirullah Recitation',
    target: 313,
    logs: [
      { id: 1, label: 'Morning session', count: 150 },
      { id: 2, label: 'Evening session', count: 163 },
    ],
  },
  {
    id: 'salawat',
    title: 'Durood / Salawat',
    target: 100,
    logs: [{ id: 1, label: 'After Fajr', count: 60 }],
  },
];

export default function FamilyMemberAamaal() {
  const { profileId } = useParams();
  const navigate = useNavigate();
  const { profiles } = useProfile();

  const member = profiles.find((p) => p.id === profileId) || profiles[0];
  const [items, setItems] = useState(INITIAL_MEMBER_AAMAAL);

  const addQuickBatch = (aamaalId, amount) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === aamaalId
          ? {
              ...item,
              logs: [...item.logs, { id: Date.now(), label: 'Added entry', count: amount }],
            }
          : item
      )
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <button
        type="button"
        onClick={() => navigate('/account/family')}
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
        <span>Back to Family Directory</span>
      </button>

      <div className="card" style={{ borderLeft: `4px solid ${member?.avatar_color || 'var(--color-primary)'}` }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)' }}>
          SCREEN 19 • INDEPENDENT MEMBER LEDGER
        </div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '4px' }}>
          {member?.display_name}&apos;s Daily Aamaal
        </h2>
        <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Morning and evening recitations automatically merge into a single daily target for {member?.display_name}.
        </p>
      </div>

      {items.map((item) => {
        const currentTotal = item.logs.reduce((sum, l) => sum + l.count, 0);
        const completed = currentTotal >= item.target;

        return (
          <div key={item.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>{item.title}</h3>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  Combined Today: <strong>{currentTotal}</strong> / {item.target}
                </span>
              </div>
              {completed ? (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: 'var(--color-success)',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                  }}
                >
                  <CheckCircle2 size={18} /> Completed
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => addQuickBatch(item.id, 20)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: 'none',
                    background: 'var(--color-primary-soft)',
                    color: 'var(--color-primary)',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                  }}
                >
                  <PlusCircle size={15} /> +20
                </button>
              )}
            </div>

            {/* Individual session breakdown proving cumulative aggregation */}
            <div
              style={{
                marginTop: '12px',
                paddingTop: '10px',
                borderTop: '1px dashed var(--border-color)',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px',
              }}
            >
              {item.logs.map((log) => (
                <span
                  key={log.id}
                  style={{
                    fontSize: '0.75rem',
                    background: 'var(--bg-app)',
                    padding: '4px 9px',
                    borderRadius: '6px',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {log.label}: <strong>+{log.count}</strong>
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}