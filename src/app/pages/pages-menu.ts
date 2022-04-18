import {NbMenuItem} from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'monitor-outline',
    group: true,
    home: true
  },
  {
    title: 'Profile',
    icon: 'person',
    badge: {
      text: '30',
      status: 'primary',
    },
    children: [
      {
        title: 'Profile',
        icon: 'person-done-outline',
        link: '/pages/profile',
      },
      {
        title: 'Messages',
        icon: 'message-circle-outline',
        badge: {
          text: '99+',
          status: 'danger',
        },
      },
      {
        title: 'Notifications',
        icon:'bell-outline',
        badge: {
          dotMode: true,
          status: 'warning',
        },
      },
      {
        title: 'Emails',
        icon:'email-outline',
        badge: {
          text: 'new',
          status: 'success',
        },
      },
    ],
  },

  {
    title: 'User Management',
    icon: 'people-outline',
    children: [
      {
        title: 'Users',
        link: '/pages/users',
        icon: 'people-outline'

      },
      {
        title: 'Add User',
        link: '/pages/adduser',
        icon: 'person-add-outline'

      },
      {
        title: 'Roles & Permission',
        link: '',
        icon: 'shield-outline',
        children :[
          {
            title: ' Roles',
            link: '/pages/Roles',
            icon: 'unlock-outline'

          },
          {
            title: 'Permission ',
            link: '/pages/AccessPermission',
            icon: 'keypad-outline'
          }
        ]
      }
     ,
      {
        title: 'Config',
        pathMatch: 'prefix',
        link: '/pages/layout/tabs',
        icon: 'settings-2-outline'
      },
    ],
  },
  {
    title: 'Manage products',
    icon: 'cube-outline',
    children: [
      {
        title: 'Add products',
        link: '/pages/forms/inputs',
        icon: 'shopping-bag-outline'

      },
      {
        title: 'Products List ',
        link: '/pages/forms/layouts',
        icon: 'list-outline'
      }
    ],
  },
  {
    title: 'Category management',
    icon: 'pantone-outline',

    children: [
      {
        title: 'Add Category',
        link: '/pages/forms/inputs',
        icon: 'clipboard-outline'

      },
      {
        title: 'Category List ',
        link: '/pages/forms/layouts',
        icon: 'list-outline'
      }
    ],
  },

  {
    title: 'Config production lines',
    icon: 'activity-outline',
    children: [
      {
        title: 'Config prod lines',
        link: '/pages/forms/inputs',
        icon: 'options-outline'
      }
    ],

  },

  {
    title: 'Config of expense items',
    icon: 'monitor-outline',
    children: [
      {
        title: 'Add products',
        link: '/pages/forms/inputs',
        icon: 'shopping-bag-outline'

      },
      {
        title: 'Products List ',
        link: '/pages/forms/layouts',
        icon: 'list-outline'
      }
    ],

  },

  {
    title: 'Resource management',
    // icon: { icon: 'trending-up-outline', pack: 'font-awesome' },
    icon: 'trending-up-outline',
    children: [
      {
        title: 'Config ',
        link: '/pages/forms/inputs',
        icon: 'start'

      },
      {
        title: 'Products List ',
        link: '/pages/forms/layouts',
        icon: 'list-outline'
      }
    ],

  },

  {
    title: 'Produ order management',
    icon: 'layers-outline',
    children: [
      {
        title: 'Config',
        link: '/pages/forms/inputs',
        icon: 'shopping-bag-outline'

      },
      {
        title: 'Products List ',
        link: '/pages/forms/layouts',
        icon: 'list-outline'
      }
    ],

  },

];
