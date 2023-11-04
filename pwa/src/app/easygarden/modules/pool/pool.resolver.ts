import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// RXJS
import { catchError, forkJoin, Observable, throwError } from 'rxjs';
// Service
import { GardenService } from '../../components/garden/garden.service';
import { PoolService } from './pool.service';
// Models
import { IDataGarden } from '../../components/garden/IGarden';
import { IDataPool } from './IPool';


@Injectable({
  providedIn: 'root'
})

export class PoolResolver implements Resolve<{ pools: IDataPool[], gardens: IDataGarden[] }> {

  constructor(private gardenService: GardenService,
              private poolService: PoolService,
              private router: Router) {}

  resolve(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<{ pools: IDataPool[], gardens: IDataGarden[] }> {
    const pools$: Observable<IDataPool[]> = this.poolService.getAllPools();
    const gardens$: Observable<IDataGarden[]> = this.gardenService.getAllGardens();

    return forkJoin({ pools: pools$, gardens: gardens$ }).pipe(
      catchError(() => {
        this.router.navigate([""]);
        return throwError(() => ('Failed to fetch data.'));
      })
    );
  }

}
