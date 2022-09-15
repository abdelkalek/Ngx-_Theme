import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import {AddUsersComponent} from "./add-users/add-users.component";
import {UserprofileComponent} from "./userprofile/userprofile.component";
import {ListuserComponent} from "./listuser/listuser.component";
import {AccessRolesComponent} from "./access-roles/access-roles.component";
import {AccessPermissionComponent} from "./access-permission/access-permission.component";
import {AccuielComponent} from "./accuiel/accuiel.component";
import {DetailsUtilisateurComponent} from "./details-utilisateur/details-utilisateur.component";
import {ModifierUtilisateurComponent} from "./modifier-utilisateur/modifier-utilisateur.component";

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        component: AccuielComponent
      },
      {
        path: 'adduser',
        component: AddUsersComponent
      },
      {
        path: 'profile',
        component: UserprofileComponent
      },
      {
        path: 'users',
        component: ListuserComponent
      }, {
        path: 'DetailsUtilisateur/:id',
        component: DetailsUtilisateurComponent
      }
      , {
        path: 'ModifierUtilisateur/:id',
        component: ModifierUtilisateurComponent
      },
      {
        path: 'Roles',
        component: AccessRolesComponent
      },
      {
        path: 'AccessPermission',
        component: AccessPermissionComponent
      },
      {
        path: 'produits',
        loadChildren: () =>
          import('../product-module/product-module.module').then((m) => m.ProductModuleModule)
      },
      {
        path: 'no',
        loadChildren: () =>
          import('../nomenclature/nomenclature.module').then((m) => m.NomenclatureModule)
      },
      { path: '', redirectTo: 'pages', pathMatch: 'full' },
      { path: '**', redirectTo: 'pages' },
    ]
  }



  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
