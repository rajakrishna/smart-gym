import { LayoutDashboard, LogIn, Dumbbell, Home, Calendar, Coffee, MessageSquare, User } from 'lucide-react';

const ICONS = {
  // Layout icons
  layoutDashboard: LayoutDashboard,
  home: Home,
  calendar: Calendar,
  coffee: Coffee,
  messageSquare: MessageSquare,
  user: User,
  login: LogIn,
  
  // Content icons
  dumbbell: Dumbbell,
} as const;

export default ICONS;
