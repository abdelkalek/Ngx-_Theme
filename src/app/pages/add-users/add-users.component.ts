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
    nom: new FormControl('',[ Validators.required]),
    prenom: new FormControl('',[ Validators.required]),
    email: new FormControl('',[Validators.email, Validators.required]),
    password: new FormControl('',[ Validators.required]),
    passwordConfirme: new FormControl('')
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
