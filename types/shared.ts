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

// Start of Product Related Interfaces
export interface Product {
  product_id: string;
  name: string;
  product_description: string;
  price: number;
  quantity: number;
  min_quantity: number;
  number_sold: number;
  category: string;
  product_image: string;
  is_active: boolean;
  restock: boolean;
}
