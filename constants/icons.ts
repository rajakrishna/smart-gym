import {
  BarChart3,
  Bell,
  Calendar,
  Clock,
  Coffee,
  Dumbbell,
  EditIcon,
  Filter,
  Home,
  LayoutDashboard,
  LogIn,
  LogOut,
  MessageSquare,
  MoreVertical,
  Plus,
  Search,
  Tag,
  Trash2,
  User,
  UserCircle,
  Users,
  X,
  XCircle,
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

  adminMembersPage: {
    search: Search,
    addMember: Plus,
  },

  adminCafePage: {
    addProduct: Plus,
    editProduct: EditIcon,
  },

  // Admin User menu icons
  userMenu: {
    moreVertical: MoreVertical,
    userCircle: UserCircle,
    notifications: Bell,
    logout: LogOut,
  },

  // Class Schedules icons
  classSchedules: {
    add: Plus,
    cancel: X,
    delete: Trash2,
    time: Clock,
    coach: User,
    type: Tag,
    calendar: Calendar,
    filter: Filter,
    cancelClass: XCircle,
    users: Users,
  },
} as const;

export default ICONS;
