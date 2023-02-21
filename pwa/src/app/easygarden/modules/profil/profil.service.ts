import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { IUser, IDataUser } from '../../../_interfaces/IUser';

@Injectable({
  providedIn: 'root'
})

export class ProfilService {

  constructor(private httpClient: HttpClient) { }

  // Get User
  getUser(): Observable<IDataUser[]> {
    return this.httpClient.get<IDataUser[]>(environment.apis.user.url);
  }

  // Update
  updateUser(user: IUser, id: number): Observable<IDataUser[]> {
    return this.httpClient.put<IDataUser[]>(environment.apis.user.url+'/'+id, user)
  }

  // Delete
  deleteUser(id: number): Observable<IUser> {
    return this.httpClient.delete<IUser>(environment.apis.user.url+'/'+id)
  }

}
