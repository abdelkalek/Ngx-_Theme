import {Component, OnInit} from '@angular/core';
import {NbDialogService, NbMenuItem} from '@nebular/theme';
import {AuthService} from "../../auth/auth.service";
import {Subscription} from "rxjs";
import {User} from "../../auth/User.model";
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../users.service";
import Swal from 'sweetalert2';
import {AddPermissionComponent} from "../access-permission/add-permission/add-permission.component";
import {PermissionService} from "../access-permission/permission.service";
import {AddRoleUserComponent} from "./add-role-user/add-role-user.component";


@Component({
  selector: 'app-details-utilisateur',
  templateUrl: './details-utilisateur.component.html',
  styleUrls: ['./details-utilisateur.component.scss']
})
export class DetailsUtilisateurComponent implements OnInit {

  private userSub: Subscription | undefined;
  email: string | undefined;
  role: string | undefined;
  thisUser: User | null | undefined;
  id: any
  roleList: any = [];

  constructor( private dialogService: NbDialogService,private authSercvice: AuthService,private userServices : UsersService, private router: Router, private route: ActivatedRoute
  ) {
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      console.log(this.id)
    });
    this.userServices.GetUserByid(this.id).subscribe(
      {
        next :(u: User) =>{
        this.thisUser = u ;
          this.userServices.GetrolesByemail(u.email).subscribe( {
            next:(data: any)=>{
              console.log(data)
              this.roleList = data
            },
            error: (err)=>{
              console.log(err)
            }
          })
          console.log(u)
        }
      }
    )

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

  settings = {
    noDataMessage: 'عفوا لا توجد بيانات',
    tableProps :"{  striped: true, responsive: true }",
    mode: "external",
    actions: {
      add: false,
      edit: false,
      position: 'right',
    },
    delete: {
      deleteButtonContent: '<i  class="task  nb-trash"></i>',
    },

    columns: {
      id: {
        title: 'Role',
        type: 'string',
      }
    },
  };

  modifieruser(id: string){
    this.router.navigate(['../../ModifierUtilisateur',id], {relativeTo: this.route});

  }
  deleteUserRole($event: any) {
 let deletform ={
  email: this.thisUser?.email,
  roleName:$event.data.id
 }

    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous ne pourrez pas revenir en arrière !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le !'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userServices.deleteUserRole(deletform).subscribe({
          next:(data) => {
            console.log(data)
            this.ngOnInit();
            Swal.fire(
              'Supprimé !',
              'Role  a été supprimé.',
              'success'
            )
          }, error : (err) =>{
            console.log(err)

            Swal.fire(
              'Erreur ',
              'Erreur lors de la suppression de Role',
              'error'
            )
          }
        })

      }
    })
  }


  open() {
    this.dialogService.open(AddRoleUserComponent ,{ context: {useremail: this.thisUser?.email} }).onClose.subscribe(
      {
     next: (res) =>{
       this.ngOnInit();
     }
      }
    )
  }
}
