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
export type ClassType = 'Yoga' | 'HIIT' | 'Cycling' | 'Aquatic' | 'Boxing';

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
  deleteClass: { isOpen: boolean; classId: string | null; classTitle: string };
  cancelClass: { isOpen: boolean; classId: string | null; classTitle: string };
  viewUsers: { isOpen: boolean; classId: string | null; classTitle: string };
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
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  title: string;
  body: string;
  sent_at: string;
  type: string;
  category: string;
  delivery_method: string;
}

export interface User {
  user_id: string;
  role_name: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  email: string;
  phone: string;
  user_image: string;
  membership_plan: string;
  created_at: string;
}

export interface MessageFormData {
  user_id: string;
  type: string;
  title: string;
  body: string;
  delivery_method: string;
}

// TODO: Add the actual constants from the actual database
// Start of Member Related Interfaces
export interface Member {
  user_id: string;
  role_name: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  email: string;
  phone: string;
  user_image: string;
  membership_plan: string;
  created_at: string;
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
