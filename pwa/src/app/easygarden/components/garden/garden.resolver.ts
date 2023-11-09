import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// RXJS
import { catchError, Observable, throwError, delay } from 'rxjs';
// Service
import { GardenService } from './garden.service';
// Models
import { IDataGarden } from './IGarden';


// @Injectable({
//   providedIn: 'root'
// })

export class GardenResolver implements Resolve<IDataGarden[]> {

  constructor(private gardenService: GardenService,
              private router: Router) {}

  resolve(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<IDataGarden[]> {

    return this.gardenService.getAllGardens().pipe(
      delay(1000),
      catchError(
        () => {
          this.router.navigate([""]);
          return throwError(() => ('No gardens were found.'))
        }
      )
		);
  }

}