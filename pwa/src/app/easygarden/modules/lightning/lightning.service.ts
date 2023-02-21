import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ILightning, IAddLightning, IDataLightning } from './ILightning';


@Injectable({
  providedIn: 'root'
})

export class LightningService {

  constructor(private httpClient: HttpClient) { }

  // Get List of Lightnings
  getAllLightnings(): Observable<IDataLightning[]> {
    return this.httpClient.get<IDataLightning[]>(environment.apis.lightning.url);
  }

  // Add Lightning
  addLightning(lightning: IAddLightning) {
    const json = {
      name: lightning.name,
      status: false,
      garden: 'api/gardens/'+lightning.garden?.id
    };
    return this.httpClient.post(environment.apis.lightning.url, json);
  }

  // Get Lightning
  getLightning(id: number | null): Observable<ILightning>{
    return this.httpClient.get<ILightning>(environment.apis.lightning.url+'/'+id);
  }

  // Update Status
  updateStatus(status: boolean, id: number): Observable<IDataLightning[]> {
    return this.httpClient.put<IDataLightning[]>(environment.apis.lightning.url+'/'+id, {status});
  }

  // Update Lightning
  updateLightning(lightning: ILightning, id: number | null): Observable<IDataLightning[]> {
    return this.httpClient.put<IDataLightning[]>(environment.apis.lightning.url+'/'+id, lightning);
  }

  // Delete Lightning
  deleteLightning(id: number): Observable<ILightning> {
    return this.httpClient.delete<ILightning>(environment.apis.lightning.url+'/'+id);
  }

}
