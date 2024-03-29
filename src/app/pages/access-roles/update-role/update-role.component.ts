import {Component, Input, OnInit} from '@angular/core';
import {RoleService} from "../role.service";
import {NbComponentStatus, NbDialogRef, NbToastrService} from "@nebular/theme";

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.scss']
})
export class UpdateRoleComponent implements OnInit {
  @Input() RoleObject: any;

  constructor(protected ref: NbDialogRef<UpdateRoleComponent>,private roleService: RoleService,private toastrService: NbToastrService,) {
  }

  ngOnInit(): void {
  }

  dismiss(roleName: string) {
    console.log("RoleObject",this.RoleObject)
    console.log("role name",roleName)
    this.roleService.updatRole(this.RoleObject.data.id,roleName).subscribe(
      res => {
        console.log(res)
        this.showToast("info","Updated" )

      }
    )
    this.ref.close();
  }

  showToast(status: NbComponentStatus, message: any) {
    this.toastrService.show("role Updated successfully", `Message : ${message}`, {status});
  }
}
