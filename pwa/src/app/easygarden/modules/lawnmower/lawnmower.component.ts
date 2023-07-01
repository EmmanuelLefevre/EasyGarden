import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// Add ViewEncapsulation for resolve problems with loading custom scss .mat-tooltip-social in style.scss
import { faPowerOff, faPen, faTrash, faSort, faSearch, faSeedling, faXmark } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';

import { MatDialog } from '@angular/material/dialog';
import { IConfirmDialog, ConfirmDialogComponent } from 'src/app/easygarden/components/confirmDialog/confirm-dialog.component';

import { LawnmowerService } from './lawnmower.service';
import { GardenService } from '../../components/garden/garden.service';
import { GardenFilterService } from '../../_services/garden-filter.service';

import { ILawnmower, ILawnmowerFilter } from './ILawnmower';
import { IName } from '../../_interfaces/IName';


@Component({
  selector: 'app-lawnmower',
  templateUrl: './lawnmower.component.html',
  encapsulation: ViewEncapsulation.None,
})

export class LawnmowerComponent implements OnInit {

  faPowerOff = faPowerOff;
  faPen = faPen;
  faTrash = faTrash;
  faSort = faSort;
  faSearch = faSearch;
  faSeedling = faSeedling;
  faXmark = faXmark;

  name = environment.application.name;
  title = 'Tableau tondeuse';

  // Confirm Dialog this.result = boolean
  result: boolean | undefined;
  // updateStatus()
  status: boolean | undefined;
  // Ngx-pagination
  p: number = 1;
  // Ngx-order
  orderHeader: String = '';
  isDescOrder: boolean = true;
  sort(headerName: String) {
    this.isDescOrder = !this.isDescOrder;
    this.orderHeader = headerName;
  }
  // Ngx-filter
  searchInput: ILawnmowerFilter = { name: '' };
  // Filter by garden
  selectedGardenId: number | '' = '';
  gardens: IName[] = [];

  lawnmowers: ILawnmower[] = [];
  filteredLawnmowers: ILawnmower[] = [];

  constructor(private lawnmowerService: LawnmowerService,
              private gardenService: GardenService,
              private gardenFilterService: GardenFilterService,
              private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchLawnmowers();
    this.fetchGardens();
  }

  // Recover Gardens
  fetchGardens(): void {
    this.gardenService.getAllGardens().subscribe((res: any) => {
      if (res.hasOwnProperty('hydra:member')) {
        this.gardens = res['hydra:member'];
      }
    });
  }

  // Display Lawnmowers
  fetchLawnmowers(): void {
    this.lawnmowerService.getAllLawnmowers().subscribe((res: any) => {
      if (res.hasOwnProperty('hydra:member')) {
        this.filterByGarden();
        this.lawnmowers = res['hydra:member'];
      }
    });
  }

  // Filter by garden
  filterByGarden(): void {
    const selectedGardenId = this.gardenFilterService.convertSelectedGardenId(this.selectedGardenId);
    this.filteredLawnmowers = this.gardenFilterService.filterByGarden(
      this.lawnmowers,
      selectedGardenId,
      'id'
    );
    // Reset pagination
    this.p = 1;
  }

  // Update Status
  updateStatus(id: number, status: boolean): void {
    status = !status;
    this.lawnmowerService.updateStatus(status, id).subscribe((res: any) => {
      this.status = res;
      this.fetchLawnmowers();
    });
  }

  // Delete Lawnmower
  confirmDialog(id: number, name: string): void {
    const value = name;
    const message = `Êtes-vous certain de vouloir supprimer l\'équipement "${name}"?`;
    const dialogData = new IConfirmDialog(
      "Confirmer l'action!",
      message,
      value
    );
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      this.result = dialogResult;
      if (this.result === true) {
        this.lawnmowerService.deleteLawnmower(id).subscribe(() => {
          this.fetchLawnmowers();
        });
      }
    });
  }
}
