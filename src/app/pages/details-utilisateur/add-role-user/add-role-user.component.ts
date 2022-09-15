import {Component, Input, OnInit} from '@angular/core';
import {RoleService} from "../../access-roles/role.service";
import {UsersService} from "../../users.service";
import {NbDialogRef, NbIconConfig, NbToastrService} from "@nebular/theme";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NUMERIC_PATTREN} from "../../../product-module/add-product/add-product.component";

@Component({
  selector: 'app-add-role-user',
  templateUrl: './add-role-user.component.html',
  styleUrls: ['./add-role-user.component.scss']
})
export class AddRoleUserComponent implements OnInit {
  @Input() useremail: any;
  rolesTab : any;
  addform = new FormGroup({
    email: new FormControl('', ),
    roleName: new FormControl('',  Validators.required),
  })
  constructor(private roleService: RoleService, private userservice:UsersService ,
              protected ref: NbDialogRef<AddRoleUserComponent>,
              private toastrService: NbToastrService,) { }
  ngOnInit(): void {
    console.log(this.useremail)
    this.roleService.getAllRoles().subscribe((res) => {
      this.rolesTab = res;
    });
  }
  dismiss() {
    this.ref.close();
  }
  submit() {
    this.addform.controls['email'].setValue(this.useremail);
    console.log(this.addform.getRawValue())
    this.userservice.AddRoleToUser(this.addform.getRawValue()).subscribe({
      next: (res) =>{
        const iconConfig: NbIconConfig = {icon: 'checkmark-outline', pack: 'eva', status: "success"};
        this.toastrService.show('Role a été ajouté avec succès ', `Role Affecté`, iconConfig)
        console.log(res)
        this.ref.close();
      },error: (err) =>{
        const iconConfig: NbIconConfig = {icon: 'close-outline', pack: 'eva', status: "danger"};
        this.toastrService.show('problème survenu ', `problème de sauvgardage`, iconConfig)
        console.log(err)
      }
    })

  }
}
