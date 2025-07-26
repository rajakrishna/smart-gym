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
  full_name: string;
  email: string;
  delivery_method: string;
  type: string;
  body: string;
  sent_at: string;
}
