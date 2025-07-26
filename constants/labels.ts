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
    header: 'Maximimize Your Fitness',
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
  metadata: {
    app: {
      title: 'Title',
      description: 'Description',
    },
    member: {
      title: 'Title',
      description: 'Description',
    },
  },
} as const;

export default LABELS;
