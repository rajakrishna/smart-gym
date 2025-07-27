const LABELS = {
  // App branding
  app: {
    name: 'FITMAX',
  },

  // Navigation
  nav: {
    auth: {
      login: 'Login',
    },
  },

  hero: {
    header: 'Maximize Your Fitness',
    subHeader1: 'A Revolutionary',
    span: 'AI',
    subHeader2: 'Fitness App',
    button1: 'Contact',
    href1: '#contact',
    button2: 'Login',
    href2: '#login',
    button3: 'Watch Demo',
    href3: '#demo',
  },

  marquee: {
    value1: '400+',
    label1: 'Nationwide Gyms',
    value2: '20K',
    label2: 'Gym Members',
    value3: 'Ai',
    label3: 'Driven-Experience',
    value4: '$40B',
    label4: 'Payments Processed',
  },

    memberDash:{
    firstName: "John",
    imageURL: "/assets/p1.png",
    greeting: "Hello there,",
    profileHref:"/member/profile"
  },

    cafeMenu:{
      header: "Cafe Menu",
      calories: "Calories:"
    }
  ,
  
  pages: {
    example: {
      title: 'Example',
      description: 'This is an example page',
      link: '/example',
    },
    admin_members: {
      columns: {
        accessorKeys: {
          memberName: 'memberName',
          memberEmail: 'memberEmail',
          memberPhone: 'memberPhone',
          memberCheckedInStatus: 'memberCheckedInStatus',
        },
        header: {
          memberName: 'Member Name',
          memberEmail: 'Member Email',
          memberPhone: 'Member Phone',
          memberCheckedInStatus: 'Member Checked In Status',
        },
      },
      buttons: {
        addMember: 'Add Member',
        searchMembers: 'Search Members',
      },
    },
    admin_messages: {
      columns: {
        accessorKeys: {
          from: 'from',
          messageType: 'messageType',
          message: 'message',
          createdAt: 'createdAt',
        },
        header: {
          from: 'From',
          messageType: 'Message Type',
          message: 'Message',
          createdAt: 'Created At',
        },
      },
      buttons: {
        createMessage: 'Create Message',
      },
    },
  },
  navigation: {
    home: 'Home',
    classes: 'Classes',
    cafe: 'Cafe',
    messages: 'Messages',
    profile: 'Profile',
  },
  // Admin navigation
  admin: {
    navigation: {
      dashboard: 'Dashboard',
      messages: 'Messages',
      analytics: 'Analytics',
      classSchedules: 'Class Schedules',
      members: 'Members',
      cafe: 'Cafe',
    },
  },

  // Class Schedules
  classSchedules: {
    page: {
      title: 'Class Schedules',
      sidebar: {
        coaches: 'Coaches',
      },
      calendar: {
        goToToday: 'Go to today',
      },
      classes: {
        title: 'Classes for',
        addClass: 'Add Class',
        filterByCoach: 'Filter by Coach',
        showAllClasses: 'Show All Classes',
        selectedLabel: 'Selected:',
        filteredLabel: 'Filtered by:',
        noClasses: 'No classes scheduled for this date',
        noClassesFiltered: 'No classes found for',
        noClassesFilteredSubtext: 'on this date',
        showAllHint: 'Click "Show All Classes" to see all scheduled classes',
        coachLabel: 'Coach:',
      },
      months: {
        january: 'January',
        february: 'February',
        march: 'March',
        april: 'April',
        may: 'May',
        june: 'June',
        july: 'July',
        august: 'August',
        september: 'September',
        october: 'October',
        november: 'November',
        december: 'December',
      },
    },
    modals: {
      addClass: {
        title: 'Add New Class',
        description: 'Create a new class for',
        fields: {
          title: 'Class Title',
          titlePlaceholder: 'e.g., Morning Yoga',
          coach: 'Coach',
          coachPlaceholder: 'Select a coach',
          type: 'Class Type',
          typePlaceholder: 'Select class type',
          time: 'Start Time',
          duration: 'Duration (minutes)',
        },
        durations: {
          30: '30 minutes',
          45: '45 minutes',
          60: '60 minutes',
          90: '90 minutes',
          120: '120 minutes',
        },
        buttons: {
          cancel: 'Cancel',
          add: 'Add Class',
        },
      },
      cancelClass: {
        title: 'Cancel Class',
        description: 'Are you sure you want to cancel',
        details:
          'This will cancel the class for this specific date but keep it in the recurring schedule. Members will be notified of the cancellation.',
        buttons: {
          keep: 'Keep Class',
          cancel: 'Cancel Class',
        },
      },
      deleteClass: {
        title: 'Delete Class',
        description: 'Are you sure you want to permanently delete',
        details: 'This action cannot be undone and will remove the class from the schedule permanently.',
        buttons: {
          cancel: 'Cancel',
          delete: 'Delete Class',
        },
      },
    },
  },
  metadata: {
    app: {
      title: 'Title',
      description: 'Description',
    },
    member: {
      avatarFallback: 'CN',
      title: 'Title',
      description: 'Description',
    },
  },
} as const;

export default LABELS;
