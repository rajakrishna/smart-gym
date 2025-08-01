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

export const CLASS_TYPES: readonly ClassType[] = ['Yoga', 'HIIT', 'Cycling', 'Aquatic', 'Boxing'];

export const COACHES: readonly Coach[] = [
  { name: 'Sarah Johnson', type: 'Yoga' },
  { name: 'Mike Chen', type: 'HIIT' },
  { name: 'James Wilson', type: 'Cycling' },
  { name: 'Lisa Park', type: 'Aquatic' },
  { name: 'Tom Anderson', type: 'Boxing' },
];

export const CLASS_SCHEDULE: readonly ClassScheduleItem[] = [
  { id: 1, title: 'Morning Yoga', coach: 'Sarah Johnson', day: 1, time: '07:30', duration: 60, type: 'Yoga' },
  { id: 2, title: 'HIIT Training', coach: 'Mike Chen', day: 1, time: '18:00', duration: 60, type: 'HIIT' },
  { id: 3, title: 'Cycling', coach: 'James Wilson', day: 2, time: '09:00', duration: 60, type: 'Cycling' },
  { id: 4, title: 'Aquatic Core', coach: 'Lisa Park', day: 2, time: '19:30', duration: 60, type: 'Aquatic' },
  { id: 5, title: 'Boxing Fundamentals', coach: 'Tom Anderson', day: 2, time: '19:30', duration: 60, type: 'Boxing' },
];
