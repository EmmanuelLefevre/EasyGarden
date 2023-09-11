import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Observable, share } from 'rxjs';
// Environment
import { environment } from 'src/environments/environment';
// Services
import { DecodedTokenService } from 'src/app/_services/miscellaneous/decoded-token.service';
// Modeles
import { IGarden, IDataGarden } from './IGarden';
import { IName } from '../../_interfaces/IName';
import { IAdd } from '../../_interfaces/IAdd';


@Injectable({
  providedIn: 'root'
})

export class GardenService {

  constructor(private httpClient: HttpClient,
              private decodedTokenService: DecodedTokenService,
              private location: Location) {}

  // Get List of Gardens
  getAllGardens(): Observable<IDataGarden[]> {
    return this.httpClient.get<IDataGarden[]>(environment.apis.garden.url).pipe(share());
  }

  // Add Garden
  addData(garden: IAdd) {
    let id = this.decodedTokenService.idDecoded()
    const json = {
      name: garden.name,
      user: 'api/users/'+id
    };
    return this.httpClient.post(environment.apis.garden.url, json);
  }

  // Get Garden
  getData(id: number | null): Observable<IGarden>{
    return this.httpClient.get<IGarden>(environment.apis.garden.url+'/'+id);
  }

  // Update Garden
  updateData(garden: IName, id: number | null): Observable<IDataGarden[]> {
    return this.httpClient.put<IDataGarden[]>(environment.apis.garden.url+'/'+id, garden);
  }

  // Delete Garden
  deleteGarden(id: number): Observable<HttpResponse<any>> {
    return this.httpClient.delete(environment.apis.garden.url+'/'+id, { observe: 'response' });
  }

  // Get redirection
  getRedirectUrl(): string | null {
    if (window.history.length > 1) {
      this.location.back();
      return '';
    }
    else {
      return null;
    }
  }

}