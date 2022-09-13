import {Component, OnInit} from '@angular/core';
import {RoleService} from "./role.service";
import {NbComponentStatus, NbDialogService, NbToastrService} from "@nebular/theme";
import {AddRoleComponent} from "./add-role/add-role.component";
import Swal from "sweetalert2";
import {UpdateRoleComponent} from "./update-role/update-role.component";


@Component({
  selector: 'app-access-roles',
  templateUrl: './access-roles.component.html',
  styleUrls: ['./access-roles.component.scss']
})
export class AccessRolesComponent implements OnInit {

  constructor(private roleService: RoleService,
              private dialogService: NbDialogService,
              private toastrService: NbToastrService,
  ) {
  }

  rolesTab: any = [];
  ngOnInit(): void {
    this.roleService.getAllRoles().subscribe((res) => {
      this.rolesTab = res;
    })

  }

  settings = {
    tableProps :"{  striped: true, responsive: true }",

    mode: "external",
    actions: {
      add: false,
      position: 'right',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
    },
    delete: {
      deleteButtonContent: '<i  class="task  nb-trash"></i>',
    },

    columns: {
      name: {
        title: 'Role',
        type: 'string',
      }
    },
  };








  open() {
    this.dialogService.open(AddRoleComponent).onClose.subscribe({
      next: (res) => {
      }, error: (er) => {
        console.log(er)
      }, complete: () =>
    {
      this.ngOnInit();

    }
  }
    );

  }

  deleteRole(role: any) {
    console.log(role.data.id)
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0095ff',
      cancelButtonColor: '#ff3d71',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.roleService.deleteRole(role.data.id).subscribe(resdel => {
          console.log(resdel)
          this.ngOnInit();
        });

        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  editrole($event: any) {
      this.dialogService.open(UpdateRoleComponent, { context: {RoleObject: $event} }).onClose.subscribe( res =>{
        this.roleService.getAllRoles().subscribe((res) => {
          this.rolesTab = res;
          this.ngOnInit()
        })
      });
  }


}
