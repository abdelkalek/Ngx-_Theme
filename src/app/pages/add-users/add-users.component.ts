import { Component, OnInit } from '@angular/core';
import {UsersService} from "./users.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {

  singupform = new FormGroup({
    nom:  new FormControl(''),
    prenom : new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    passwordConfirme: new FormControl('')
  });

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
  }

  submit() {
    console.log(this.singupform.getRawValue());
    // this.userService.saveUser(this.singupform.getRawValue()).subscribe(res =>{
    //   console.log(res)
    // })
    this.singupform.reset();
  }
}
