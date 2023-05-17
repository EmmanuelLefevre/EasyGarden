import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// Add ViewEncapsulation for resolve problems with loading custom scss .mat-tooltip-social in style.scss
import { faPowerOff, faPen, faTrash, faSort, faSearch, faDroplet, faXmark } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';

import { MatDialog } from '@angular/material/dialog';
import { IConfirmDialog, ConfirmDialogComponent } from 'src/app/easygarden/components/confirmDialog/confirm-dialog.component';

import { WateringService } from '../../watering.service';

import { IWatering, IWateringFilter } from '../../IWatering';


@Component({
  selector: 'app-watering',
  templateUrl: './watering.component.html',
  encapsulation: ViewEncapsulation.None
})

export class WateringComponent implements OnInit {

  faPowerOff = faPowerOff;
  faPen = faPen;
  faTrash = faTrash;
  faSort = faSort;
  faSearch = faSearch;
  faDroplet = faDroplet;
  faXmark = faXmark;

  name = environment.application.name;
  title = "Tableau arrosage";

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
  searchInput: IWateringFilter = { name: ''};

  waterings: IWatering[] = [];

  constructor(private wateringService: WateringService,
              private dialog: MatDialog) {}
  
  ngOnInit(): void {
    this.fetchWaterings();
  }
  
  // Display Waterings
  fetchWaterings(): void {
    this.wateringService.getAllWaterings()
      .subscribe(
        (res:any) => {
          if (res.hasOwnProperty('hydra:member'))
          this.waterings = res['hydra:member'];
        }
      )
  }

  // Update Status
  updateStatus(id: number, status: boolean): void {
    if (status === true) {
      status = !status;
      this.wateringService.updateStatus(status, id)
        .subscribe(
          (res:any) => {
            this.status = res;
            this.fetchWaterings();
          }
        )
    } else if (status === false) {
      status = !status;
      this.wateringService.updateStatus(status, id)
        .subscribe(
          (res:any) => {
            this.status = res;
            this.fetchWaterings();
          }
        )
    }
  }

  // Delete Watering
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
        this.wateringService.deleteWatering(id).subscribe(
          () => {
            this.fetchWaterings();
          }
        )
      }   
    })
  }

}
