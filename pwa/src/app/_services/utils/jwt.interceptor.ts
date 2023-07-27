import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

import { DecodedTokenService } from '../miscellaneous/decoded-token.service';
import { SnackbarService } from '../miscellaneous/snackbar.service';
import { TokenService } from '../../_services/auth/token.service';


@Injectable({
  providedIn: 'root'
})

export class JwtInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService,
              private router: Router,
              private snackbarService: SnackbarService,
              private decodedTokenService: DecodedTokenService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const token = this.tokenService.getToken();

    // IF token to insert in the header
    if (token !== null) {

      // Check the token expiration
      if (this.tokenService.isTokenExpired(token)) {
        // The token has expired so we delete it, we disconnect the user and we redirect to the login page
        this.snackbarService.showNotification(`Votre session a expiré 
          ${this.decodedTokenService.firstNameDecoded()} ${this.decodedTokenService.lastNameDecoded()}, 
          veuillez vous reconnecter!`, 'account-not-verified');
        this.tokenService.clearToken();
        this.router.navigate(['/login']);

        return throwError(() => new Error('Session Expired.'));
      }

      // Add token to request headers
      const clone = request.clone({
        headers: request.headers.set('Authorization', 'bearer '+token)
      });

      return next.handle(clone).pipe(
        catchError(error => {
          if (error.status === 401){
            this.snackbarService.showNotification(`Votre session a expiré 
              ${this.decodedTokenService.firstNameDecoded()} ${this.decodedTokenService.lastNameDecoded()}, 
              veuillez vous reconnecter!`, 'account-not-verified');
            this.tokenService.clearToken();
            this.router.navigate(['/login']);
          }

          return throwError(() => new Error('Session Expired.'));
        })
      )
    }
    
    return next.handle(request)

  }

}

export const JWTInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: JwtInterceptor,
  multi: true
}
