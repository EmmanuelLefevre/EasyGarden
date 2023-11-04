import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// RXJS
import { catchError, Observable, throwError, forkJoin } from 'rxjs';
// Service
import { GardenService } from '../../components/garden/garden.service';
import { LawnmowerService } from './lawnmower.service';
// Models
import { IDataLawnmower } from './ILawnmower';
import { IDataGarden } from '../../components/garden/IGarden';


@Injectable({
  providedIn: 'root'
})

export class LawnmowerResolver implements Resolve<{ lawnmowers: IDataLawnmower[], gardens: IDataGarden[] }> {

  constructor(private gardenService: GardenService,
              private lawnmowerService: LawnmowerService,
              private router: Router) {}

  resolve(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<{ lawnmowers: IDataLawnmower[], gardens: IDataGarden[] }> {
    const lawnmowers$: Observable<IDataLawnmower[]> = this.lawnmowerService.getAllLawnmowers();
    const gardens$: Observable<IDataGarden[]> = this.gardenService.getAllGardens();

    return forkJoin({ lawnmowers: lawnmowers$, gardens: gardens$ }).pipe(
      catchError(() => {
        this.router.navigate([""]);
        return throwError(() => ('Failed to fetch data.'));
      })
    );
  }

}
