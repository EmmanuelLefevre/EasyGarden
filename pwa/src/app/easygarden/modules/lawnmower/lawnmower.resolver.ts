import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { catchError, Observable, throwError, delay } from 'rxjs';

import { LawnmowerService } from './lawnmower.service';
import { IDataLawnmower } from './ILawnmower';


@Injectable({
  providedIn: 'root'
})

export class LawnmowerResolver implements Resolve<IDataLawnmower[]> {

  constructor(private lawnmowerService: LawnmowerService,
              private router: Router) {}

  resolve(_route: ActivatedRouteSnapshot): Observable<IDataLawnmower[]> {
    return this.lawnmowerService.getAllLawnmowers().pipe(
      // delay(1000),
      catchError(
        () => {
          this.router.navigate([""]);
          return throwError(() => ('Aucune tondeuse n\'a été trouvée.'))
        }
      )
    );
  }

}
