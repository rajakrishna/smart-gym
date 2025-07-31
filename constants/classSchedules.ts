// Most of this is pretty much mock data for the class schedules page
import type { ClassScheduleItem, ClassType, ClassTypeColors, Coach } from '@/types/shared';

export const CLASS_TYPE_COLORS: Record<ClassType, ClassTypeColors> = {
  Yoga: {
    badge: 'border-purple-300 text-purple-700 bg-purple-50',
    indicator: 'after:bg-purple-400',
    dot: 'bg-purple-400',
  },
  Cardio: { badge: 'border-red-300 text-red-700 bg-red-50', indicator: 'after:bg-red-400', dot: 'bg-red-400' },
  Strength: { badge: 'border-blue-300 text-blue-700 bg-blue-50', indicator: 'after:bg-blue-400', dot: 'bg-blue-400' },
  Pilates: {
    badge: 'border-green-300 text-green-700 bg-green-50',
    indicator: 'after:bg-green-400',
    dot: 'bg-green-400',
  },
  Swimming: { badge: 'border-cyan-300 text-cyan-700 bg-cyan-50', indicator: 'after:bg-cyan-400', dot: 'bg-cyan-400' },
  Dance: { badge: 'border-pink-300 text-pink-700 bg-pink-50', indicator: 'after:bg-pink-400', dot: 'bg-pink-400' },
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

export const CLASS_TYPES: readonly ClassType[] = [
  'Yoga',
  'Cardio',
  'Strength',
  'Pilates',
  'Swimming',
  'Dance',
  'Boxing',
];

export const COACHES: readonly Coach[] = [
  { name: 'Sarah Johnson', type: 'Yoga' },
  { name: 'Mike Chen', type: 'Cardio' },
  { name: 'Emily Rodriguez', type: 'Strength' },
  { name: 'Lisa Park', type: 'Pilates' },
  { name: 'Tom Anderson', type: 'Boxing' },
];

export const CLASS_SCHEDULE: readonly ClassScheduleItem[] = [
  { id: 1, title: 'Morning Yoga', coach: 'Sarah Johnson', day: 1, time: '07:30', duration: 60, type: 'Yoga' },
  { id: 2, title: 'HIIT Training', coach: 'Mike Chen', day: 1, time: '18:00', duration: 60, type: 'Cardio' },
  { id: 3, title: 'Pilates Core', coach: 'Lisa Park', day: 2, time: '09:00', duration: 60, type: 'Pilates' },
  { id: 4, title: 'Boxing Fundamentals', coach: 'Tom Anderson', day: 2, time: '19:30', duration: 60, type: 'Boxing' },
  {
    id: 5,
    title: 'Strength Training',
    coach: 'Emily Rodriguez',
    day: 3,
    time: '06:00',
    duration: 60,
    type: 'Strength',
  },
];
