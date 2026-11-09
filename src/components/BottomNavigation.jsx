import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, CheckSquare, Disc, BookOpen, Sparkles } from 'lucide-react';

const NAV_ITEMS = [
  { to: '/home', label: 'Home', icon: Home },
  { to: '/aamaal', label: 'Aamaal', icon: CheckSquare },
  { to: '/tasbih', label: 'Tasbih', icon: Disc },
  { to: '/duas', label: 'Duas', icon: BookOpen },
  { to: '/stories', label: 'Stories', icon: Sparkles },
];

export default function BottomNavigation() {
  return (
    <nav className="bottom-nav" aria-label="Primary Bottom Navigation">
      {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <Icon size={21} strokeWidth={2} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}