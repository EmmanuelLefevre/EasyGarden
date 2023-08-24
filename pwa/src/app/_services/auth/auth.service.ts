import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
// Services
import { TokenService } from './token.service';
// Modele
import { ICredentials } from '../../_interfaces/ICredentials';
import { IToken } from '../../_interfaces/IToken';


@Injectable({
  providedIn: 'root'
})


export class AuthService {

  constructor(private httpClient: HttpClient,
              private tokenService: TokenService) { }

  logIn(credentials: ICredentials): Observable<IToken>{
    // Check if token is present and expired
    const token = this.tokenService.getToken();
    if (token !== null && this.tokenService.isTokenExpired(token)) {
      this.tokenService.clearToken();
    }
    return this.httpClient.post<IToken>(environment.apis.login.url, credentials);
  }

  isAccountVerified(email: string): Observable<boolean> {
    return this.httpClient.get<boolean>(environment.apis.checkAccountActivation.url, {params:{email}});
  }

  checkIfEmailExist(email: string): Observable<boolean> {
    return this.httpClient.get<boolean>(environment.apis.checkIfEmailExist.url, {params:{email}});
  }

  forgottenPassword(email: string): Observable<boolean> {
    return this.httpClient.get<boolean>(environment.apis.forgottenPassword.url, {params:{email}}); 
  }

  isUserLogged() {
    return of(true);
  }

}
