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

hero:{
  header: 'Maximimize Your Fitness',
  subHeader1: 'A Revolutionary',
  span: 'AI',
  subHeader2: 'Fitness App'

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