import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BehaviorSubject, catchError, Observable, tap} from "rxjs";
import {User} from "./User.model";
import {TokenStorageService} from "./token-storage.service";
import {Router} from "@angular/router";
import {JWTTokenService} from "./jwttoken.service";

export interface authResponsData {
  accessToken: string,
  refreshToken: string,
  success: boolean,
  errors: string[]
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private endpoint = environment.endPointAuth;
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
    return this.http.post<authResponsData>(`${this.endpoint}/Users/Login`, {
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
        console.log("token " + resData.accessToken + " Refresh Token " + resData.refreshToken)
        this.isLoggedIn = true;
        var userCodee = this.jwtokenservice.getToken(resData.accessToken);
        const expirationDate = new Date(+userCodee.exp * 1000);
        this.http.get<User>(`${this.endpoint}/Users/${userCodee.id}`).subscribe(
          {
            next:(res)=>{
              const user = new User(res.id,res.cin,res.matricule,res.email,res.nom,res.prenom, res.codePostal,res.adress,res.ville,res.poste,res.genre,res.phoneNumber,res.userName,res.datedeNaissance, resData.accessToken, expirationDate);
              this.userAuth.next(user);
              console.log("this user ", user);
              localStorage.setItem('resData', JSON.stringify(user));
            }
          }
        )
        this.tokenStorageToken.saveToken(resData.accessToken, resData.refreshToken)
      }
    ));
  }
  autoLogin() {

    var userLoded  = JSON.parse(localStorage.getItem('resData')!);
    if(!!userLoded){
      const expirationDate = new Date(+userLoded.exp * 1000);
      if (!userLoded) {
        return;
      }

      this.http.get<User>(`${this.endpoint}/Users/${userLoded.id}`).subscribe(
        {
          next:(res)=>{
            const loadedUser = new User(res.id,res.cin,res.matricule,res.email,res.nom,res.prenom, res.codePostal,res.adress,res.ville,res.poste,res.genre,res.phoneNumber,res.userName,res.datedeNaissance, userLoded.accessToken, expirationDate);
            this.userAuth.next(loadedUser);
            console.log("this user ", loadedUser);
          }
        }
      )

    }

  }
  logout() {
    this.userAuth.next(null);
    localStorage.removeItem('resData')
    this.isLoggedIn = false;
    this.tokenStorageToken.signOut();
    this.router.navigate(['/']);
  }

}
