import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {body, options} from "ionicons/icons";

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private endpoint = environment.endPointAuth;

  constructor(private http: HttpClient ) { }

// /Claims/GetRoleClaims
getRolesPermissions(id:string){
 return this.http.post(`${this.endpoint}/Claims/GetRoleClaims`,{
    guidValue : id
  })
}
addPermissionToRole(permissionRole: any) {
  console.log(permissionRole)
  return this.http.post(`${this.endpoint}/Claims/addClaimPermissionRole`,
    {
      roleName: permissionRole.roleName,
      claimValue: permissionRole.claimValue
    }
    )
}
deletePermissionfromRole(permissionForm : any ){
return this.http.delete(`${this.endpoint}/Claims/deleteRoleClaims`, {body: permissionForm})
}

}
