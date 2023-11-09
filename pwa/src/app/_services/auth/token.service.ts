import { Injectable } from '@angular/core';
// Library
import jwt_decode from "jwt-decode";


@Injectable({
  providedIn: 'root'
})

export class TokenService {
  token: any;

  constructor() { }

  getToken(): string | null{
    return localStorage.getItem('token');
  }

  saveToken(token: string): void{
    localStorage.setItem('token', token);
  }

  isToken(): boolean{
    const token = localStorage.getItem('token');
    return !! token;
  }

  clearToken(): void{
    localStorage.removeItem('token');
  }

  isTokenExpired(token: string): boolean{
    try {
      const decodedToken: any = jwt_decode(token);
      // Convert the expiration date to milliseconds
      const expirationDate = new Date(decodedToken.exp * 1000);
      // Check if the expiration date is in the past
      return expirationDate.getTime() <= Date.now();
    }
    // In the event of an error during decoding, the token is considered expired as a precaution.
    catch (error) {
      return true;
    }
  }

}
