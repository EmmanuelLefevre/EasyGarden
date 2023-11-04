import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
// RXJS
import { BehaviorSubject, Observable, share, tap } from 'rxjs';
// Environment
import { environment } from 'src/environments/environment';
// Modeles
import { IPortal, IDataPortal } from './IPortal';
import { IName } from '../../_interfaces/IName';
import { IAdd } from '../../_interfaces/IAdd';


@Injectable({
  providedIn: 'root'
})

export class PortalService {
  // Update status behavior subject
  private updateStatusSubject = new BehaviorSubject<IDataPortal[]>([]);
  public updateStatus$ = this.updateStatusSubject.asObservable();
  // Delete portal behavior subject
  private deletePortalSubject = new BehaviorSubject<IDataPortal[]>([]);
  public deletePortal$ = this.deletePortalSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  // Get List of Portals
  getAllPortals(): Observable<IDataPortal[]> {
    return this.httpClient.get<IDataPortal[]>(environment.apis.portal.url).pipe(share());
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
    return this.httpClient.put<IDataPortal[]>(environment.apis.portal.url+'/'+id, {status}, options)
    .pipe(
      tap((updatedStatusPortals$) => {
        // Update data locally
        this.updateStatusSubject.next(updatedStatusPortals$);
      })
    );
  }

  // Update Portal
  updateData(portal: IName, id: number | null): Observable<IDataPortal[]> {
    return this.httpClient.put<IDataPortal[]>(environment.apis.portal.url+'/'+id, portal);
  }

  // Delete Portal
  deletePortal(id: number): Observable<HttpResponse<any>> {
    return this.httpClient.delete(environment.apis.portal.url+'/'+id, { observe: 'response' })
    .pipe(
      tap(() => {
        const deletedPortals = this.deletePortalSubject.getValue().filter(portal => portal.id !== id);
        this.deletePortalSubject.next(deletedPortals);
      })
    );
  }

  // Get redirection
  getRedirectUrl(): string {
    return '/easygarden/portal';
  }

}
