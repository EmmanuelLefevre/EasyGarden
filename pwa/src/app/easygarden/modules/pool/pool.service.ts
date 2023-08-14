import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { IPool, IDataPool } from './IPool';
import { IName } from '../../_interfaces/IName';
import { IAdd } from '../../_interfaces/IAdd';


@Injectable({
  providedIn: 'root'
})
export class PoolService {

  constructor(private httpClient: HttpClient) { }

  // Get List of Pools
  getAllPools(): Observable<IDataPool[]> {
    return this.httpClient.get<IDataPool[]>(environment.apis.pool.url);
  }

  // Add Pool
  addData(pool: IAdd) {
    const json = {
      name: pool.name,
      status: false,
      garden: 'api/gardens/'+pool.garden?.id
    };
    return this.httpClient.post(environment.apis.pool.url, json);
  }

  // Get Pool
  getData(id: number | null): Observable<IPool>{
    return this.httpClient.get<IPool>(environment.apis.pool.url+'/'+id);
  }

  // Update Status
  updateStatus(status: boolean, id: number): Observable<IDataPool[]> {
    return this.httpClient.put<IDataPool[]>(environment.apis.pool.url+'/'+id, {status});
  }

  // Update Lawnmower
  updateData(pool: IName, id: number | null): Observable<IDataPool[]> {
    return this.httpClient.put<IDataPool[]>(environment.apis.pool.url+'/'+id, pool);
  }

  // Delete Pool
  deletePool(id: number): Observable<IPool> {
    return this.httpClient.delete<IPool>(environment.apis.pool.url+'/'+id)
  }

  // Get redirection
  getRedirectUrl(): string {
    return '/easygarden/pool';
  }


}
