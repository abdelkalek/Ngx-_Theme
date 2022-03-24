import {Component, OnInit} from '@angular/core';
import {UserModel, UsersService} from "../users.service";

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.scss']
})
export class ListuserComponent implements OnInit {
users : any =[];
  constructor(private userservice: UsersService) {
  }



  ngOnInit(): void {
    this.userservice.getUsers().subscribe( (res) => {
      console.log(res);
      this.users = res  ;
      console.log(this.users)
    })
  }

}
