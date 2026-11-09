import React, { createContext, useContext, useState, useEffect } from 'react';

const ProfileContext = createContext(null);

const DEFAULT_PROFILES = [
  { id: 'prof-primary-1', display_name: 'Ahmad (Self)', role: 'Parent', is_primary: true, avatar_color: '#0F5132' },
  { id: 'prof-family-2', display_name: 'Fatima', role: 'Spouse', is_primary: false, avatar_color: '#0D9488' },
  { id: 'prof-family-3', display_name: 'Zayd', role: 'Child', is_primary: false, avatar_color: '#D97706' },
];

export function ProfileProvider({ children }) {
  const [profiles, setProfiles] = useState(() => {
    const saved = localStorage.getItem('aamaal_family_profiles');
    return saved ? JSON.parse(saved) : DEFAULT_PROFILES;
  });

  const [activeProfileId, setActiveProfileId] = useState(() => {
    return localStorage.getItem('aamaal_active_profile_id') || DEFAULT_PROFILES[0].id;
  });

  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);

  const activeProfile = profiles.find((p) => p.id === activeProfileId) || profiles[0];

  useEffect(() => {
    localStorage.setItem('aamaal_family_profiles', JSON.stringify(profiles));
  }, [profiles]);

  useEffect(() => {
    if (activeProfile) {
      localStorage.setItem('aamaal_active_profile_id', activeProfile.id);
    }
  }, [activeProfile]);

  const switchProfile = (profileId) => {
    setActiveProfileId(profileId);
    setIsSwitcherOpen(false);
  };

  const addFamilyMember = ({ displayName, role = 'Family Member', avatarColor = '#0F5132' }) => {
    const newMember = {
      id: `prof-${Date.now()}`,
      display_name: displayName,
      role,
      is_primary: false,
      avatar_color: avatarColor,
    };
    setProfiles((prev) => [...prev, newMember]);
    return newMember;
  };

  const removeFamilyMember = (profileId) => {
    setProfiles((prev) => prev.filter((p) => p.id !== profileId || p.is_primary));
    if (activeProfileId === profileId) {
      const primary = profiles.find((p) => p.is_primary) || profiles[0];
      setActiveProfileId(primary.id);
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        profiles,
        activeProfile,
        switchProfile,
        addFamilyMember,
        removeFamilyMember,
        isSwitcherOpen,
        setIsSwitcherOpen,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}