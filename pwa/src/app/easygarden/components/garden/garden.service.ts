import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { DecodedTokenService } from 'src/app/_services/miscellaneous/decoded-token.service';

import { IGarden, IDataGarden } from './IGarden';
import { IName } from '../../_interfaces/IName';
import { IAdd } from '../../_interfaces/IAdd';


@Injectable({
  providedIn: 'root'
})

export class GardenService {

  constructor(private httpClient: HttpClient,
              private decodedTokenService: DecodedTokenService) {}

  // Get List of Gardens
  getAllGardens(): Observable<IDataGarden[]> {
    return this.httpClient.get<IDataGarden[]>(environment.apis.garden.url);
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
  deleteGarden(id: number): Observable<IGarden> {
    return this.httpClient.delete<IGarden>(environment.apis.garden.url+'/'+id);
  }

  // Get redirection
  getRedirectUrl(): string {
    return '/easygarden/';
  }


}