const LABELS = {
  // App branding
  app: {
    name: 'FITMAX',
  },

  // Navigation
  nav: {
    auth: {
      login: 'Admin',
    },
  },

  auth: {
    loginForm: {
      title: 'Login to your account',
      description: 'Enter your email below to login to your account',
      emailLabel: 'Email address',
      emailPlaceholder: 'm@example.com',
      passwordLabel: 'Password',
      forgotPassword: 'Forgot your password?',
      submitButton: 'Login',
      submitLabel: 'Submit Login Form',
    },
  },

  hero: {
    header: 'Maximize Your Fitness',
    subHeader1: 'A Revolutionary',
    span: 'AI',
    subHeader2: 'Fitness App',
    button1: 'Contact',
    href1: '#contact',
    button2: 'Member Login',
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
  mobileView: {
    banner: 'Please use a mobile device to view this page',
    sub: 'This experience is designed for mobile devices only.'
  },
  memberDash: {
    firstName: 'John',
    imageURL: '/assets/p1.png',
    greeting: 'Hello there,',
    profileHref: '/member/profile',
    schedule: {
      waitlistHead: 'Waitlisted Classes',
      scheduleHead: 'Your Scheduled Classes',
      noReturns: 'You have no classes scheduled',
      status1: 'Waitlisted',
      status2: 'Confirmed',
      button: 'Cancel'

    }
  },

  cafeMenu: {
    header: 'Cafe Menu',
    calories: 'Calories:',
  },

  // Modals
  modals: {
    sendMessage: {
      title: 'Send Message',
      description: 'Send a message to a gym member via their preferred communication method.',
      labels: {
        recipient: 'Recipient',
        subject: 'Subject',
        messageType: 'Message Type',
        deliveryMethod: 'Delivery Method',
        messageBody: 'Message Body',
        selected: 'Selected:',
        characters: 'characters',
      },
      placeholders: {
        loadingUsers: 'Loading users...',
        selectRecipient: 'Select a recipient',
        enterSubject: 'Enter message subject',
        selectMessageType: 'Select message type',
        selectDeliveryMethod: 'Select delivery method',
        enterMessage: 'Enter your message...',
      },
      buttons: {
        cancel: 'Cancel',
        sendMessage: 'Send Message',
        sending: 'Sending...',
      },
      messageTypes: {
        classReminder: {
          value: 'class reminder',
          label: 'Class Reminder',
        },
        classCancellation: {
          value: 'class cancellation',
          label: 'Class Cancellation',
        },
        general: {
          value: 'general',
          label: 'General',
        },
        administrative: {
          value: 'administrative',
          label: 'Administrative',
        },
        invoice: {
          value: 'invoice',
          label: 'Invoice',
        },
      },
      deliveryMethods: {
        email: {
          value: 'email',
          label: 'Email',
        },
        sms: {
          value: 'sms',
          label: 'SMS',
        },
        push: {
          value: 'push',
          label: 'Push Notification',
        },
      },
      toasts: {
        missingFields: 'Please fill in all required fields',
        success: 'Message sent successfully!',
        loadUsersError: 'Failed to load users',
        loadUsersErrorGeneric: 'Error loading users',
        sendError: 'Failed to send message',
        sendErrorGeneric: 'Error sending message',
      },
      colors: {
        deliveryMethods: {
          email: 'bg-blue-500',
          sms: 'bg-green-500',
          push: 'bg-yellow-500',
          default: 'bg-gray-500',
        },
      },
    },
    editMember: {
      title: 'Edit Member',
      description: "Edit the member's details",
      labels: {
        membershipType: 'Membership Type',
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email',
        phone: 'Phone',
        membershipStatus: 'Membership Status',
      },
      placeholders: {
        selectMembershipType: 'Select Membership Type',
        enterFirstName: 'First Name',
        enterLastName: 'Last Name',
        enterEmail: 'Email',
        enterPhone: 'Phone',
        selectMembershipStatus: 'Select Membership Status',
      },
      membershipTypes: {
        basic: {
          value: 'basic',
          label: 'Basic',
        },
        premium: {
          value: 'premium',
          label: 'Premium',
        },
      },
      membershipStatuses: {
        active: {
          value: 'active',
          label: 'Active',
        },
        inactive: {
          value: 'inactive',
          label: 'Inactive',
        },
      },
      buttons: {
        cancel: 'Cancel',
        saveChanges: 'Save Changes',
        saving: 'Saving...',
      },
    },
    barCodeModal: {
      title: 'Scan Barcode',
      description: 'Scan the barcode to check in or out of the gym',
      scanButton: 'Scan',
    },
  },

  pages: {
    example: {
      title: 'Example',
      description: 'This is an example page',
      link: '/example',
    },
    member_profile: {
      header: 'profile',
      name: 'member name',
      menu: {
        memberDetails: 'member details',
        paymentMethod: 'payment method',
        notifications: 'notifications',
        checkinHistory: 'check-in history',
        classHistory: 'fitness class history',
        inviteFriends: 'invite friends',
        userIcon: 'user icon',
        logout: '',
      },
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
      badges: {
        checkedIn: 'Checked In',
        checkedOut: 'Checked Out',
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
          subject: 'subject',
          createdAt: 'createdAt',
        },
        header: {
          from: 'From',
          messageType: 'Message Type',
          subject: 'Subject',
          createdAt: 'Created At',
        },
      },
      buttons: {
        createMessage: 'Create Message',
      },
    },
    admin_member_detail: {
      headers: {
        memberDetails: 'Member Details',
        checkInHistory: 'Check-In History',
        classesTaken: 'Classes Taken',
        pastInvoices: 'Past Invoices',
      },
      labels: {
        membershipType: 'Membership Type',
        age: 'Age',
        email: 'Email',
        phone: 'Phone',
        memberSince: 'Member Since',
        status: 'Status',
        instructor: 'Instructor',
        checkedIn: 'Checked In',
        checkedOut: 'Checked Out',
      },
      buttons: {
        edit: 'Edit',
        delete: 'Delete',
      },
      statuses: {
        completed: 'completed',
        upcoming: 'upcoming',
        cancelled: 'cancelled',
        paid: 'paid',
        pending: 'pending',
        overdue: 'overdue',
        active: 'Active',
        inactive: 'Inactive',
      },
    },
    admin_cafe: {
      tabs: {
        cafe: 'Cafe',
        transactions: 'Transactions',
      },
      buttons: {
        addProduct: 'Add Product',
      },
      modal: {
        create: {
          title: 'Create New Product',
          description: 'Add a new product to your cafe inventory',
          submitButton: 'CREATE',
        },
        edit: {
          title: 'Edit Product',
          description: 'Edit the product details',
          submitButton: 'UPDATE',
        },
        labels: {
          productName: 'Product Name',
          description: 'Description',
          category: 'Category',
          imageUrl: 'Image URL',
          sku: 'SKU',
          stockQuantity: 'Stock Quantity',
          minQuantity: 'Minimum Quantity',
          regularPrice: 'Regular Price',
          needsRestock: 'Needs Restock',
        },
        placeholders: {
          productName: 'Enter product name',
          description: 'Enter product description',
          imageUrl: 'Enter image URL',
          sku: 'e.g., SKU-390128',
          stockQuantity: 'e.g., 100',
          minQuantity: 'e.g., 5',
          regularPrice: 'e.g., 15.99',
          selectCategory: 'Select a category',
        },
        categories: [
          { value: 'cafe', label: 'Cafe' },
          { value: 'drink', label: 'Drink' },
          { value: 'snack', label: 'Snack' },
          { value: 'protein_bar', label: 'Protein Bar' },
        ],
        buttons: {
          cancel: 'CANCEL',
          deactivate: 'DEACTIVATE',
        },
        validation: {
          failed: 'Validation failed',
          checkFields: 'Please check all required fields and fix any errors',
        },
        toasts: {
          creating: 'Creating new product...',
          updating: 'Updating product...',
          deactivating: 'Deactivating product...',
          createSuccess: 'Product created successfully!',
          updateSuccess: 'Product updated successfully!',
          deactivateSuccess: 'Product deactivated successfully!',
          createFailed: 'Creation failed',
          updateFailed: 'Update failed',
          deactivateFailed: 'Deactivation failed',
          addedToInventory: 'has been added to your inventory',
          updated: 'has been updated',
          removedFromInventory: 'has been removed from active inventory',
          referencedInOrders: 'Product referenced in orders',
          cannotDelete: 'Cannot delete this product as it has been ordered. The product has been deactivated instead.',
        },
      },
      productCard: {
        price: 'Price',
        description: 'Description',
        sales: 'Sales',
        remainingStock: 'Remaining Stock',
        edit: 'Edit',
      },
      columns: {
        accessorKeys: {
          orderID: 'orderID',
          orderDate: 'orderDate',
          customerName: 'customerName',
          amountPaid: 'amountPaid',
        },
        header: {
          orderID: 'Order ID',
          orderDate: 'Order Date',
          customerName: 'Customer Name',
          amountPaid: 'Amount Paid',
        },
      },
    },
    admin_analytics: {
      totalMembers: 'total members', 
      revenue: 'revenue', 
      activeUsers: 'active users',
      newUsers: 'new users',
      membershipGrowth: 'membership growth', 
      classAttendance: 'class attendence', 
      targetRevenue: 'target revenue',
      activeGymHours: 'active gym hours'
    }
  },

  // AI Chat labels
  aiChat: {
    title: 'Fitness Assistant',
    subtitle: 'Your personal trainer & nutrition guide',
    placeholder: 'Ask about workouts, nutrition, or fitness advice...',
    errorMessage: "Sorry, I'm having trouble connecting right now. Please try again later.",
    promptsHeading: 'Try asking:',
    screenReaderLabels: {
      sendMessage: 'Send message',
      resetChat: 'Reset chat',
    },
    resetTooltip: 'Reset chat',
  },

  navigation: {
    home: 'Home',
    classes: 'Classes',
    cafe: 'Cafe',
    messages: 'Messages',
    aiCoach: 'AI Coach',
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
    dashboard: {
      classesToday: {
        title: 'Classes Today',
        capacity: 'Capacity:',
        coach: 'Coach:',
        scheduledAt: 'Scheduled at',
        editButton: 'Edit',
      },
      topCafePurchases: {
        title: 'Top Cafe Purchases',
        unitsSold: 'Units Sold:',
      },
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
        editClass: 'Edit Class',
        addClass: 'Add Class',
        allClasses: 'View All Classes',
        filterByCoach: 'Filter by Coach',
        showAllClasses: 'Show All Classes',
        selectedLabel: 'Selected:',
        filteredLabel: 'Filtered by:',
        noClasses: 'No classes scheduled for this date',
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
      title: 'Fitmax',
      description: 'Description',
    },
    member: {
      avatarFallback: 'CN',
      title: 'Fitmax',
      description: 'Description',
    },
  },
} as const;

export default LABELS;
