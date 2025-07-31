import { CheckInHistory, ClassTaken, Invoice, Member } from '@/types/shared';

// Mock data for Member Detail Page - In a real app, this would come from an API
export const mockMember: Member = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '1234567890',
  age: 25,
  membershipType: 'Basic',
  memberSince: '2021-01-01',
  memberShipStatus: 'Active',
  image: '',
};

export const mockCheckInHistory: CheckInHistory[] = [
  { id: 1, date: '2024-01-15', time: '09:30 AM', status: 'checked-in' },
  { id: 2, date: '2024-01-15', time: '11:45 AM', status: 'checked-out' },
  { id: 3, date: '2024-01-14', time: '08:15 AM', status: 'checked-in' },
  { id: 4, date: '2024-01-14', time: '10:30 AM', status: 'checked-out' },
  { id: 5, date: '2024-01-13', time: '07:45 AM', status: 'checked-in' },
];

export const mockClassesTaken: ClassTaken[] = [
  {
    id: 1,
    className: 'Morning Yoga',
    instructor: 'Sarah Johnson',
    date: '2024-01-15',
    time: '10:00 AM',
    status: 'completed',
  },
  {
    id: 2,
    className: 'HIIT Training',
    instructor: 'Mike Wilson',
    date: '2024-01-14',
    time: '09:00 AM',
    status: 'completed',
  },
  { id: 3, className: 'Pilates', instructor: 'Emily Davis', date: '2024-01-16', time: '11:00 AM', status: 'upcoming' },
  {
    id: 4,
    className: 'Spin Class',
    instructor: 'David Brown',
    date: '2024-01-13',
    time: '06:30 PM',
    status: 'completed',
  },
  { id: 5, className: 'Zumba', instructor: 'Lisa Martinez', date: '2024-01-12', time: '07:00 PM', status: 'cancelled' },
];

export const mockPastInvoices: Invoice[] = [
  {
    id: 1,
    invoiceNumber: 'INV-2024-001',
    date: '2024-01-01',
    amount: 49.99,
    description: 'Monthly Membership Fee',
    status: 'paid',
  },
  {
    id: 2,
    invoiceNumber: 'INV-2023-012',
    date: '2023-12-01',
    amount: 49.99,
    description: 'Monthly Membership Fee',
    status: 'paid',
  },
  {
    id: 3,
    invoiceNumber: 'INV-2023-011',
    date: '2023-11-01',
    amount: 49.99,
    description: 'Monthly Membership Fee',
    status: 'paid',
  },
  {
    id: 4,
    invoiceNumber: 'INV-2023-010',
    date: '2023-10-01',
    amount: 49.99,
    description: 'Monthly Membership Fee',
    status: 'paid',
  },
  {
    id: 5,
    invoiceNumber: 'INV-2023-009',
    date: '2023-09-15',
    amount: 25.0,
    description: 'Personal Training Session',
    status: 'paid',
  },
];

// Additional mock data that could be useful for other admin pages
export const mockMembers: Member[] = [
  mockMember,
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '0987654321',
    age: 28,
    membershipType: 'Premium',
    memberSince: '2020-05-15',
    memberShipStatus: 'Active',
    image: '',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    phone: '5555555555',
    age: 35,
    membershipType: 'Basic',
    memberSince: '2023-03-20',
    memberShipStatus: 'Inactive',
    image: '',
  },
];
