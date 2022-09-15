import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ListMachinesComponent} from "./list-machines/list-machines.component";
import {DetailMachineComponent} from "./list-machines/detail-machine/detail-machine.component";
import {UpdateMachineComponent} from "./list-machines/update-machine/update-machine.component";
import {AjouterMachineComponent} from "./list-machines/ajouter-machine/ajouter-machine.component";
import {ListOperationsComponent} from "./list-operations/list-operations.component";

const routes: Routes = [

  {
    path: '',
    component: ListMachinesComponent,

  },
  {
    path: 'machine/:id',
    component: DetailMachineComponent
  },
  {
    path: 'u/:id',
    component: UpdateMachineComponent
  },
  {
    path: 'ajouter',
    component: AjouterMachineComponent
  },
  {
    path: 'operation',
    component: ListOperationsComponent,

  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NomenclatureRoutingModule {
}
