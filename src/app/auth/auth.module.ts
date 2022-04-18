import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgxAuthRoutingModule } from './auth-routing.module';
import { NbAuthModule, NbDummyAuthStrategy } from '@nebular/auth';
import {
  NbActionsModule,
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule, NbFormFieldModule, NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbSpinnerModule,
} from '@nebular/theme';
import { AuthComponent } from './auth.component';
import {HttpClientModule} from "@angular/common/http";
import {ThemeModule} from "../@theme/theme.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        NbAlertModule,
        NbInputModule,
        NbButtonModule,
        NbCheckboxModule,
        NgxAuthRoutingModule,
        NbSpinnerModule,
        NbCardModule,
        NbLayoutModule,
        HttpClientModule,

        NbAuthModule.forRoot({
            strategies: [
                NbDummyAuthStrategy.setup({
                    name: 'email',
                    delay: 3000,
                }),
            ],
            forms: {
                validation: {
                    password: {
                        required: true,
                        minLength: 6,
                        maxLength: 42,
                    },
                    email: {
                        required: true,
                    },
                },
            },
        }),
        NbIconModule,
        NbActionsModule,
        NbFormFieldModule,
        ReactiveFormsModule,
        ThemeModule,
    ],
  declarations: [
    // ... here goes our new components
    AuthComponent,
    LoginComponent,
  ],
})
export class NgxAuthModule {}
