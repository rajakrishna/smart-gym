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

export interface Message {
  title: string;
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
