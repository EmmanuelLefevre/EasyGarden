import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { catchError, Observable, throwError, delay } from 'rxjs';

import { LightningService } from './lightning.service';
import { IDataLightning } from './ILightning';


@Injectable({
  providedIn: 'root'
})

export class LightningResolver implements Resolve<IDataLightning[]> {
  
  constructor(private lightningService: LightningService,
              private router: Router) {}

  resolve(_route: ActivatedRouteSnapshot): Observable<IDataLightning[]> {
    return this.lightningService.getAllLightnings().pipe(
      // delay(1000),
      catchError(
        () => {
          this.router.navigate([""]);
          return throwError(() => ('No lightnings were found.'))
        }
      )
    );
  }
  
}
