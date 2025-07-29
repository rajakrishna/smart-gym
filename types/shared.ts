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
  message_id: string;
  user_id: string;
  type: string;
  email: string;
  title: string;
  body: string;
  sent_at: string;
  category: string;
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
