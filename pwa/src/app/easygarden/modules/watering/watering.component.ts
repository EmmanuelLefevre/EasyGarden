import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
// Add ViewEncapsulation for resolve problems with loading custom scss .mat-tooltip-social in style.scss
import { faPowerOff, faPen, faTrash, faSort, faSearch, faDroplet, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

import { MatDialog } from '@angular/material/dialog';
import { IConfirmDialog, ConfirmDialogComponent } from 'src/app/easygarden/components/confirmDialog/confirm-dialog.component';

import { WateringService } from './watering.service';
import { GardenService } from '../../components/garden/garden.service';
import { GardenFilterService } from '../../_services/garden-filter.service';

import { IWatering, IWateringFilter } from './IWatering';
import { IName } from '../../_interfaces/IName';


@Component({
  selector: 'app-watering',
  templateUrl: './watering.component.html',
  encapsulation: ViewEncapsulation.None
})

export class WateringComponent implements OnInit, OnDestroy {

  faPowerOff = faPowerOff;
  faPen = faPen;
  faTrash = faTrash;
  faSort = faSort;
  faSearch = faSearch;
  faDroplet = faDroplet;
  faXmark = faXmark;

  name = environment.application.name;
  title = "Tableau arrosage";

  // Declaration of subscriptions
  private getAllGardensSubscription!: Subscription;
  private getAllWateringsSubscription!: Subscription;
  private deleteWateringSubscription!: Subscription;
  private updateStatusSubscription!: Subscription;
  private dialogRefSubscription!: Subscription;

  // Confirm Dialog this.result = boolean
  result: boolean | undefined;
  // updateStatus()
  status: boolean | undefined;
  // Ngx-pagination
  p: number = 1;
  count: number = 0;
  // Ngx-order
  orderHeader: String = '';
  isDescOrder: boolean = true;
  sort(headerName:String) {
    this.isDescOrder = !this.isDescOrder;
    this.orderHeader = headerName;
    this.resetPagination();
  }
  // Ngx-filter
  searchInput: IWateringFilter = { name: ''};
  // Filter by garden
  selectedGardenId: number | '' = '';
  gardens: IName[] = [];

  waterings: IWatering[] = [];
  filteredWaterings: IWatering[] = [];

  constructor(private wateringService: WateringService,
              private gardenService: GardenService,
              private gardenFilterService: GardenFilterService,
              private dialog: MatDialog) {}
  
  ngOnInit(): void {
    this.fetchWaterings();
    this.fetchGardens();
  }

  ngOnDestroy(): void {
    if (this.getAllGardensSubscription) {
      this.getAllGardensSubscription.unsubscribe();
    }
    if (this.getAllWateringsSubscription) {
      this.getAllWateringsSubscription.unsubscribe();
    }
    if (this.deleteWateringSubscription) {
      this.deleteWateringSubscription.unsubscribe();
    }
    if (this.updateStatusSubscription) {
      this.updateStatusSubscription.unsubscribe();
    }
    if (this.dialogRefSubscription) {
      this.dialogRefSubscription.unsubscribe();
    }
  }
  
  // Recover Gardens
  fetchGardens(): void {
    this.getAllGardensSubscription = this.gardenService.getAllGardens()
      .subscribe((res: any) => {
        if (res.hasOwnProperty('hydra:member')) {
          this.gardens = res['hydra:member'];
        }
      });
  }

  // Display Waterings
  fetchWaterings(): void {
    this.getAllWateringsSubscription = this.wateringService.getAllWaterings()
      .subscribe((res:any) => {
        if (res.hasOwnProperty('hydra:member')) {
          this.waterings = res['hydra:member'];
          this.filterByGarden();
        }
      });
  }

  // Filter by garden
  filterByGarden(): void {
    const selectedGardenId = this.gardenFilterService.convertSelectedGardenId(this.selectedGardenId);
    this.filteredWaterings = this.gardenFilterService.filterByGarden(
      this.waterings,
      selectedGardenId,
      'id'
    );
    // Reset pagination
    this.resetPagination();
  }

  // Update Status
  updateStatus(id: number, status: boolean): void {
    status = !status;
    this.updateStatusSubscription = this.wateringService.updateStatus(status, id)
      .subscribe((res: any) => {
        this.status = res;
        this.fetchWaterings();
      });
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
    
    this.dialogRefSubscription = dialogRef.afterClosed()
      .subscribe(dialogResult => {
        this.result = dialogResult;
        if (this.result === true) {
          this.deleteWateringSubscription = this.wateringService.deleteWatering(id)
            .subscribe(
              () => {
                this.fetchWaterings();
              }
            )
        }   
      })
  }

  resetPagination(): void {
    this.p = 1;
  }

}
