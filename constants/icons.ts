import {
  BarChart3,
  Bell,
  BellDot,
  Calendar,
  Clock,
  Coffee,
  CreditCard,
  DollarSign,
  Dumbbell,
  Edit,
  Filter,
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
  RotateCcw,
  ScanBarcode,
  Search,
  Send,
  Sheet,
  ToolCase,
  Tag,
  Trash2,
  User,
  UserCircle,
  Users,
  X,
  XCircle,
  Activity,
  UserPlus,
  BarChart,
  PieChart,
  ShieldCheck, 
  LogOutIcon,
} from 'lucide-react';

const ICONS = {
  // Layout icons
  layoutDashboard: LayoutDashboard,
  home: Home,
  logOut:LogOutIcon,
  calendar: Calendar,
  coffee: Coffee,
  messageSquare: MessageSquare,
  user: User,
  login: LogIn,
  // Gym Logo icons
  dumbbell: Dumbbell,
  construction:ToolCase,
  phone:Phone,
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
  adminAnalyticsStats: {
    totalMembers: Users,
    revenue: DollarSign,
    activeUsers: Activity, 
    newUsers: UserPlus,
  },
  adminAnalyticsCharts: {
    membershipGrowth: BarChart,
    classAttendence: BarChart,
    targetRevenue: PieChart, 
    activeGymHours: Clock
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

  // Member dashboard icons
  member: {
    bellDot: BellDot,
    scanBarcode: ScanBarcode,
  },
memberProfile: {
    memberDetails: User,
    paymentMethod: CreditCard,
    notifications: Bell,
    checkinHistory: ShieldCheck,
    classHistory: Calendar,
    inviteFriends: Users, 
    userIcon: UserCircle
  },
  // AI Chat icons
  aiChat: {
    send: Send,
    reset: RotateCcw,
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
    edit: Edit,
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
