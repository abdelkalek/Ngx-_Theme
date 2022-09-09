import {Component, OnInit} from '@angular/core';
import {UserModel, UsersService} from "../users.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.scss']
})
export class ListuserComponent implements OnInit {
  users: any = [];

  constructor(private userservice: UsersService) {
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
      editButtonContent: '<i class="nb-gear"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
    },

    columns: {
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
      },   poste: {
        title: 'Post',
        type: 'string',
      }
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

  onDeleteConfirm(event:any) {
    console.log("Delete Event In Console")
    console.log(event);
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event:any) {
    console.log("Create Event In Console")
    console.log(event);

  }

  onSaveConfirm(event:any) {
    console.log("Edit Event In Console")
    console.log(event);
  }


  editUser($event: any) {

  }

  createNewUser() {

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
