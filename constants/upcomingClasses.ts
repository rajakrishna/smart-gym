export type ClassCategory = 'Yoga' | 'HIIT' | 'Boxing' | 'Aquatic' | 'Cycling';
export type ClassIntensity = 'low' | 'moderate' | 'high';

export type HardClass = {
  id: string;
  class_name: string;
  category: ClassCategory;
  intensity: ClassIntensity;
  duration_min: number;
  scheduled_on: string; // YYYY-MM-DD
  time: string;         // HH:MM (24h)
};

// Hard-coded upcoming classes
export const UPCOMING_CLASSES: HardClass[] = [
  { id: 'yc1', class_name: 'Calming Flow',      category: 'Yoga',    intensity: 'low',      duration_min: 60, scheduled_on: '2025-08-14', time: '09:00'},
  { id: 'hc1', class_name: 'HIIT Express',      category: 'HIIT',    intensity: 'high',     duration_min: 30, scheduled_on: '2025-08-14', time: '06:30'},
  { id: 'bx1', class_name: 'Boxing Basics',     category: 'Boxing',  intensity: 'moderate', duration_min: 45, scheduled_on: '2025-08-15', time: '18:00'},
  { id: 'aq1', class_name: 'Aquatic Recovery',  category: 'Aquatic', intensity: 'low',      duration_min: 40, scheduled_on: '2025-08-15', time: '10:00'},
  { id: 'cy1', class_name: 'Spin Power',        category: 'Cycling', intensity: 'high',     duration_min: 45, scheduled_on: '2025-08-16', time: '07:00'},
  { id: 'cy2', class_name: 'Lunch Ride',        category: 'Cycling', intensity: 'moderate', duration_min: 35, scheduled_on: '2025-08-16', time: '12:00'},
  { id: 'bx2', class_name: 'Bag & Mitts',       category: 'Boxing',  intensity: 'high',     duration_min: 50, scheduled_on: '2025-08-17', time: '17:30'},
  { id: 'aq2', class_name: 'Pool Conditioning', category: 'Aquatic', intensity: 'moderate', duration_min: 45, scheduled_on: '2025-08-18', time: '08:30'},
];

const INTENSITY_ORDER: Record<ClassIntensity, number> = { low: 0, moderate: 1, high: 2 };

export type ParsedWants = Partial<{
  category: ClassCategory;
  intensity: ClassIntensity;
  durationMin: number;
  timeWindow: 'morning' | 'midday' | 'evening';
}>;

export function parsePreferences(input: string): ParsedWants {
  const q = input.toLowerCase();
  const wants: ParsedWants = {};

  // Category hints (Yoga, HIIT, Boxing, Aquatic, Cycling)
  if (/\b(yoga|calming|flow)\b/.test(q)) wants.category = 'Yoga';
  else if (/\b(hiit|interval|cardio|tabata|sweat)\b/.test(q)) wants.category = 'HIIT';
  else if (/\b(box|boxing|punch|mitts|bag)\b/.test(q)) wants.category = 'Boxing';
  else if (/\b(aquatic|swim|pool|laps|water)\b/.test(q)) wants.category = 'Aquatic';
  else if (/\b(cycle|cycling|spin|bike|biking)\b/.test(q)) wants.category = 'Cycling';

  // Intensity hints
  if (/\b(recovery|easy|light|low)\b/.test(q)) wants.intensity = 'low';
  else if (/\b(moderate|medium|steady)\b/.test(q)) wants.intensity = 'moderate';
  else if (/\b(hard|intense|advanced|killer)\b/.test(q)) wants.intensity = 'high';

  // Duration like "30 min" / "45 minutes"
  const dur = q.match(/(\d{2})\s*(min|minutes?)/);
  if (dur) wants.durationMin = parseInt(dur[1], 10);

  // Time-of-day window
  if (/\b(morning|am|before work)\b/.test(q)) wants.timeWindow = 'morning';
  else if (/\b(lunch|noon|midday)\b/.test(q)) wants.timeWindow = 'midday';
  else if (/\b(evening|after work|pm|night)\b/.test(q)) wants.timeWindow = 'evening';

  return wants;
}

function classTimeWindow(t: string): 'morning' | 'midday' | 'evening' {
  const [h] = t.split(':').map(n => parseInt(n, 10));
  if (h < 11) return 'morning';
  if (h < 15) return 'midday';
  return 'evening';
}

// Simple adjacency matrix 
const ADJACENT: Record<ClassCategory, ClassCategory[]> = {
  Yoga: ['Aquatic'],
  Aquatic: ['Yoga'],
  HIIT: ['Boxing', 'Cycling'],
  Boxing: ['HIIT'],
  Cycling: ['HIIT'],
};

function scoreClass(
  c: HardClass,
  wants: ParsedWants,
  moodCode: string | null
) {
  let score = 0;
  const reasons: string[] = [];

  // Category exact/adjacent
  if (wants.category) {
    if (c.category === wants.category) { score += 3; reasons.push('matches your preferred style'); }
    else if (ADJACENT[wants.category]?.includes(c.category)) { score += 1; reasons.push('close to your goal'); }
  }

  // Intensity with mood nudge
  const desiredIntensity =
    wants.intensity ??
    (moodCode === 'sad' || moodCode === 'very_sad' ? 'low'
      : moodCode === 'very_happy' ? 'high'
      : undefined);

  if (desiredIntensity) {
    const diff = Math.abs(INTENSITY_ORDER[c.intensity] - INTENSITY_ORDER[desiredIntensity]);
    if (diff === 0) { score += 3; reasons.push('right intensity'); }
    else if (diff === 1) { score += 1; reasons.push('close intensity'); }
  }

  // Duration proximity
  if (typeof wants.durationMin === 'number') {
    const d = Math.abs(c.duration_min - wants.durationMin);
    if (d <= 10) { score += 2; reasons.push('near your time budget'); }
    else if (d <= 20) { score += 1; reasons.push('close to your time budget'); }
  } else if (moodCode === 'sad' || moodCode === 'very_sad') {
    if (c.duration_min <= 35) { score += 1; reasons.push('low-friction length'); }
  }

  // Time-of-day alignment
  if (wants.timeWindow && classTimeWindow(c.time) === wants.timeWindow) {
    score += 1; reasons.push('fits your time of day');
  }

  // Tie-breaker
  score += (1 / (1 + Math.random()));
  return { score, reasons };
}

function formatRecommendedLine(c: HardClass, reasons: string[]) {
  return `• ${c.class_name} — ${c.category}, ${c.intensity} intensity, ${c.duration_min} min, ${c.scheduled_on} ${c.time}` +
         (reasons.length ? `  — why: ${reasons.slice(0, 2).join(', ')}` : '');
}

export function recommendClasses(
  userText: string,
  moodCode: string | null,
  max = 3
): { lines: string[]; wants: ParsedWants } {
  const wants = parsePreferences(userText);
  const ranked = UPCOMING_CLASSES
    .map(c => ({ c, ...scoreClass(c, wants, moodCode) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, max);

  const lines = ranked.map(({ c, reasons }) => formatRecommendedLine(c, reasons));
  return { lines, wants };
}
