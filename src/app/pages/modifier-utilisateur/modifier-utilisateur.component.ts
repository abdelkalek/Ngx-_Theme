import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NUMERIC_PATTREN} from "../../product-module/add-product/add-product.component";
import {NbComponentStatus, NbIconConfig, NbToastrService} from "@nebular/theme";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../auth/User.model";
import {UsersService} from "../users.service";
import {RoleService} from "../access-roles/role.service";

@Component({
  selector: 'app-modifier-utilisateur',
  templateUrl: './modifier-utilisateur.component.html',
  styleUrls: ['./modifier-utilisateur.component.scss']
})
export class ModifierUtilisateurComponent implements OnInit {

  addform = new FormGroup({
    id:  new FormControl(),
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
    datedeNaissance:  new FormControl('',[  Validators.required]),


  });
  selectedItem: any;
  id: any ;
  constructor(private roleService: RoleService,private userService: UsersService,  private toastrService: NbToastrService, private router: Router, private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      console.log(this.id)
    });
    this.userService.GetUserByid(this.id).subscribe(
      {
        next :(u: User) =>{
          this.addform.controls["id"].setValue(u.id)
          this.addform.controls["cin"].setValue(u.cin)
          this.addform.controls["matricule"].setValue(u.matricule)
          this.addform.controls["email"].setValue(u.email)
          this.addform.controls["nom"].setValue(u.nom)
          this.addform.controls["prenom"].setValue(u.prenom)
          this.addform.controls["codePostal"].setValue(u.codePostal)
          this.addform.controls["adress"].setValue(u.adress)
          this.addform.controls["ville"].setValue(u.ville)
          this.addform.controls["poste"].setValue(u.poste)
          this.addform.controls["genre"].setValue(u.genre)
          this.addform.controls["phoneNumber"].setValue(u.phoneNumber)
          this.addform.controls["userName"].setValue(u.userName)
          this.addform.controls["datedeNaissance"].setValue(u.datedeNaissance)
          console.log(u)


        },error : (err) => {
          console.log(err)
        }, complete(){

        }
      }
    )
  }
  submit() {
    console.log(this.addform.getRawValue());
    if(!this.addform.valid){
      this.showToast("danger", "Not Valid Input")
      return
    }
    console.log(this.addform.getRawValue());
    this.userService.UpdateUser(this.addform.getRawValue(), this.id).subscribe({
      next: value => {
        const iconConfig: NbIconConfig = {icon: 'checkmark-outline', pack: 'eva', status: "success"};
        this.toastrService.show('l\'utilisateur a été modifié avec succès ', `Utilisateur modifié`, iconConfig)
        console.log(value)
        this.router.navigate(['../../users'], {relativeTo: this.route});
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

