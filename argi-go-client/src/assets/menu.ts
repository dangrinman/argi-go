export const listMenu = [
  {
    text: 'Games',
    icon: 'videogame_asset',
    children: [
      {
        text: 'Guess words',
        icon: '',
        routerLink: '/guess-words',
      },
      {
        text: 'Guess Kei',
        icon: '',
        routerLink: '/guess-kei',
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
    text: 'Lists',
    icon: 'list',
    children: [
      {
        text: 'Doushi',
        icon: '',
        routerLink: '/doushi-grid',
      },
      {
        text: 'Keiyoushi',
        icon: '',
        routerLink: '/keiyoushi-grid',
      },
      {
        text: 'Meishi',
        icon: '',
        routerLink: '/meishi-grid',
      },
      {
        text: 'Fukushi',
        icon: '',
        routerLink: '/fukushi-grid',
      },
    ],
  },
];
