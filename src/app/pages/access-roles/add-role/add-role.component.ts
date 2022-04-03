import {Component, Input} from '@angular/core';
import {NbComponentStatus, NbDialogRef, NbToastrService} from "@nebular/theme";
import {RoleService} from "../role.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent {

  constructor(protected ref: NbDialogRef<AddRoleComponent>,
              private toastrService: NbToastrService,
              private roleService: RoleService, public router: Router) {
  }


  dismiss(rolename: string) {
    console.log(rolename)
    if(rolename == null){
      console.log("Role is null ! ")
      return
    }
    this.roleService.AddNewRole(rolename).subscribe(res=>{
      console.log(res)
      this.showToast("success","Success" )

    })
    this.ref.close();
    }
  showToast(status: NbComponentStatus, message: any) {
    this.toastrService.show("role added successfully", `Message : ${message}`, {status});
  }

}
