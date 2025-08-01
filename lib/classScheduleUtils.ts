import { CLASS_TYPE_COLORS, DEFAULT_COLORS } from '@/constants/classSchedules';
import type { ClassType } from '@/types/shared';

// Used to color code the class types on the class card
export const getClassColors = (type: string) => CLASS_TYPE_COLORS[type as ClassType] || DEFAULT_COLORS;

// Used to format the time of the class in the format of "7:30 AM - 8:30 AM"
export const formatTime = (time: string, duration: number) => {
  const [hours, minutes] = time.split(':').map(Number);
  const start = new Date(2000, 0, 1, hours, minutes);
  const end = new Date(start.getTime() + duration * 60000);
  const options = { hour: 'numeric', minute: '2-digit', hour12: true } as const;
  return `${start.toLocaleTimeString('en-US', options)} - ${end.toLocaleTimeString('en-US', options)}`;
};
