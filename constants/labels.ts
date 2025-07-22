const LABELS = {
  // App branding
  app: {
    name: 'Smart Gym',
  },
  
  // Navigation
  nav: {
    auth: {
      login: 'Login',
    },
  },

  pages: {
    example: {
      title: 'Example',
      description: 'This is an example page',
      link: '/example',
    },
  },
} as const;

export default LABELS;