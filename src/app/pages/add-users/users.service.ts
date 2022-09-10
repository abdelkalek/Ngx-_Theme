import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, throwError} from "rxjs";
import {User} from "../../auth/User.model";



@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private endpoint = environment.endPointAuth;

  constructor(private http: HttpClient) {
  }

  saveUser(userValues: any) {
    return this.http.post(`${this.endpoint}/users`, userValues).pipe(
      catchError(errorRes => {
        let errorMessage = " An unknown error occurred";
        if (errorRes.status == 0) {
          errorMessage = "Field Connexion With BackEnd";
          console.log("FieldConnexion",errorMessage)
          throw  errorMessage;
        }if("user is exists"===errorRes.error){
          throw("l'utilisateur existe déjà")
        }
        if (!errorRes.error || !errorRes.error.errors) {
          console.log("second",errorRes.error)
          //user is exists
          throw errorMessage;
        } else {
          console.log("laset",errorRes)

          throw errorRes.error.errors;
        }
      }))
  }
}
