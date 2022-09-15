import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {User} from "../../../auth/User.model";
import {AuthService} from "../../../auth/auth.service";
import {NbMenuItem} from "@nebular/theme";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {MachinesService} from "../machines.service";
import {Machine} from "../machine.model";

@Component({
  selector: 'app-detail-machine',
  templateUrl: './detail-machine.component.html',
  styleUrls: ['./detail-machine.component.scss']
})
export class DetailMachineComponent implements OnInit {

  id: any;
  machine: Machine | undefined

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private machineService: MachinesService
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      console.log(this.id)
    });
    this.machineService.getMachineByid(this.id).subscribe({
      next: (resultat) => {
        this.machine = resultat
        console.log(resultat)
      }
    })

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

  Modifier() {
    this.router.navigate(['../../u',this.id], {relativeTo: this.route}) .then(nav => {
      console.log(nav); // true if navigation is successful
    }, err => {
      console.log(err) // when there's an error
    });
  }
}
