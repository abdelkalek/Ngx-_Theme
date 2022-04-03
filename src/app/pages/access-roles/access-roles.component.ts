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
      console.log(res);
      this.rolesTab = res;
      console.log(this.rolesTab)
    })

  }


  open() {
    this.dialogService.open(AddRoleComponent).onClose.subscribe( res =>{
      this.roleService.getAllRoles().subscribe((res) => {
        console.log(res);
        this.rolesTab = res;
        console.log(this.rolesTab)
      })
    });

  }

  deleteRole(id: string) {

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
        this.roleService.deleteRole(id).subscribe(resdel => {
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

  editRole(name: string, idR: string) {
      this.dialogService.open(UpdateRoleComponent, { context: {roleName: name, idrole: idR} }).onClose.subscribe( res =>{
        this.roleService.getAllRoles().subscribe((res) => {
          console.log(res);
          this.rolesTab = res;
          console.log(this.rolesTab)
        })
      });

  }
}
