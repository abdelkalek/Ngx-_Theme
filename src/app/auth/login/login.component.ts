import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-app-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  showPassword = true;
  email: any;
  pwd: any;
  constructor() {}
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

  }
}
