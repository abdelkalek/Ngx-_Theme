import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import {
    NbAccordionModule,
    NbActionsModule,
    NbAlertModule, NbButtonModule,
    NbCardModule, NbDatepickerModule, NbDialogModule,
    NbIconModule, NbInputModule, NbLayoutModule, NbListModule,
    NbMenuModule, NbSelectModule,
    NbStepperModule, NbTableModule, NbTabsetModule, NbTimepickerModule, NbToggleModule, NbUserModule
} from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AddUsersComponent} from "./add-users/add-users.component";
import { ConfigusersComponent } from './configusers/configusers.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { ListuserComponent } from './listuser/listuser.component';
import { AccessRolesComponent } from './access-roles/access-roles.component';
import { AccessPermissionComponent } from './access-permission/access-permission.component';
import { AddRoleComponent } from './access-roles/add-role/add-role.component';
import { UpdateRoleComponent } from './access-roles/update-role/update-role.component';
import { AddPermissionComponent } from './access-permission/add-permission/add-permission.component';
import {SharedModule} from "../shared/shared.module";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {NbEvaIconsModule} from "@nebular/eva-icons";
import {BreadcrumbModule} from "xng-breadcrumb";
import { AccuielComponent } from './accuiel/accuiel.component';

@NgModule({
  declarations: [PagesComponent,
    AddUsersComponent,
    ConfigusersComponent,
    UserprofileComponent,
    ListuserComponent,
    AccessRolesComponent,
    AccessPermissionComponent,
    AddRoleComponent,
    UpdateRoleComponent,
    AddPermissionComponent,
    AccuielComponent,


  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    ReactiveFormsModule,
    NbStepperModule,
    NbCardModule,
    NbIconModule,
    NbActionsModule,
    NbAlertModule,
    NbDatepickerModule,
    NbButtonModule,
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbTimepickerModule.forRoot(),
    NbDialogModule.forRoot(),

    NbInputModule,
    NbUserModule,
    NbTabsetModule,
    NbListModule,
    NbSelectModule,
    NbSelectModule,
    NbTableModule,
    SharedModule,
    Ng2SmartTableModule,
    NbEvaIconsModule,
    NbIconModule,
    BreadcrumbModule,
    NbAccordionModule,
    NbLayoutModule,
    NbToggleModule,
    FormsModule
  ],
})
export class PagesModule {}
