import {
  BarChart3,
  Bell,
  Calendar,
  Coffee,
  Dumbbell,
  Home,
  LayoutDashboard,
  LogIn,
  LogOut,
  MessageSquare,
  MoreVertical,
  User,
  UserCircle,
  Users,
} from 'lucide-react';

const ICONS = {
  // Layout icons
  layoutDashboard: LayoutDashboard,
  home: Home,
  calendar: Calendar,
  coffee: Coffee,
  messageSquare: MessageSquare,
  user: User,
  login: LogIn,

  // Gym Logo icons
  dumbbell: Dumbbell,

  // Admin icons
  admin: {
    dashboard: LayoutDashboard,
    messages: MessageSquare,
    analytics: BarChart3,
    classSchedules: Calendar,
    members: Users,
    cafe: Coffee,
    branding: Dumbbell,
  },

  // Admin User menu icons
  userMenu: {
    moreVertical: MoreVertical,
    userCircle: UserCircle,
    notifications: Bell,
    logout: LogOut,
  },
} as const;

export default ICONS;
