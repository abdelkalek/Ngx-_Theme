import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import {AuthService} from "../../auth/auth.service";
import {Subscription} from "rxjs";
import {User} from "../../auth/User.model";


@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})

export class UserprofileComponent implements OnInit {

  private userSub: Subscription | undefined;
  email: string | undefined;
  role: string | undefined;
  thisUser : User | null | undefined ;


  constructor(    private authSercvice: AuthService,
  ) { }

  ngOnInit(): void {
    this.userSub = this.authSercvice.userAuth.subscribe(user => {
      this.thisUser= user
    });
  }
  items: NbMenuItem[] = [
    {
      title: 'change info',
      expanded: true,
      children: [
        {
          title: 'Change Password',
        },
        {
          title: 'Privacy Policy',
        },
        {
          title: 'Logout',
        },
      ],
    },
    {
      title: 'help et support',
      children: [
        {
          title: 'First Product',
        },
        {
          title: 'Second Product',
        },
        {
          title: 'Third Product',
        },
      ],
    },
    {
      title: 'Notification',
      children: [
        {
          title: 'First Order',
        },
        {
          title: 'Second Order',
        },
        {
          title: 'Third Order',
        },
      ],
    },
  ];
}
