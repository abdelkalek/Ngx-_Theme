import {NbMenuItem} from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Accueil',
    icon: {icon: 'bar-chart-outline'},
    home: true,
    link: '/pages',
  },
  {
    title: 'Mon Compte',
    icon: {icon: 'person-done-outline'},

    children: [
      {
        title: 'Profile',
        icon: 'person-outline',
        link: '/pages/profile',
      }/*,
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
        icon: 'bell-outline',
        badge: {
          dotMode: true,
          status: 'warning',
        },
      },
      {
        title: 'Emails',
        icon: 'email-outline',
        badge: {
          text: 'new',
          status: 'success',
        },
      },*/
    ],
  },

  {
    title: 'Utilisateurs',
    icon: {icon: 'people-outline'},
    children: [
      {
        title: 'Consulter les utilisateurs',
        link: '/pages/users',
        icon: 'list-outline'

      },
      {
        title: 'Ajouter des utilisateurs',
        link: '/pages/adduser',
        icon: 'person-add-outline'

      },
      {
        title: 'Rôles et permissions',
        link: '',
        icon: 'shield-outline',
        children: [
          {
            title: ' Roles',
            link: '/pages/Roles',
            icon: 'unlock-outline'

          },
          {
            title: 'Perso.. du rôle',
            link: '/pages/AccessPermission',
            icon: 'settings-2-outline'
          }
        ]
      }

    ],
  },
  {
    title: 'Produits',
    icon: {icon: 'pricetags-outline'},
    children: [
      {
        title: 'Consulter les Produits  ',
        link: '/pages/produits',
        //   icon: {icon: 'boxes-stacked', pack: 'font-awesome'},
      },
      {
        title: 'Ajouter Produit  ',
        link: '/pages/produits/Ajouter',
        //   icon: {icon: 'boxes-stacked', pack: 'font-awesome'},
      },
      {
        title: 'Catégories',
        link: '/pages/produits/Catégorie',
   //     icon: {icon: 'pantone-outline'},
      },
      {
        title: 'Propriétés',
        link: '/pages/produits/Propriété',
 //       icon: {icon: 'attach-outline'},
      },
      {
        title: 'Fournisseurs',
        link: '/pages/produits/fournisseur',
        //    icon: {icon: 'pricetags'},
      },
      {
        title: 'Lot',
        link: '/pages/product',
        //    icon: {icon: 'pricetags'},
      },

      {
        title: 'Factures',
        link: '/pages/product',
        //    icon: {icon: 'pricetags'},
      },

    ],
  },
  {
    title: 'Machines',
    icon: 'options-outline',

    children: [
      {
        title: 'List des Machines',
        link: '/pages/no',
     //   icon: 'plus-circle-outline'

      },
      {
        title: 'Ajouter une machine ',
        link: '/pages/no/ajouter',
     //   icon: 'list-outline'
      },
      {
        title: 'Operation',
        link: '/pages/no/operation',
     //   icon: 'list-outline'
      }
    ]},


  {
    title: 'Fabrication',
    icon: 'activity-outline',
    children: [
      {
        title: 'Config prod lines',
        link: '/pages/forms/inputs',
        icon: 'options-outline'
      }
    ],

  }
 ,
   {
     title: 'statistique',
     icon: 'pie-chart-outline',
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

   },/*

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

   },*/

];
