import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ILawnmower, IAddLawnmower, IDataLawnmower } from './ILawnmower';


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
  addLawnmower(lawnmower: IAddLawnmower) {
    const json = {
      name: lawnmower.name,
      status: false,
      batterySensor: 'NC',
      garden: 'api/gardens/'+lawnmower.garden?.id
    };
    return this.httpClient.post(environment.apis.lawnmower.url, json);
  }

  // Get Lawnmower
  getLawnmower(id: number | null): Observable<ILawnmower>{
    return this.httpClient.get<ILawnmower>(environment.apis.lawnmower.url+'/'+id);
  }

  // Update Status
  updateStatus(status: boolean, id: number): Observable<IDataLawnmower[]> {
    return this.httpClient.put<IDataLawnmower[]>(environment.apis.lawnmower.url+'/'+id, {status});
  }

  // Update Lawnmower
  updateLawnmower(lawnmower: ILawnmower, id: number | null): Observable<IDataLawnmower[]> {
    return this.httpClient.put<IDataLawnmower[]>(environment.apis.lawnmower.url+'/'+id, lawnmower);
  }

  // Delete Lawnmower
  deleteLawnmower(id: number): Observable<ILawnmower> {
    return this.httpClient.delete<ILawnmower>(environment.apis.lawnmower.url+'/'+id);
  }

}
