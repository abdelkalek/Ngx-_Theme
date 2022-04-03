import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import {NbCardModule} from "@nebular/theme";


@NgModule({
    declarations: [
        ForbiddenComponent,
        BreadcrumbComponent
    ],
    exports: [
        BreadcrumbComponent
    ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    NbCardModule
  ]
})
export class SharedModule { }
