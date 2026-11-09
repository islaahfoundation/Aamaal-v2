-- 1. Family Profiles (One Auth User -> Multiple Independent Family Profiles)
CREATE TABLE family_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Daily Aamaal Summary (Enforces 1 combined record per profile, per aamaal, per day)
CREATE TABLE aamaal_daily_totals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES family_profiles(id) ON DELETE CASCADE,
  aamaal_id TEXT NOT NULL,
  entry_date DATE NOT NULL DEFAULT CURRENT_DATE,
  target_count INTEGER NOT NULL DEFAULT 0,
  current_count INTEGER NOT NULL DEFAULT 0,
  is_completed BOOLEAN GENERATED ALWAYS AS (current_count >= target_count AND target_count > 0) STORED,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(profile_id, aamaal_id, entry_date)
);

-- 3. Individual Entry Logs (Supports Screen 40 EditCount & Screen 41 UndoCount)
CREATE TABLE aamaal_entry_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  daily_total_id UUID NOT NULL REFERENCES aamaal_daily_totals(id) ON DELETE CASCADE,
  profile_id UUID NOT NULL REFERENCES family_profiles(id) ON DELETE CASCADE,
  added_count INTEGER NOT NULL,
  source TEXT DEFAULT 'manual', -- 'manual' or 'tasbih'
  logged_at TIMESTAMPTZ DEFAULT NOW()
);