import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MachinesService} from "../machines.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NUMERIC_PATTREN} from "../../../product-module/add-product/add-product.component";

@Component({
  selector: 'app-update-machine',
  templateUrl: './update-machine.component.html',
  styleUrls: ['./update-machine.component.scss']
})
export class UpdateMachineComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private machineService: MachinesService
  ) {
  }

  id: string | null | undefined

  updateMachine = new FormGroup({
    id:  new FormControl(),
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
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      console.log(this.id)
    });
  }


  submit() {
    this.updateMachine.controls['id'].setValue(this.id)
    console.log(this.updateMachine.getRawValue())
  }
}
