import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { IPortal, IDataPortal } from './IPortal';
import { IName } from '../../_interfaces/IName';
import { IAdd } from '../../_interfaces/IAdd';


@Injectable({
  providedIn: 'root'
})

export class PortalService {

  constructor(private httpClient: HttpClient) { }

  // Get List of Portals
  getAllPortals(): Observable<IDataPortal[]> {
    return this.httpClient.get<IDataPortal[]>(environment.apis.portal.url);
  }

  // Add Portal
  addData(portal: IAdd) {
    const json = {
      name: portal.name,
      status: false,
      presenceSensor: false,
      garden: 'api/gardens/'+portal.garden?.id
    };
    return this.httpClient.post(environment.apis.portal.url, json);
  }

  // Get Portal
  getData(id: number | null): Observable<IPortal>{
    return this.httpClient.get<IPortal>(environment.apis.portal.url+'/'+id);
  }

  // Update Status
  updateStatus(status: boolean, id: number): Observable<IDataPortal[]> {
    // Create a custom HTTP headers object to specify the "lightning" type
    const headers = new HttpHeaders({
      'X-Type': 'portal'
    });
    // Use custom headers in HTTP request
    const options = { headers: headers };
    return this.httpClient.put<IDataPortal[]>(environment.apis.portal.url+'/'+id, {status}, options);
  }

  // Update Portal
  updateData(portal: IName, id: number | null): Observable<IDataPortal[]> {
    return this.httpClient.put<IDataPortal[]>(environment.apis.portal.url+'/'+id, portal);
  }

  // Delete Portal
  deletePortal(id: number): Observable<HttpResponse<any>> {
    return this.httpClient.delete(environment.apis.portal.url+'/'+id, { observe: 'response' })
  }

  // Get redirection
  getRedirectUrl(): string {
    return '/easygarden/portal';
  }

}
