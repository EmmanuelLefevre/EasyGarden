import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, share } from 'rxjs';
// Environment
import { environment } from 'src/environments/environment';
// Modeles
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
    return this.httpClient.get<IDataPool[]>(environment.apis.pool.url).pipe(share());
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
    // Create a custom HTTP headers object to specify the "lightning" type
    const headers = new HttpHeaders({
      'X-Type': 'pool'
    });
    // Use custom headers in HTTP request
    const options = { headers: headers };
    return this.httpClient.put<IDataPool[]>(environment.apis.pool.url+'/'+id, {status}, options);
  }

  // Update Lawnmower
  updateData(pool: IName, id: number | null): Observable<IDataPool[]> {
    return this.httpClient.put<IDataPool[]>(environment.apis.pool.url+'/'+id, pool);
  }

  // Delete Pool
  deletePool(id: number): Observable<HttpResponse<any>> {
    return this.httpClient.delete(environment.apis.pool.url+'/'+id, { observe: 'response' })
  }

  // Get redirection
  getRedirectUrl(): string {
    return '/easygarden/pool';
  }


}
