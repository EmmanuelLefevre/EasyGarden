import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/easygarden/components/snackbar/snackbar.component';


@Injectable({
  providedIn: 'root'
})

export class SnackbarService {

  constructor(private snackbar: MatSnackBar) { }

  showNotification(displayMessage: string, messageType: 'created' | 'modified' | 'deleted' | 'logIn-logOut' | 'register') {
    if (messageType === 'logIn-logOut') {
      this.snackbar.openFromComponent(SnackbarComponent, {
        data: {
          message: displayMessage
        },
        duration: 3000,
        panelClass: messageType,
        verticalPosition: 'top',
        horizontalPosition: 'end'
      });
    } else if (messageType === 'register') {
      this.snackbar.openFromComponent(SnackbarComponent, {
        data: {
          message: displayMessage
        },
        duration: 7000,
        panelClass: messageType,
        verticalPosition: 'top',
        horizontalPosition: 'end'
      });
    } else 
      this.snackbar.openFromComponent(SnackbarComponent, {
        data: {
          message: displayMessage
        },
        duration: 4000,
        panelClass: messageType,
        verticalPosition: 'bottom',
        horizontalPosition: 'start'
      });
  }
  
}
