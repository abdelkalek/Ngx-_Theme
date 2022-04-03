import {Component, OnInit} from '@angular/core';
import {RoleService} from "../access-roles/role.service";
import {NbDialogService} from "@nebular/theme";
import {AddPermissionComponent} from "./add-permission/add-permission.component";

@Component({
  selector: 'app-access-permission',
  templateUrl: './access-permission.component.html',
  styleUrls: ['./access-permission.component.scss']
})
export class AccessPermissionComponent implements OnInit {
  roles: any;

  constructor(private roleService: RoleService, private dialogService: NbDialogService) {
  }

  ngOnInit(): void {
    this.roleService.getAllRoles().subscribe(res => {
      this.roles = res;
    })
  }

  open() {
    this.dialogService.open(AddPermissionComponent)
  }
}
