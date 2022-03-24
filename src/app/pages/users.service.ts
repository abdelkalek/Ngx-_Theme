import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
export interface  UserModel{
  id: string,
  userName: string,
  normalizedUserName: string,
  email: string,
  normalizedEmail: string,
  emailConfirmed: string,
  passwordHash:string,
  securityStamp: string,
  concurrencyStamp: string,
  phoneNumber: string,
  phoneNumberConfirmed: string,
  twoFactorEnabled: string,
  lockoutEnd: string,
  lockoutEnabled: string,
  accessFailedCount: 0
}
interface UserModelPage {
  data: UserModel[]
}
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private endpoint = environment.baseUrl;

  constructor(private http: HttpClient,) {
  }

  getUsers() {
    return this.http.get("https://localhost:7089/api/RoleManager/GetAllUser");
  }
}
