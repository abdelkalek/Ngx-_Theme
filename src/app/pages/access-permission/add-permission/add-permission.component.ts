import { Component, OnInit } from '@angular/core';
import {NbDialogRef, NbToastrService} from "@nebular/theme";
import {RoleService} from "../../access-roles/role.service";

@Component({
  selector: 'app-add-permission',
  templateUrl: './add-permission.component.html',
  styleUrls: ['./add-permission.component.scss']
})
export class AddPermissionComponent implements OnInit {

  constructor(protected ref: NbDialogRef<AddPermissionComponent>,
              private toastrService: NbToastrService,
              private roleService: RoleService,) { }

  ngOnInit(): void {
  }

  dismiss(value: string) {
    this.ref.close();
  }
}
