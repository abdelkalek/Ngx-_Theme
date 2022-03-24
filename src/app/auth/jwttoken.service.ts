import {Injectable} from '@angular/core';
import jwt_decode from "jwt-decode";

export interface jwtObject {
  Id: string;
  email: string;
  role: string;
  nbf: string;
  exp: string;
  iat: string;
}
@Injectable({
  providedIn: 'root'
})



export class JWTTokenService {
  decodedToken: { [key: string]: string; } | undefined;
  constructor() {
  }

  getToken(token: string) {
    return jwt_decode<jwtObject>(token)
  }
}

