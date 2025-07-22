const LABELS = {
  pages: {
    example: {
      title: 'Example',
      description: 'This is an example page',
      link: '/example',
    },
  },
  navigation: {
    home: 'Home',
    classes: 'Classes',
    cafe: 'Cafe',
    messages: 'Messages',
    profile: 'Profile',
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
