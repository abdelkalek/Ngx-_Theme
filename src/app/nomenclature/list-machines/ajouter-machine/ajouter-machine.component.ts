import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MachinesService} from "../machines.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NUMERIC_PATTREN} from "../../../product-module/add-product/add-product.component";

@Component({
  selector: 'app-ajouter-machine',
  templateUrl: './ajouter-machine.component.html',
  styleUrls: ['./ajouter-machine.component.scss']
})
export class AjouterMachineComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private machineService: MachinesService
  ) {
  }

ajouterMachine = new FormGroup({
    nom:  new FormControl('',[ Validators.minLength(4),Validators.required]),
    reference:  new FormControl('',[ Validators.minLength(6),Validators.required]),
    description:  new FormControl('',[ Validators.required]),
    prix:  new FormControl('',[ Validators.required,Validators.pattern(NUMERIC_PATTREN)]),
    taux_am:  new FormControl('',[Validators.minLength(1),  Validators.required,Validators.pattern(NUMERIC_PATTREN)]),
    nb_anne_am: new FormControl('',[ Validators.minLength(1),Validators.pattern(NUMERIC_PATTREN)]),
    date_panne:  new FormControl('',[  Validators.required]),
    cout_font: new FormControl('',[ Validators.required,Validators.pattern(NUMERIC_PATTREN)]),
    cout_reglage:  new FormControl('',[ Validators.required,Validators.pattern(NUMERIC_PATTREN)]),

  });


  ngOnInit(): void {
  }


  submit() {

    console.log(this.ajouterMachine.getRawValue())
  }
}
