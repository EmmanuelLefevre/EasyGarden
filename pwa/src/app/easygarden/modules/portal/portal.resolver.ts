import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// RXJS
import { catchError, forkJoin, Observable, throwError } from 'rxjs';
// Service
import { GardenService } from '../../components/garden/garden.service';
import { PortalService } from './portal.service';
// Models
import { IDataGarden } from '../../components/garden/IGarden';
import { IDataPortal } from './IPortal';


@Injectable({
  providedIn: 'root'
})

export class PortalResolver implements Resolve<{ portals: IDataPortal[], gardens: IDataGarden[] }> {

  constructor(private gardenService: GardenService,
              private portalService: PortalService,
              private router: Router) {}

  resolve(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<{ portals: IDataPortal[], gardens: IDataGarden[] }> {
    const portals$: Observable<IDataPortal[]> = this.portalService.getAllPortals();
    const gardens$: Observable<IDataGarden[]> = this.gardenService.getAllGardens();

    return forkJoin({ portals: portals$, gardens: gardens$ }).pipe(
      catchError(() => {
        this.router.navigate([""]);
        return throwError(() => ('Failed to fetch data.'));
      })
    );
  }

}
