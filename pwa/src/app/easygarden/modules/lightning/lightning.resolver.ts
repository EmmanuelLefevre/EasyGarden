import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// RXJS
import { catchError, forkJoin, Observable, throwError } from 'rxjs';
// Service
import { GardenService } from '../../components/garden/garden.service';
import { LightningService } from './lightning.service';
// Models
import { IDataGarden } from '../../components/garden/IGarden';
import { IDataLightning } from './ILightning';


@Injectable({
  providedIn: 'root'
})

export class LightningResolver implements Resolve<{ lightnings: IDataLightning[], gardens: IDataGarden[] }> {

  constructor(private gardenService: GardenService,
              private lightningService: LightningService,
              private router: Router) {}

  resolve(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<{ lightnings: IDataLightning[], gardens: IDataGarden[] }> {
    const lightnings$: Observable<IDataLightning[]> = this.lightningService.getAllLightnings();
    const gardens$: Observable<IDataGarden[]> = this.gardenService.getAllGardens();

    return forkJoin({ lightnings: lightnings$, gardens: gardens$ }).pipe(
      catchError(() => {
        this.router.navigate([""]);
        return throwError(() => ('Failed to fetch data.'));
      })
    );
  }

}
