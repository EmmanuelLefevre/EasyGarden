import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
// Services
import { AuthGuardService } from '../guard/auth.guard';
import { DecodedTokenService } from '../miscellaneous/decoded-token.service';
import { SnackbarService } from '../miscellaneous/snackbar.service';
import { TokenService } from '../auth/token.service';


@Injectable({
  providedIn: 'root'
})

export class AuthInterceptor implements HttpInterceptor {

  constructor(private authGuardService: AuthGuardService,
              private decodedTokenService: DecodedTokenService,
              private router: Router,
              private snackbarService: SnackbarService,
              private tokenService: TokenService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const token = this.tokenService.getToken();

    // IF token to insert in the header
    if (token !== null) {

      // Check the token expiration
      if (this.tokenService.isTokenExpired(token)) {
        // Token has expired so we display notification, we delete it and we redirect to the login page
        this.snackbarService.showNotification(
          `Votre session a expiré `
          + `${this.decodedTokenService.firstNameDecoded()} `
          + `${this.decodedTokenService.lastNameDecoded()}, `
          +` veuillez vous reconnecter!`
          ,'orange-alert'
        );
        this.tokenService.clearToken();
        this.router.navigate(['/login']);

        return throwError(() => new Error('Session expired!'));
      }
      // Add token to request headers
      const clone = request.clone({
        headers: request.headers.set('Authorization', 'bearer '+ token)
      });

      return next.handle(clone).pipe(
        catchError(error => {
          // Check access permission
          if (error instanceof HttpErrorResponse &&
              error.status === 401 
              && this.authGuardService.canActivate()
              && !request.url.endsWith('/login_check')) {
            // Access denied so we display notification
            this.snackbarService.showNotification(
              `Vous n'êtes pas autorisé à accéder à cette partie de l'application `
              + `${this.decodedTokenService.firstNameDecoded()} `
              + `${this.decodedTokenService.lastNameDecoded()}!`,
              'red-alert'
            );
          }
          return throwError(() => new Error('Unauthorized part of the application!'));
        })
      );
    }
    
    return next.handle(request)
  }
}

export const AUTHInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
}
