import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { catchError, Observable, throwError, delay } from 'rxjs';

import { WateringService } from './watering.service';
import { IDataWatering } from './IWatering';


@Injectable({
  providedIn: 'root'
})

export class WateringResolver implements Resolve<IDataWatering[]> {

  constructor(private wateringService: WateringService,
              private router: Router) {}

  resolve(_route: ActivatedRouteSnapshot): Observable<IDataWatering[]> {
    return this.wateringService.getAllWaterings().pipe(
      // delay(1000),
      catchError(
        () => {
          this.router.navigate([""]);
          return throwError(() => ('Aucun arrosage n\'a été trouvé.'))
        }
      )
    );
  }

}
