import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
// Modele
import { ICredentials } from '../../_interfaces/ICredentials';
import { IToken } from '../../_interfaces/IToken';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private httpClient: HttpClient) { }

  logIn(credentials: ICredentials): Observable<IToken>{
    return this.httpClient.post<IToken>(environment.apis.login.url, credentials);
  }

  isAccountVerified(email: string): Observable<boolean> {
    return this.httpClient.get<boolean>(environment.apis.checkAccountActivation.url, {params:{email}});
  }

  checkIfEmailExist(email: string): Observable<boolean> {
    return this.httpClient.get<boolean>(environment.apis.checkIfEmailExist.url, {params:{email}});
  }

  isUserLogged() {
    return of(true);
  }

}
