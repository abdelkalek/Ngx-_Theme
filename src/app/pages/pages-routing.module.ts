import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import {AddUsersComponent} from "./add-users/add-users.component";
import {UserprofileComponent} from "./userprofile/userprofile.component";
import {ListuserComponent} from "./listuser/listuser.component";
import {AccessRolesComponent} from "./access-roles/access-roles.component";
import {AccessPermissionComponent} from "./access-permission/access-permission.component";

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        component: AddUsersComponent
      },
      {
        path: 'profile',
        component: UserprofileComponent
      },
      {
        path: 'users',
        component: ListuserComponent
      },
      {
        path: 'AccessRoles',
        component: AccessRolesComponent
      },
      {
        path: 'AccessPermission',
        component: AccessPermissionComponent
      }
      ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
