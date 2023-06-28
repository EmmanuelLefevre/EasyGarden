import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ICredentials } from '../../_interfaces/ICredentials';
import { IToken } from '../../_interfaces/IToken';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private httpClient: HttpClient) { }

  logIn(credentials: ICredentials): Observable<IToken>{
    return this.httpClient.post<IToken>(environment.apis.login.url, credentials)
  }
  
}
