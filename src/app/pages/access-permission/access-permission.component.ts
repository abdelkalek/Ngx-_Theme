import {Component, OnInit} from '@angular/core';
import {RoleService} from "../access-roles/role.service";
import {NbDialogService, NbIconConfig, NbToastrService} from "@nebular/theme";
import {AddPermissionComponent} from "./add-permission/add-permission.component";
import {PermissionService} from "./permission.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-access-permission',
  templateUrl: './access-permission.component.html',
  styleUrls: ['./access-permission.component.scss']
})
export class AccessPermissionComponent implements OnInit {
  roles: any;

  constructor(  private toastrService: NbToastrService,private roleService: RoleService, private dialogService: NbDialogService, private permissionService: PermissionService) {
  }

  permissionTab: any = [];
  selectedRoleId?: string;
  role: any

  ngOnInit(): void {
    this.roleService.getAllRoles().subscribe(res => {
      this.roles = res;
    })
  }

  settings = {
    tableProps: "{  striped: true, responsive: true }",
    mode: "external",
    actions: {
      add: false,
      edit: false,

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

  getRolefromSelect(roleId: string) {
    this.selectedRoleId = roleId;
    this.permissionService.getRolesPermissions(roleId).subscribe({
      next: (res) => {
        this.permissionTab = res

        console.log(res)
      }
    })
    this.roleService.getRoleById(this.selectedRoleId).subscribe({
      next: (resultat) => {
        this.role = resultat;
      }
    })
  }

  open() {
    this.dialogService.open(AddPermissionComponent, {context: {RoleID: this.selectedRoleId}}).onClose.subscribe(
      {
        next: (res) => {
          this.permissionService.getRolesPermissions(res).subscribe({
            next: (res) => {
              this.permissionTab = res
              console.log(res)
            }
          })
        }
      }
    )
  }

  deletePermission($event: any) {
    console.log('1',$event)
    console.log('1',this.role.name)
    let delForm = {
      roleName: this.role.name,
      claimName: "permission",
      claimValue: $event.data.value
    }
    console.log('1',delForm)

    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous ne pourrez pas revenir en arrière !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le !'
    }).then((result) => {
      if (result.isConfirmed) {
        this.permissionService.deletePermissionfromRole(delForm).subscribe({
            next: (res) => {
              const iconConfig: NbIconConfig = {icon: 'checkmark-outline', pack: 'eva', status: "success"};
              this.toastrService.show('Action de suppression a effectuée ', `action de Suppression`, iconConfig)
              this.permissionService.getRolesPermissions(this.role.id).subscribe({
                next: (res) => {
                  this.permissionTab = res
                }
              })
            }, error:  (err) =>{
            console.log(err)
            Swal.fire(
              'Erreur ',
              'Erreur lors de la suppression de permission',
              'error'
            )
          }
        })

      }
    })



  }
}
