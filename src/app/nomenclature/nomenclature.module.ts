import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NomenclatureRoutingModule } from './nomenclature-routing.module';
import { ListMachinesComponent } from './list-machines/list-machines.component';
import { AjouterMachineComponent } from './list-machines/ajouter-machine/ajouter-machine.component';
import { UpdateMachineComponent } from './list-machines/update-machine/update-machine.component';
import { ListOperationsComponent } from './list-operations/list-operations.component';
import { ListComposantComponent } from './list-composant/list-composant.component';
import { ListOfComponent } from './list-of/list-of.component';
import { ListPointageComponent } from './list-pointage/list-pointage.component';
import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbContextMenuModule, NbDatepickerModule,
  NbIconModule,
  NbInputModule, NbStepperModule,
  NbTabsetModule
} from "@nebular/theme";
import {BreadcrumbModule} from "xng-breadcrumb";
import {Ng2SmartTableModule} from "ng2-smart-table";
import { DetailMachineComponent } from './list-machines/detail-machine/detail-machine.component';
import {ReactiveFormsModule} from "@angular/forms";
import { AjouterOperationComponent } from './list-operations/ajouter-operation/ajouter-operation.component';
import { UpdateOperationComponent } from './list-operations/update-operation/update-operation.component';


@NgModule({
  declarations: [
    ListMachinesComponent,
    AjouterMachineComponent,
    UpdateMachineComponent,
    ListOperationsComponent,
    ListComposantComponent,
    ListOfComponent,
    ListPointageComponent,
    DetailMachineComponent,
    AjouterOperationComponent,
    UpdateOperationComponent
  ],
  imports: [
    CommonModule,
    NomenclatureRoutingModule,
    NbIconModule,
    BreadcrumbModule,
    NbCardModule,
    NbContextMenuModule,
    Ng2SmartTableModule,
    NbTabsetModule,
    NbButtonModule,
    ReactiveFormsModule,
    NbInputModule,
    NbAlertModule,
    NbStepperModule,
    NbDatepickerModule
  ]
})
export class NomenclatureModule { }
