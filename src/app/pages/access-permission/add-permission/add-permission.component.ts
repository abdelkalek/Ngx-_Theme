import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef, NbIconConfig, NbToastrService} from "@nebular/theme";
import {RoleService} from "../../access-roles/role.service";
import {Role} from "../../access-roles/Role.model";
import {PermissionService} from "../permission.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-permission',
  templateUrl: './add-permission.component.html',
  styleUrls: ['./add-permission.component.scss']
})
export class AddPermissionComponent implements OnInit {
  @Input() RoleID: any;
  private event: any;
  addform = new FormGroup({
    roleName: new FormControl('', ),
    claimValue: new FormControl('',  Validators.required),
  })
  constructor(protected ref: NbDialogRef<AddPermissionComponent>,
              private toastrService: NbToastrService,
              private roleService: RoleService, private  permissionservice : PermissionService) { }
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
    this.ref.close(this.RoleID);
  }
  selectedPermission($event: any) {
    this.event =   $event
  }

  Addpermission() {

    console.log(this.event)
   // this.permissionservice.addPermissionToRole()
  }


  submit() {
    this.addform.controls['roleName'].setValue(this.roleName);
    console.log(this.addform.getRawValue())
    console.log(this.RoleID)
    console.log(this.event)
    this.permissionservice.addPermissionToRole(this.addform.getRawValue()).subscribe({
      next: (res) =>{
        console.log(res)
        const iconConfig: NbIconConfig = {icon: 'checkmark-outline', pack: 'eva', status: "success"};
        this.toastrService.show('Permission a été ajouté avec succès ', `Permission Ajouté`, iconConfig)
      }, error: (e)=>{
        const iconConfig: NbIconConfig = {icon: 'checkmark-outline', pack: 'eva', status: "danger"};
        this.toastrService.show(e.error.error, `Permission erroné`, iconConfig)
        console.log(e)

      }
    })
  //  this.ref.close(this.RoleID);
  }
}
