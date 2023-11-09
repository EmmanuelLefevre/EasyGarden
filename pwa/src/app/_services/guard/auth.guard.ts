import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
// Service
import { AuthService } from '../auth/auth.service';
import { TokenService } from '../../_services/auth/token.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router,
              private tokenService: TokenService) { }

  canActivate(
    _route?: ActivatedRouteSnapshot,
    _state?: RouterStateSnapshot):
      Observable<boolean | UrlTree>
      | Promise<boolean | UrlTree>
      | boolean
      | UrlTree {

      if (this.tokenService.isToken()) {
        return true;
        // return this.authService.isUserLogged()
        //   .pipe(map((isUserLogged) => isUserLogged));
      }

    return this.router.navigate(['/']);

  }

}