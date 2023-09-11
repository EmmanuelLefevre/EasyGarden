import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { SnackbarService } from 'src/app/_services/miscellaneous/snackbar.service';


@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})

export class ConfirmDialogComponent implements OnInit {

  title: string;
  message: string;
  value: string;

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: IConfirmDialog,
              private snackbarService: SnackbarService,
              private router: Router) {
    this.title = data.title;
    this.message = data.message;
    this.value = data.value ?? "";
  }

  ngOnInit(): void {
  }

  onConfirm(): void {
    this.dialogRef.close(true);
    // Snackbar
    const url = window.location.href;
    let notificationMessage: string;
    let equipmentString: string;

    const cases = [
      { urlPart: '/easygarden/lawnmower', string: `La tondeuse` },
      { urlPart: '/easygarden/lightning', string: `L'éclairage` },
      { urlPart: '/easygarden/pool', string: `L'équipement de bassin` },
      { urlPart: '/easygarden/portal', string: `Le portail` },
      { urlPart: '/easygarden/watering', string: `L'arrosage` },
      { urlPart: '/easygarden', string: `Le jardin` }
    ];

    const matchedCase = cases.find(item => url.includes(item.urlPart));

    if (matchedCase) {
      equipmentString = matchedCase.string;

      if (this.router.url === '/easygarden') {
        notificationMessage = `${equipmentString} "${this.value}" a été supprimé ainsi que tous ses équipements.`;
      }
      else {
        notificationMessage = `${equipmentString} "${this.value}" a été supprimé.`;
      }
      this.snackbarService.setNotificationMessage(notificationMessage);
    }
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }

}

/**
 * Class to represent confirm dialog model.
 */
export class IConfirmDialog {

  constructor(public title: string, public message: string, public value?: string) {
  }

}
