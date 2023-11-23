import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
// RXJS
import { BehaviorSubject, Observable, share, tap } from 'rxjs';
// Environment
import { environment } from 'src/environments/environment';
// Modeles
import { IDataLawnmower } from './ILawnmower';
import { IName } from '../../_interfaces/IName';
import { IAdd } from '../../_interfaces/IAdd';


@Injectable({
  providedIn: 'root'
})

export class LawnmowerService {
  // Update status behavior subject
  private updateStatusSubject = new BehaviorSubject<IDataLawnmower[]>([]);
  public updateStatus$ = this.updateStatusSubject.asObservable();
  // Delete lawnmower behavior subject
  private deleteLawnmowerSubject = new BehaviorSubject<IDataLawnmower[]>([]);
  public deleteLawnmower$ = this.deleteLawnmowerSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  // Get List of Lawnmowers
  getAllLawnmowers(): Observable<IDataLawnmower[]> {
    return this.httpClient.get<IDataLawnmower[]>(environment.apis.lawnmower.url).pipe(share());
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

  // Update Status
  updateStatus(status: boolean, id: number): Observable<IDataLawnmower[]> {
    // Create a custom HTTP headers object to specify the "lightning" type
    const headers = new HttpHeaders({
      'X-Type': 'lawnmower'
    });
    // Use custom headers in HTTP request
    const options = { headers: headers };
    return this.httpClient.put<IDataLawnmower[]>(environment.apis.status.url+'/'+id, {status}, options)
    .pipe(
      tap((updatedStatusLawnmowers$) => {
        // Update data locally
        this.updateStatusSubject.next(updatedStatusLawnmowers$);
      })
    );
  }

  // Update Lawnmower
  updateData(lawnmower: IName, id: number | null): Observable<IDataLawnmower[]> {
    return this.httpClient.put<IDataLawnmower[]>(environment.apis.lawnmower.url+'/'+id, lawnmower);
  }

  // Delete Lawnmower
  deleteLawnmower(id: number): Observable<HttpResponse<any>> {
    return this.httpClient.delete(environment.apis.lawnmower.url+'/'+id, { observe: 'response' })
    .pipe(
      tap(() => {
        const deletedLawnmowers = this.deleteLawnmowerSubject.getValue().filter(lawnmower => lawnmower.id !== id);
        this.deleteLawnmowerSubject.next(deletedLawnmowers);
      })
    );
  }

  // Get redirection
  getRedirectUrl(): string {
    return '/easygarden/lawnmower';
  }

}
