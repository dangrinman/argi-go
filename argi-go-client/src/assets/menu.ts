export const listMenu = [
  {
    text: 'Create words',
    icon: 'edit_note',
    children: [
      {
        text: 'Doushi',
        icon: '',
        routerLink: '/doushi-creation',
      },
      {
        text: 'Keiyoushi',
        icon: '',
        routerLink: '/keiyoushi-creation',
      },
      {
        text: 'Meishi',
        icon: '',
        routerLink: '/meishi-creation',
      },
      {
        text: 'Fukushi',
        icon: '',
        routerLink: '/fukushi-creation',
      },
    ],
  },
  {
    text: 'Create resource',
    icon: 'file_copy',
    children: [
      {
        text: 'Book',
        icon: '',
        routerLink: '/book-creation',
      },
      {
        text: 'Chapter',
        icon: '',
        routerLink: '/chapter-creation',
      },
      {
        text: 'Exam',
        icon: '',
        routerLink: '/exam-creation',
      },
    ],
  },
  {
    text: 'Guess',
    icon: 'analytics',
    routerLink: '/guess-words',
  },
];
