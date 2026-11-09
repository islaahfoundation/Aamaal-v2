import { supabase } from './database';

/**
 * Adds a count to today's Aamaal total for the active family member.
 * Example: 150 morning + 163 evening combines into 313.
 */
export async function recordAamaalCount({ profileId, aamaalId, addedCount, targetCount, dateStr, source = 'manual' }) {
  // 1. Check if a record already exists for this profile + aamaal + date
  const { data: existing, error: fetchError } = await supabase
    .from('aamaal_daily_totals')
    .select('*')
    .eq('profile_id', profileId)
    .eq('aamaal_id', aamaalId)
    .eq('entry_date', dateStr)
    .maybeSingle();

  if (fetchError) throw fetchError;

  const newTotal = (existing?.current_count || 0) + Number(addedCount);

  // 2. Upsert the combined daily total
  const { data: updatedTotal, error: upsertError } = await supabase
    .from('aamaal_daily_totals')
    .upsert(
      {
        id: existing?.id,
        profile_id: profileId,
        aamaal_id: aamaalId,
        entry_date: dateStr,
        target_count: targetCount,
        current_count: newTotal,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'profile_id,aamaal_id,entry_date' }
    )
    .select()
    .single();

  if (upsertError) throw upsertError;

  // 3. Log the individual addition so Screen 41 (UndoCount.jsx) can revert the last action
  await supabase.from('aamaal_entry_logs').insert({
    daily_total_id: updatedTotal.id,
    profile_id: profileId,
    added_count: Number(addedCount),
    source,
  });

  return updatedTotal;
}