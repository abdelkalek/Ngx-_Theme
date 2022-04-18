import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import {NbCardModule, NbIconModule} from "@nebular/theme";
import { SmartTableComponent } from './smart-table/smart-table.component';
import {Ng2SmartTableModule} from "ng2-smart-table";
import {NbEvaIconsModule} from "@nebular/eva-icons";


@NgModule({
    declarations: [
        ForbiddenComponent,
        BreadcrumbComponent,
        SmartTableComponent,

    ],
  exports: [
    BreadcrumbComponent,
    SmartTableComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    NbCardModule,
    Ng2SmartTableModule,
    NbEvaIconsModule,
    NbIconModule
  ]
})
export class SharedModule { }
