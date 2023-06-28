import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { IWatering, IDataWatering } from './IWatering';
import { IName } from '../../_interfaces/IName';
import { IAdd } from '../../_interfaces/IAdd';


@Injectable({
  providedIn: 'root'
})

export class WateringService {
  
  constructor(private httpClient: HttpClient) { }
  
  // Get List of Waterings
  getAllWaterings(): Observable<IDataWatering[]> {
    return this.httpClient.get<IDataWatering[]>(environment.apis.watering.url);
  }

  // Add Watering
  addData(watering: IAdd) {
    const json = {
      name: watering.name,
      status: false,
      flowSensor: 'NC',
      pressureSensor: 'NC',
      garden: 'api/gardens/'+watering.garden?.id
    };
    return this.httpClient.post(environment.apis.watering.url, json);
  }

  // Get Watering
  getData(id: number | null): Observable<IWatering>{
    return this.httpClient.get<IWatering>(environment.apis.watering.url+'/'+id);
  }

  // Update Status
  updateStatus(status: boolean, id: number): Observable<IDataWatering[]> {
    return this.httpClient.put<IDataWatering[]>(environment.apis.watering.url+'/'+id, {status});
  }

  // Update Watering
  updateData(watering: IName, id: number | null): Observable<IDataWatering[]> {
    return this.httpClient.put<IDataWatering[]>(environment.apis.watering.url+'/'+id, watering);
  }

  // Delete Watering
  deleteWatering(id: number): Observable<IWatering> {
    return this.httpClient.delete<IWatering>(environment.apis.watering.url+'/'+id);
  }

  // Get redirection
  getRedirectUrl(): string {
    return '/easygarden/watering/';
  }
  
}
