import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import {AuthService} from "../../auth/auth.service";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {

  private userSub: Subscription | undefined;
  email: string | undefined;
  role: string | undefined;
  ProfileItem  = [
    {
      title : 'Email:',
      icon :'at-outline',
    },
    {
      title : 'Role: Administration',
      icon :'clipboard-outline',
    },
    {
      title : 'Telephone : 50998020:',
      icon :'phone-outline',
    }
    ]

  constructor(    private authSercvice: AuthService,
  ) { }

  ngOnInit(): void {
    this.userSub = this.authSercvice.userAuth.subscribe(user => {
      this.email = user?.email;
      this.role = user?.roleuser;
    });
  }

}
