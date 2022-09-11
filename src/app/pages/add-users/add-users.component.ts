import {Component, OnInit} from '@angular/core';
import { UsersService} from "./users.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NbComponentStatus, NbIconConfig, NbToastrService} from "@nebular/theme";
import {NUMERIC_PATTREN} from "../../product-module/add-product/add-product.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {

  addform = new FormGroup({
    cin:  new FormControl('',[ Validators.minLength(8),Validators.required,Validators.pattern(NUMERIC_PATTREN)]),
    matricule:  new FormControl('',[ Validators.minLength(6),Validators.required]),
    email:  new FormControl('',[Validators.email, Validators.required]),
    nom:  new FormControl('',[Validators.minLength(4), Validators.required]),
    prenom:  new FormControl('',[Validators.minLength(4),  Validators.required]),
    codePostal: new FormControl('',[ Validators.minLength(4), Validators.required,Validators.pattern(NUMERIC_PATTREN)]),
    adress:  new FormControl('',[Validators.minLength(4),  Validators.required]),
    ville: new FormControl('',[Validators.minLength(4),  Validators.required]),
    poste:  new FormControl('',[Validators.minLength(4),  Validators.required]),
    genre:  new FormControl('',[ Validators.required]),
    phoneNumber: new FormControl('',[Validators.minLength(8),  Validators.required,Validators.pattern(NUMERIC_PATTREN)]),
    userName: new FormControl('',[Validators.minLength(4),  Validators.required]),
    password: new FormControl('',[Validators.minLength(6),  Validators.required]),
    confirmPassword: new FormControl('',[ Validators.minLength(6), Validators.required]),
    datedeNaissance:  new FormControl('',[  Validators.required]),


  });
  selectedItem: any;

  constructor(private userService: UsersService,  private toastrService: NbToastrService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  submit() {
    console.log(this.addform.getRawValue());
if(this.addform.controls["password"].value !== this.addform.controls["confirmPassword"].value){
  this.showToast("danger","Le mot de passe et sa confirmation ne coïncident pas")
  return;
}
    if(!this.addform.valid){
      this.showToast("danger", "Not Valid Input")
      return
    }
    console.log(this.addform.getRawValue());
    this.userService.saveUser(this.addform.getRawValue()).subscribe({
      next: value => {
        const iconConfig: NbIconConfig = {icon: 'checkmark-outline', pack: 'eva', status: "success"};
        this.toastrService.show('l\'utilisateur a été ajouté avec succès ', `Utilisateur ajouté`, iconConfig)
        console.log(value)
        this.router.navigate(['../users'], {relativeTo: this.route});
      } ,
      error: err => {
        console.error(err)
        this.showToast("danger", err)
      },
      complete: () => console.log('DONE!')
    })
    this.addform.reset();
  }
  showToast(status: NbComponentStatus, message: any) {
    this.toastrService.show("something went wrong authentication is required", `Erorrs: ${message}`, {status});
  }
}
