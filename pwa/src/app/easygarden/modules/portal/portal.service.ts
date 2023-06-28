import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { IPortal, IAddPortal, IDataPortal } from './IPortal';
import { IName } from '../../_interfaces/IName';


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
  addPortal(portal: IAddPortal) {
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
    return this.httpClient.put<IDataPortal[]>(environment.apis.portal.url+'/'+id, {status});
  }

  // Update Portal
  updateData(portal: IName, id: number | null): Observable<IDataPortal[]> {
    return this.httpClient.put<IDataPortal[]>(environment.apis.portal.url+'/'+id, portal);
  }

  // Delete Portal
  deletePortal(id: number): Observable<IPortal> {
    return this.httpClient.delete<IPortal>(environment.apis.portal.url+'/'+id)
  }

  // Get redirection
  getRedirectUrl(): string {
    return '/easygarden/portal/';
  }


}
