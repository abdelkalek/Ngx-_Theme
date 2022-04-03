import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BehaviorSubject, catchError, Observable, tap} from "rxjs";
import {User} from "./User.model";
import {TokenStorageService} from "./token-storage.service";
import {Router} from "@angular/router";
import {JWTTokenService} from "./jwttoken.service";

export interface authResponsData {
  token: string,
  refreshToken: string,
  success: boolean,
  errors: string[]
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private endpoint = environment.endPoint;
  private headers: HttpHeaders;
  //Behavior Subject Observable that you can get next value or privious values also :) Nice Yeah
  userAuth = new BehaviorSubject<User | null>(null);
  isLoggedIn: boolean | undefined;

  constructor(
              private jwtokenservice: JWTTokenService,
              private http: HttpClient,
              private router: Router,
              private tokenStorageToken: TokenStorageService) {
    this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
  }

  login(loginForm: any) {
    return this.http.post<authResponsData>(`${this.endpoint}/api/AuthManagment/Login`, {
      email: loginForm.email,
      password: loginForm.password
    }, {headers: this.headers}).pipe(catchError(errorRes => {
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
    }), tap(
      resData => {
        console.log("token " + resData.token + " Refresh Token " + resData.refreshToken)
        this.isLoggedIn = true;
        var userCodee = this.jwtokenservice.getToken(resData.token);
        const expirationDate = new Date(+userCodee.exp * 1000);
        const user = new User(userCodee.Id,userCodee.email,userCodee.role,resData.token,expirationDate);
        this.tokenStorageToken.saveToken(resData.token, resData.refreshToken)
       // resData.token, resData.refreshToken, resData.success, resData.errors
        this.userAuth.next(user);
        localStorage.setItem('resData', JSON.stringify(user));
      }
    ));
  }
  autoLogin() {

    var userLoded  = JSON.parse(localStorage.getItem('resData')!);
    const expirationDate = new Date(+userLoded.exp * 1000);
    if (!userLoded) {
      return;
    }
    const loadedUser = new User(userLoded.id,userLoded.email,userLoded.role,userLoded.token,expirationDate);
  this.userAuth.next(loadedUser)
  }
  logout() {
    this.userAuth.next(null);
    localStorage.removeItem('resData')
    this.isLoggedIn = false;
    this.tokenStorageToken.signOut();
    this.router.navigate(['/']);
  }

}
