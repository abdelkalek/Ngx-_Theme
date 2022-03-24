import { Injectable } from '@angular/core';
 const TOKEN_KEY = 'auth-token';
const RefreshTOKEN_KEY = 'refresh-token';
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }
  signOut(): void {
    window.sessionStorage.clear();
  }
  //(resData.token,  resData.refreshToken, resData.success, resData.errors
  public saveToken(token: string, refreshToken:string ): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    window.sessionStorage.removeItem(RefreshTOKEN_KEY);
    window.sessionStorage.setItem(RefreshTOKEN_KEY, refreshToken);

  }
  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }
}
