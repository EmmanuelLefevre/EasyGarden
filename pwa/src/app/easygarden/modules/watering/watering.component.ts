import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// Add ViewEncapsulation for resolve problems with loading custom scss .mat-tooltip-social in style.scss
import { faPowerOff, faPen, faTrash, faSort, faSearch, faDroplet, faXmark } from '@fortawesome/free-solid-svg-icons';
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
  orderHeader: String = '';
  isDescOrder: boolean = true;
  sort(headerName:String) {
    this.isDescOrder = !this.isDescOrder;
    this.orderHeader = headerName;
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
  
  // Recover Gardens
  fetchGardens(): void {
    this.gardenService.getAllGardens().subscribe((res: any) => {
      if (res.hasOwnProperty('hydra:member'))
      this.gardens = res['hydra:member'];
    });
  }

  // Display Waterings
  fetchWaterings(): void {
    this.wateringService.getAllWaterings().subscribe((res:any) => {
      if (res.hasOwnProperty('hydra:member'))
      this.waterings = res['hydra:member'];
      this.filterByGarden();
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
    // Reset paging
    this.p = 1;
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
