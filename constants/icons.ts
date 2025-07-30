import {
  BarChart3,
  Bell,
  Calendar,
  Clock,
  Coffee,
  CreditCard,
  DollarSign,
  Dumbbell,
  Edit,
  Home,
  LayoutDashboard,
  Loader2,
  LogIn,
  LogOut,
  Mail,
  MessageSquare,
  MoreVertical,
  Phone,
  Plus,
  Search,
  Send,
  Sheet,
  Trash2,
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

  adminMembersPage: {
    search: Search,
    addMember: Plus,
    editMember: Edit,
  },

  adminMessagesPage: {
    createMessage: Plus,
    messageDetail: Mail,
  },
  adminMemberDetail: {
    edit: Edit,
    delete: Trash2,
    clock: Clock,
    dollarSign: DollarSign,
    creditCard: CreditCard,
    sheet: Sheet,
  },

  adminCafePage: {
    addProduct: Plus,
    editProduct: Edit,
  },

  // Admin User menu icons
  userMenu: {
    moreVertical: MoreVertical,
    userCircle: UserCircle,
    notifications: Bell,
    logout: LogOut,
  },

  // Modal icons
  modals: {
    sendMessage: {
      send: Send,
      users: Users,
      loader: Loader2,
      deliveryMethods: {
        email: Mail,
        sms: MessageSquare,
        push: Phone,
      },
    },
  },
} as const;

export default ICONS;
