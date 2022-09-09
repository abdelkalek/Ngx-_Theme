import {Component, OnInit} from '@angular/core';
import {UserRegister, UsersService} from "./users.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NbComponentStatus, NbToastrService} from "@nebular/theme";

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {

  addform = new FormGroup({
    cin:  new FormControl('',[ Validators.required]),
    matricule:  new FormControl('',[ Validators.required]),
    email:  new FormControl('',[ Validators.required]),
    nom:  new FormControl('',[ Validators.required]),
    prenom:  new FormControl('',[ Validators.required]),
    codePostal: new FormControl('',[ Validators.required]),
    Adress:  new FormControl('',[ Validators.required]),
    ville: new FormControl('',[ Validators.required]),
    poste:  new FormControl('',[ Validators.required]),
    genre:  new FormControl('',[ Validators.required]),
    phoneNumber: new FormControl('',[ Validators.required]),
    userName: new FormControl('',[ Validators.required]),
    password: new FormControl('',[ Validators.required]),
    confirmPassword: new FormControl('',[ Validators.required]),
    datedeNaissance:  new FormControl('',[ Validators.required]),


  });

  constructor(private userService: UsersService,  private toastrService: NbToastrService,) {
  }

  ngOnInit(): void {
  }

  submit() {
    if(!this.addform.valid){
      this.showToast("danger", "Not Valid Input")

      return

    }
    console.log(this.addform.getRawValue());
    this.userService.saveUser(this.addform.getRawValue()).subscribe({
      next: value => console.log(value),
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
