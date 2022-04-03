import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, throwError} from "rxjs";

export interface UserRegister {
  email: string,
  userName: string,
  password: string

}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private endpoint = environment.endPoint;

  constructor(private http: HttpClient) {
  }

  saveUser(userValues: any) {
    return this.http.post<UserRegister | boolean>(`${this.endpoint}/api/AuthManagment/Register`, {
      email: userValues.email,
      userName: userValues.nom,
      password: userValues.password
    }).pipe(
      catchError(errorRes => {
        let errorMessage = " An unknown error occurred";
        if (errorRes.status == 0) {
          errorMessage = "Field Connexion With BackEnd";
          throw  errorMessage;
        }
        if (!errorRes.error || !errorRes.error.errors) {
          throw errorMessage;
        } else {
          throw errorRes.error.errors;
        }
      }))
  }
}
