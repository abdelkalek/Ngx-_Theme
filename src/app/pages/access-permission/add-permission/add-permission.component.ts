import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef, NbToastrService} from "@nebular/theme";
import {RoleService} from "../../access-roles/role.service";
import {Role} from "../../access-roles/Role.model";

@Component({
  selector: 'app-add-permission',
  templateUrl: './add-permission.component.html',
  styleUrls: ['./add-permission.component.scss']
})
export class AddPermissionComponent implements OnInit {
  @Input() RoleID: any;
  constructor(protected ref: NbDialogRef<AddPermissionComponent>,
              private toastrService: NbToastrService,
              private roleService: RoleService,) { }
  roleName : string  | undefined;

  ngOnInit(): void {
this.roleService.getRoleById(this.RoleID).subscribe({
  next : (res : Role) =>{
    console.log(res)
    this.roleName = res.name;
    console.log("role name",res.name)
  }
})
  }

  dismiss() {
    this.ref.close();
  }

  selectedPermission($event: any) {

  }
}
