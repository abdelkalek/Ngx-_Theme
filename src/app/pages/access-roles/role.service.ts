import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private endpoint = environment.endPoint;
  private headers: HttpHeaders;

  constructor(private http: HttpClient  ) {
    this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
  }
  getAllRoles(){
    return this.http.get(`https://localhost:7089/api/RoleManager`)
  }
  AddNewRole(RoleName: string){
    return this.http.post(`https://localhost:7089/api/RoleManager`, JSON.stringify(RoleName)
   , {headers: this.headers})
  }

  deleteRole(id : string ) {
    return this.http.delete(`https://localhost:7089/api/RoleManager/RemoveRole/${id}`,{headers: this.headers})
  }

  updatRole(id: string | undefined, name: string) {
    return this.http.put(`https://localhost:7089/api/RoleManager/updateRole/${id}`, JSON.stringify(name),{headers: this.headers})
  }
}
