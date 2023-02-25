import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// Add ViewEncapsulation for resolve problems with loading custom scss .mat-tooltip-social in style.scss
import { faPowerOff, faPen, faTrash, faSort, faSearch, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';

import { MatDialog } from '@angular/material/dialog';
import { IConfirmDialog, ConfirmDialogComponent } from 'src/app/easygarden/components/confirmDialog/confirmDialogComponent/confirm-dialog.component';

import { LightningService } from '../../lightning.service';

import { ILightning, ILightningFilter } from '../../ILightning';


@Component({
  selector: 'app-lightning',
  templateUrl: './lightning.component.html',
  encapsulation: ViewEncapsulation.None
})

export class LightningComponent implements OnInit {

  faPowerOff = faPowerOff;
  faPen = faPen;
  faTrash = faTrash;
  faSort = faSort;
  faSearch = faSearch;
  faLightbulb = faLightbulb;

  name = environment.application.name;
  title = "Tableau éclairage";

  // Confirm Dialog this.result = boolean
  result: boolean | undefined;

  // updateStatus()
  status: boolean | undefined;

  // Ngx-paginator
  p: number = 1;
  // Ngx-order
  orderHeader: String = 'name';
  isDescOrder: boolean = true;
  sort(headerName:String) {
    this.isDescOrder = !this.isDescOrder;
    this.orderHeader = headerName;
  }
  // Ngx-filter
  searchInput: ILightningFilter = { name: ''};
  clearInput() {
    this.searchInput.name = '';
  }

  lightnings: ILightning[] = [];

  constructor(private lightningService: LightningService,
              private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchLightnings();
  }

  // Display Lightnings
  fetchLightnings(): void {
    this.lightningService.getAllLightnings()
      .subscribe(
        (res:any) => {
          if (res.hasOwnProperty('hydra:member')) 
          this.lightnings = res['hydra:member'];
        }
      )
  }

  // Update Status
  updateStatus(id: number, status: boolean): void {
    if (status === true) {
      status = !status;
      this.lightningService.updateStatus(status, id)
        .subscribe(
          (res:any) => {
            this.status = res;
            this.fetchLightnings();
          }
        )
    } else if (status === false) {
      status = !status;
      this.lightningService.updateStatus(status, id)
        .subscribe(
          (res:any) => {
            this.status = res;
            this.fetchLightnings();
          }
        )
    }
  }

  // Delete Lightning
  confirmDialog(id: number, name: string): void {
    const value = name;
    const message = `Êtes-vous certain de vouloir supprimer l\'équipement "${name}"?`;
    const dialogData = new IConfirmDialog("Confirmer l'action!", message, value);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    })
    
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      if (this.result === true) {
        this.lightningService.deleteLightning(id).subscribe(
          () => {
            this.fetchLightnings();
          }
        )
      }   
    })
  }

}
