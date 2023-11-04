import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// RXJS
import { catchError, forkJoin, Observable, throwError } from 'rxjs';
// Service
import { GardenService } from '../../components/garden/garden.service';
import { WateringService } from './watering.service';
// Models
import { IDataGarden } from '../../components/garden/IGarden';
import { IDataWatering } from './IWatering';


@Injectable({
  providedIn: 'root'
})

export class WateringResolver implements Resolve<{ waterings: IDataWatering[], gardens: IDataGarden[] }> {

  constructor(private gardenService: GardenService,
              private wateringService: WateringService,
              private router: Router) {}

  resolve(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<{ waterings: IDataWatering[], gardens: IDataGarden[] }> {
    const waterings$: Observable<IDataWatering[]> = this.wateringService.getAllWaterings();
    const gardens$: Observable<IDataGarden[]> = this.gardenService.getAllGardens();

    return forkJoin({ waterings: waterings$, gardens: gardens$ }).pipe(
      catchError(() => {
        this.router.navigate([""]);
        return throwError(() => ('Failed to fetch data.'));
      })
    );
  }

}
