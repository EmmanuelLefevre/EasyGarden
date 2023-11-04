import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
// RXJS
import { BehaviorSubject, Observable, share, tap } from 'rxjs';
// Environment
import { environment } from 'src/environments/environment';
// Services
import { SnackbarService } from 'src/app/_services/miscellaneous/snackbar.service';
// Modeles
import { ILightning, IDataLightning } from './ILightning';
import { IName } from '../../_interfaces/IName';
import { IAdd } from '../../_interfaces/IAdd';


@Injectable({
  providedIn: 'root'
})

export class LightningService {
  private lightningsSubject = new BehaviorSubject<IDataLightning[]>([]);
  public lightnings$ = this.lightningsSubject.asObservable();

  constructor(private httpClient: HttpClient,
              private snackbarService: SnackbarService) { }

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
    return this.httpClient.put<IDataLightning[]>(environment.apis.status.url+'/'+id, {status}, options)
    .pipe(
      tap((updatedLightnings$) => {
        // Update data locally
        this.lightningsSubject.next(updatedLightnings$);
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
        tap((res$) => {
          if (res$.status === 204) {
            this.refreshData();
            const notificationMessage = this.snackbarService.getNotificationMessage();
            this.snackbarService.showNotification(notificationMessage, 'deleted');
          } else {
            this.snackbarService.showNotification(
              `Une erreur s'est produite lors de la suppression!`,
              'red-alert'
            );
          }
        })
      );
  }
  refreshData() {
    this.getAllLightnings()
      .subscribe((deletedLightnings$) => {
        this.lightningsSubject.next(deletedLightnings$);
      });
  }

  // Get redirection
  getRedirectUrl(): string {
    return '/easygarden/lightning';
  }

}
