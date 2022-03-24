import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import {
    NbActionsModule,
    NbAlertModule, NbButtonModule,
    NbCardModule, NbDatepickerModule,
    NbIconModule, NbInputModule, NbListModule,
    NbMenuModule,
    NbStepperModule, NbTabsetModule, NbTimepickerModule, NbUserModule
} from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import {ReactiveFormsModule} from "@angular/forms";
import {AddUsersComponent} from "./add-users/add-users.component";
import { ConfigusersComponent } from './configusers/configusers.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { ListuserComponent } from './listuser/listuser.component';

@NgModule({
  declarations: [PagesComponent, AddUsersComponent, ConfigusersComponent, UserprofileComponent, ListuserComponent],
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
        NbInputModule,
        NbUserModule,
        NbTabsetModule,
        NbListModule

    ],
})
export class PagesModule {}
