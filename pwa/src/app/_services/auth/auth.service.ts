import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ICredentials } from '../../_interfaces/ICredentials';
import { IUser } from '../../_interfaces/IUser';
import { IToken } from '../../_interfaces/IToken';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private httpClient: HttpClient) { }

  logIn(credentials: ICredentials): Observable<IToken>{
    return this.httpClient.post<IToken>(environment.apis.login.url, credentials)
  }

  registerIn(user: IUser) {
    const profile = {
      email: user.email,
      password: user.password,
      plainPassword: user.password,
      lastName: user.lastName,
      firstName: user.firstName,
      pseudo: user.pseudo,
      phoneNumber: user.phoneNumber,
      createdAt: new Date(),
      isVerified: false
    };
    return this.httpClient.post(environment.apis.user.url, profile)
  }
  
}
