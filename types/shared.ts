export interface ExampleData {
  id: string;
  name: string;
  description: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

// Class Scheduling Types
export interface ClassFormData {
  title: string;
  coach: string;
  time: string;
  duration: number;
  type: string;
}

export interface Coach {
  name: string;
  type: string;
}

// TODO: Add more class types if needed here
export type ClassType = 'Yoga' | 'Cardio' | 'Strength' | 'Pilates' | 'Swimming' | 'Dance' | 'Boxing';

export interface Class {
  id: string;
  title: string;
  coach: string;
  time: string;
  duration: number;
  type: ClassType;
  date: Date;
  status: ClassStatus;
  maxCapacity?: number;
  currentCapacity?: number;
}

export type ClassStatus = 'scheduled' | 'cancelled' | 'completed' | 'in-progress';

export interface ClassSchedule {
  id: string;
  classId: string;
  date: Date;
  isRecurring: boolean;
  recurrencePattern?: RecurrencePattern;
}

export type RecurrencePattern = 'daily' | 'weekly' | 'monthly' | 'none';

// Dialog (Modals)Types
export interface DialogState {
  addClass: boolean;
  deleteClass: { isOpen: boolean; classId: number | null; classTitle: string };
  cancelClass: { isOpen: boolean; classId: number | null; classTitle: string };
  viewUsers: { isOpen: boolean; classId: number | null; classTitle: string };
}

// Colors for the different types of classes for buttons and badges
export interface ClassTypeColors {
  badge: string;
  indicator: string;
  dot: string;
}

export interface ClassScheduleItem {
  id: number;
  title: string;
  coach: string;
  day: number;
  time: string;
  duration: number;
  type: ClassType;
}

export interface Message {
  message_id: string;
  user_id: string;
  full_name: string;
  email: string;
  delivery_method: string;
  type: string;
  body: string;
  sent_at: string;
}

// TODO: Add the actual constants from the actual database
// Start of Member Related Interfaces
export interface Member {
  id: number;
  name: string;
  email: string;
  phone: string;
  age: number;
  membershipType: string;
  memberSince: string;
  memberShipStatus: string;
  image: string;
}

export interface CheckInHistory {
  id: number;
  date: string;
  time: string;
  status: 'checked-in' | 'checked-out';
}

export interface ClassTaken {
  id: number;
  className: string;
  instructor: string;
  date: string;
  time: string;
  status: 'completed' | 'upcoming' | 'cancelled';
}

export interface Invoice {
  id: number;
  invoiceNumber: string;
  date: string;
  amount: number;
  description: string;
  status: 'paid' | 'pending' | 'overdue';
}

export interface EnrolledClassMember {
  id: string;
  name: string;
  email: string;
}
