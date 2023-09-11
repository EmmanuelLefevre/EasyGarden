import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, share } from 'rxjs';
// Environment
import { environment } from 'src/environments/environment';
// Modeles
import { ILightning, IDataLightning } from './ILightning';
import { IName } from '../../_interfaces/IName';
import { IAdd } from '../../_interfaces/IAdd';


@Injectable({
  providedIn: 'root'
})

export class LightningService {

  constructor(private httpClient: HttpClient) { }

  // Get List of Lightnings
  getAllLightnings(): Observable<IDataLightning[]> {
    return this.httpClient.get<IDataLightning[]>(environment.apis.lightning.url).pipe(share());
  }

  // Add Lightning
  addData(lightning: IAdd) {
    const json = {
      name: lightning.name,
      status: false,
      garden: 'api/gardens/'+lightning.garden?.id
    };
    return this.httpClient.post(environment.apis.lightning.url, json);
  }

  // Get Lightning
  getData(id: number | null): Observable<ILightning>{
    return this.httpClient.get<ILightning>(environment.apis.lightning.url+'/'+id);
  }

  // Update Status
  updateStatus(status: boolean, id: number): Observable<IDataLightning[]> {
    // Create a custom HTTP headers object to specify the "lightning" type
    const headers = new HttpHeaders({
      'X-Type': 'lightning'
    });
    // Use custom headers in HTTP request
    const options = { headers: headers };
    return this.httpClient.put<IDataLightning[]>(environment.apis.status.url+'/'+id, {status}, options);
  }

  // Update Lightning
  updateData(lightning: IName, id: number | null): Observable<IDataLightning[]> {
    return this.httpClient.put<IDataLightning[]>(environment.apis.lightning.url+'/'+id, lightning);
  }

  // Delete Lightning
  deleteLightning(id: number): Observable<HttpResponse<any>> {
    return this.httpClient.delete(environment.apis.lightning.url+'/'+id, { observe: 'response' });
  }

  // Get redirection
  getRedirectUrl(): string {
    return '/easygarden/lightning';
  }

}
