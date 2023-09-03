import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ILawnmower, IDataLawnmower } from './ILawnmower';
import { IName } from '../../_interfaces/IName';
import { IAdd } from '../../_interfaces/IAdd';


@Injectable({
  providedIn: 'root'
})

export class LawnmowerService {

  constructor(private httpClient: HttpClient) { }

  // Get List of Lawnmowers
  getAllLawnmowers(): Observable<IDataLawnmower[]> {
    return this.httpClient.get<IDataLawnmower[]>(environment.apis.lawnmower.url);
  }

  // Add Lawnmower
  addData(lawnmower: IAdd) {
    const json = {
      name: lawnmower.name,
      status: false,
      batterySensor: 'NC',
      garden: 'api/gardens/'+lawnmower.garden?.id
    };
    return this.httpClient.post(environment.apis.lawnmower.url, json);
  }

  // Get Lawnmower
  getData(id: number | null): Observable<ILawnmower>{
    return this.httpClient.get<ILawnmower>(environment.apis.lawnmower.url+'/'+id);
  }

  // Update Status
  updateStatus(status: boolean, id: number): Observable<IDataLawnmower[]> {
    // Create a custom HTTP headers object to specify the "lightning" type
    const headers = new HttpHeaders({
      'X-Type': 'lawnmower'
    });
    // Use custom headers in HTTP request
    const options = { headers: headers };
    return this.httpClient.put<IDataLawnmower[]>(environment.apis.status.url+'/'+id, {status}, options);
  }

  // Update Lawnmower
  updateData(lawnmower: IName, id: number | null): Observable<IDataLawnmower[]> {
    return this.httpClient.put<IDataLawnmower[]>(environment.apis.lawnmower.url+'/'+id, lawnmower);
  }

  // Delete Lawnmower
  deleteLawnmower(id: number): Observable<ILawnmower> {
    return this.httpClient.delete<ILawnmower>(environment.apis.lawnmower.url+'/'+id);
  }

  // Get redirection
  getRedirectUrl(): string {
    return '/easygarden/lawnmower';
  }

}
