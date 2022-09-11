import {Component, OnInit} from '@angular/core';
import { UsersService} from "../users.service";
import Swal from "sweetalert2";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.scss']
})
export class ListuserComponent implements OnInit {
  users: any = [];

  constructor(private userservice: UsersService, private router: Router, private route: ActivatedRoute) {
  }

  selectedRows: any;

  ngOnInit(): void {
    this.userservice.getUsers().subscribe((res) => {
      this.users = res;
      console.log(this.users)
    })
  }
  settings = {
    tableProps :"{  striped: true, responsive: true }",

    mode: "external",
    actions: {
      add: true,
      position: 'right',
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
    },
    edit: {
       editButtonContent: '<img alt="view" src="assets/profileimgs/see.png" width="20" height="20" >',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
    },
    handel : {
      handelButtonContent :'<i class="nb-trash"></i>'
    },

    columns: {
      genre: {
        title: 'Profile Image',
        type: 'html',
        valuePrepareFunction: (genre:string) => {
          if(genre==="Femme"){ return `<img   src="assets/Users/avatarf.svg" width="42" height="42">`; }
          else {
            return `<img   src="assets/Users/avatarh.svg" width="42" height="42">`;
          }

        },
        filter: false
      },
      cin: {
        title: 'Cin',
        type: 'string',
      }, matricule: {
        title: 'Matricule',
        type: 'string',
      },
      email: {
        title: 'Email',
        type: 'string',
      },
      nom: {
        title: 'Nom',
        type: 'string',
      },

      prenom: {
        title: 'Prenom',
        type: 'string',
      },
        poste: {
        title: 'Poste',
        type: 'html',
        valuePrepareFunction: (poste:string) =>
        {
          if(poste=="Ingenieur"){
            return`<span class="badge bg-success">${poste}</span>`;
          }else
          if (poste=="Technicien")
          {
            return`<span class="badge bg-primary">${poste}</span>`;
          }
          return`<span class="lead badge bg-secondary">${poste}</span>`;
        },
      },
    },
  };


  // UserRowSelected Event handler
  onRowSelect(event:any) {
    this.selectedRows = event.selected;
    console.log("selected row",event)
  }

  // Get Selected button click handler
  onClick() {
    // It will console all the selected rows
    console.log(this.selectedRows);
  }


  editUser($event: any) {
    console.log('Edit  Item', $event.data.id);
    this.router.navigate(['../DetailsUtilisateur',$event.data.id], {relativeTo: this.route});

  }

  createNewUser() {
    this.router.navigate(['../adduser'], {relativeTo: this.route});
  }

  deleteUser($event: any) {
    console.log('Delete Item', $event.data.id);
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
        this.userservice.deleteUserByid($event.data.id).subscribe({
          next : (res) =>{
            console.log(res)
           this.ngOnInit();
            Swal.fire(
              'Supprimé !',
              'l\'utilisateur  a été supprimé.',
              'success'
            )
          }, error : (err) =>{
            console.log(err)

            Swal.fire(
              'Erreur ',
              'Erreur lors de la suppression de produit',
              'error'
            )
          }
        })

      }
    })

  }
}
