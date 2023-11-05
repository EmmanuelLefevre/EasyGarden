import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
// Add ViewEncapsulation for resolve problems with loading custom scss from the service snackbar.service.ts at property panelClass: ['snackbar-animation']
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class SnackbarComponent implements OnInit {

  message: ISnackbar;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any,
              public snackBar: MatSnackBar) {
    this.message = data.message;
  }

  ngOnInit(): void {}

}

/**
 * Class to represent snackbar model.
 */
 export class ISnackbar {

  constructor(public message: string) {}

}
