import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Role} from "./Role.model";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private endpoint = environment.endPointAuth;
  private headers: HttpHeaders;

  constructor(private http: HttpClient  ) {
    this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
  }
  getAllRoles(){
    return this.http.get(`${this.endpoint}/Roles`)
  }
  AddNewRole(RoleName: string){
   /* return this.http.post(`${this.endpoint}/Roles`, JSON.stringify(RoleName)
   , {headers: this.headers})*/
   return this.http.post(`${this.endpoint}/Roles`,{
     reqstring : RoleName
   } )
  }
  deleteRole(id : string ) {
    return this.http.delete(`${this.endpoint}/Roles/RemoveRole/${id}`)
  }
  getRoleById(id : string ) {
    return this.http.get<Role>(`${this.endpoint}/Roles/${id}`)
  }

  updatRole(id: string, name: string) {
    return this.http.put(`${this.endpoint}/Roles/UpdateRole/${id}`,{
      reqstring: name
    })
  }
}
