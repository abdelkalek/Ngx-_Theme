import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {User} from "../auth/User.model";
import {map} from "rxjs";
import {Role} from "./access-roles/Role.model";
import {stringify} from "@angular/compiler/src/util";
import {body} from "ionicons/icons";

export interface UserModel {
  id: string,
  userName: string,
  normalizedUserName: string,
  email: string,
  normalizedEmail: string,
  emailConfirmed: string,
  passwordHash: string,
  securityStamp: string,
  concurrencyStamp: string,
  phoneNumber: string,
  phoneNumberConfirmed: string,
  twoFactorEnabled: string,
  lockoutEnd: string,
  lockoutEnabled: string,
  accessFailedCount: 0
}

export interface roleDto {
  rolename: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private endpoint = environment.endPointAuth;

  constructor(private http: HttpClient,) {
  }

  getUsers() {
    return this.http.get(`${this.endpoint}/users`);
  }

  deleteUserByid(id: any) {
    return this.http.delete(`${this.endpoint}/users/DeleteUser/${id}`)
  }

  GetUserByid(id: any) {
    return this.http.get<User>(`${this.endpoint}/users/${id}`)
  }

  UpdateUser(rawValue: any, id: string) {
    return this.http.put(`${this.endpoint}/users/EditUser/${id}`, rawValue)

  }

  GetrolesByemail(email: string) {
    let roleList: any = [];
    return this.http.get<any[]>(`${this.endpoint}/Users/GetrolesByemail/${email}`).pipe(map((res: any) => {
          let  rl = res.map((element:any)=>{return {id:element}})
      return rl
    }))

  }
  deleteUserRole(deleteForm:any){
    console.log(deleteForm)
    return this.http.delete(`${this.endpoint}/Users/RemoveRoleFromUser`, {body: deleteForm} )
  }
  AddRoleToUser(userRoleForm:any){
    return this.http.post(`${this.endpoint}/Users/AddRoleToUser`, userRoleForm )

  }
}
