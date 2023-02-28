import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { SnackbarService } from 'src/app/_services/service/snackbar.service';

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
    if (this.router.url === '/easygarden') {
      this.snackbarService.showNotification(`Le jardin "${this.value}" a bien 
        été supprimé ainsi que tous ses équipements.`, 'deleted');
    }
    else this.snackbarService.showNotification(`L\'équipement "${this.value}" 
      a bien été supprimé.`, 'deleted');
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
