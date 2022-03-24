import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {authResponsData, AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {NbComponentStatus, NbToastrService} from "@nebular/theme";
import {Observable} from "rxjs";

@Component({
  selector: 'ngx-app-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  isLoadingMode = false;
  showPassword = true;
  authObs!: Observable<authResponsData>;

  loginform = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required])
  });


  constructor(
    private toastrService: NbToastrService,
    private formBuilder: FormBuilder,
    private logService: AuthService,
    public router: Router) {
  }

  ngOnInit(): void {
    this.showPassword = false;
  }

  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }


  loginEmail() {
    console.log(this.loginform.value);
    this.isLoadingMode = true
    if (this.loginform.invalid) {
      console.log('Form Invalid')
      this.isLoadingMode = false
      return;
    }
    this.authObs = this.logService.login(this.loginform.value);
    this.authObs.subscribe({
      next: value => {
        this.isLoadingMode = false
        console.log(value);
        this.router.navigate(['pages']);
      },
      error: errorRes => {
        this.isLoadingMode = false
        this.showToast("danger", errorRes)
      },
      complete: () => {
        this.isLoadingMode = false
        console.log('DONE!')
      }

    });
  }


  showToast(status: NbComponentStatus, message: any) {
    this.toastrService.show("something went wrong authentication is required", `Erorrs: ${message}`, {status});
  }

}
