// Most of this is pretty much mock data for the class schedules page
import type { ClassScheduleItem, ClassType, ClassTypeColors, Coach } from '@/types/shared';

export const CLASS_TYPE_COLORS: Record<ClassType, ClassTypeColors> = {
  Yoga: {
    badge: 'border-purple-300 text-purple-700 bg-purple-50',
    indicator: 'after:bg-purple-400',
    dot: 'bg-purple-400',
  },
  HIIT: { badge: 'border-red-300 text-red-700 bg-red-50', indicator: 'after:bg-red-400', dot: 'bg-red-400' },
  Cycling: {
    badge: 'border-green-300 text-green-700 bg-green-50',
    indicator: 'after:bg-green-400',
    dot: 'bg-green-400',
  },
  Aquatic: { badge: 'border-cyan-300 text-cyan-700 bg-cyan-50', indicator: 'after:bg-cyan-400', dot: 'bg-cyan-400' },
  Boxing: {
    badge: 'border-orange-300 text-orange-700 bg-orange-50',
    indicator: 'after:bg-orange-400',
    dot: 'bg-orange-400',
  },
};

export const DEFAULT_COLORS: ClassTypeColors = {
  badge: 'border-gray-300 text-gray-700 bg-gray-50',
  indicator: 'after:bg-gray-400',
  dot: 'bg-gray-400',
};

export const CLASS_TYPES: readonly ClassType[] = ['Yoga', 'Cycling', 'Boxing', 'Aquatic', 'HIIT'];

export const COACHES: readonly Coach[] = [
  { first_name: 'Sarah', last_name: 'Johnson', coach_type: 'Yoga', coach_id: '1' },
  { first_name: 'Mike', last_name: 'Chen', coach_type: 'HIIT', coach_id: '2' },
  { first_name: 'James', last_name: 'Wilson', coach_type: 'Cycling', coach_id: '3' },
  { first_name: 'Lisa', last_name: 'Park', coach_type: 'Aquatic', coach_id: '4' },
  { first_name: 'Tom', last_name: 'Anderson', coach_type: 'Boxing', coach_id: '5' },
];

export const CLASS_SCHEDULE: readonly ClassScheduleItem[] = [
  {
    class_id: '1',
    coach_id: '1',
    class_name: 'Morning Yoga',
    category: 'Yoga',
    scheduled_on: '2024-01-01',
    day: 1,
    time: '07:30',
    capacity: 20,
    created_at: '2024-01-01T00:00:00Z',
    duration: 60,
  },
  {
    class_id: '2',
    coach_id: '2',
    class_name: 'HIIT Training',
    category: 'HIIT',
    scheduled_on: '2024-01-01',
    day: 1,
    time: '18:00',
    capacity: 20,
    created_at: '2024-01-01T00:00:00Z',
    duration: 60,
  },
  {
    class_id: '3',
    coach_id: '3',
    class_name: 'Cycling',
    category: 'Cycling',
    scheduled_on: '2024-01-02',
    day: 2,
    time: '09:00',
    capacity: 20,
    created_at: '2024-01-01T00:00:00Z',
    duration: 60,
  },
  {
    class_id: '4',
    coach_id: '4',
    class_name: 'Aquatic Core',
    category: 'Aquatic',
    scheduled_on: '2024-01-02',
    day: 2,
    time: '19:30',
    capacity: 20,
    created_at: '2024-01-01T00:00:00Z',
    duration: 60,
  },
  {
    class_id: '5',
    coach_id: '5',
    class_name: 'Boxing Fundamentals',
    category: 'Boxing',
    scheduled_on: '2024-01-02',
    day: 2,
    time: '19:30',
    capacity: 20,
    created_at: '2024-01-01T00:00:00Z',
    duration: 60,
  },
];

export const CATEGORY_IMAGE_MAP: Record<string, string> = {
  yoga: '/assets/gc1.png',
  cycling: '/assets/gc2.png',
  boxing: '/assets/gc3.png',
  aquatic: '/assets/gc4.png',
  hiit: '/assets/gc5.png',
};

export const ALLOWED_CLASS_CATEGORIES = [
  'yoga',
  'Yoga',
  'cycling',
  'Cycling',
  'boxing',
  'Boxing',
  'aquatic',
  'Aquatic',
  'hiit',
  'HIIT',
  'Hitt',
];