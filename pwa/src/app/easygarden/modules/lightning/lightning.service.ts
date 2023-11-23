import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
// RXJS
import { BehaviorSubject, Observable, share, tap } from 'rxjs';
// Environment
import { environment } from 'src/environments/environment';
// Modeles
import { IDataLightning } from './ILightning';
import { IName } from '../../_interfaces/IName';
import { IAdd } from '../../_interfaces/IAdd';


@Injectable({
  providedIn: 'root'
})

export class LightningService {
  // Update status behavior subject
  private updateStatusSubject = new BehaviorSubject<IDataLightning[]>([]);
  public updateStatus$ = this.updateStatusSubject.asObservable();
  // Delete lightning behavior subject
  private deleteLightningSubject = new BehaviorSubject<IDataLightning[]>([]);
  public deleteLightning$ = this.deleteLightningSubject.asObservable();

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

  // Update Status
  updateStatus(status: boolean, id: number): Observable<IDataLightning[]> {
    // Create a custom HTTP headers object to specify the "lightning" type
    const headers = new HttpHeaders({
      'X-Type': 'lightning'
    });
    // Use custom headers in HTTP request
    const options = { headers: headers };
    return this.httpClient.put<IDataLightning[]>(environment.apis.status.url+'/'+id, {status}, options)
    .pipe(
      tap((updatedStatusLightnings$) => {
        // Update data locally
        this.updateStatusSubject.next(updatedStatusLightnings$);
      })
    );
  }

  // Update Lightning
  updateData(lightning: IName, id: number | null): Observable<IDataLightning[]> {
    return this.httpClient.put<IDataLightning[]>(environment.apis.lightning.url+'/'+id, lightning);
  }

  // Delete Lightning
  deleteLightning(id: number): Observable<HttpResponse<any>> {
    return this.httpClient.delete(environment.apis.lightning.url + '/' + id, { observe: 'response' })
    .pipe(
      tap(() => {
        const deletedLightnings = this.deleteLightningSubject.getValue().filter(lightning => lightning.id !== id);
        this.deleteLightningSubject.next(deletedLightnings);
      })
    );
  }

  // Get redirection
  getRedirectUrl(): string {
    return '/easygarden/lightning';
  }

}
