import {Component, OnInit} from '@angular/core';
import {RoleService} from "../access-roles/role.service";
import {NbDialogService} from "@nebular/theme";
import {AddPermissionComponent} from "./add-permission/add-permission.component";
import {PermissionService} from "./permission.service";

@Component({
  selector: 'app-access-permission',
  templateUrl: './access-permission.component.html',
  styleUrls: ['./access-permission.component.scss']
})
export class AccessPermissionComponent implements OnInit {
  roles: any;

  constructor(private roleService: RoleService, private dialogService: NbDialogService, private permissionService: PermissionService) {
  }
  permissionTab: any = [];
  selectedRoleId: string | undefined;
  ngOnInit(): void {
    this.roleService.getAllRoles().subscribe(res => {
      this.roles = res;
    })
  }
  settings = {
    tableProps :"{  striped: true, responsive: true }",
    mode: "external",
    actions: {
      add: false,
      edit:false,

      position: 'right',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
    },

    columns: {
      value: {
        title: 'Permission',
        type: 'string',
      }
    },
  };
getRolefromSelect(roleId: any ){
  this.selectedRoleId = roleId;
  this.permissionService.getRolesPermissions(roleId).subscribe({
    next: (res) =>{
      this.permissionTab = res
      console.log(res)
    }
  })
  console.log(roleId)
}
  open() {
    this.dialogService.open(AddPermissionComponent ,{ context: {RoleID: this.selectedRoleId} })
  }

  deletePermission($event: any) {

  }
}
