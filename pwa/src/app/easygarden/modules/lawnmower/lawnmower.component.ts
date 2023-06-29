import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// Add ViewEncapsulation for resolve problems with loading custom scss .mat-tooltip-social in style.scss
import { faPowerOff, faPen, faTrash, faSort, faSearch, faSeedling, faXmark } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';

import { MatDialog } from '@angular/material/dialog';
import { IConfirmDialog, ConfirmDialogComponent } from 'src/app/easygarden/components/confirmDialog/confirm-dialog.component';

import { LawnmowerService } from './lawnmower.service';
import { GardenService } from '../../components/garden/garden.service';

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

  // Ngx-paginator
  p: number = 1;
  // Ngx-order
  orderHeader: String = 'name';
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
              private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchLawnmowers();
    this.fetchGardens();
  }

  // Recover Gardens
  fetchGardens(): void {
    this.gardenService.getAllGardens().subscribe((res: any) => {
      if (res.hasOwnProperty('hydra:member'))
      this.gardens = res['hydra:member'];
    });
  }

  // Display Lawnmowers
  fetchLawnmowers(): void {
    this.lawnmowerService.getAllLawnmowers().subscribe((res: any) => {
      if (res.hasOwnProperty('hydra:member'))
        this.lawnmowers = res['hydra:member'];
        this.filterByGarden();
    });
  }

  filterByGarden(): void {
    let selectedGardenId: number | undefined;
    if (typeof this.selectedGardenId === 'string' && this.selectedGardenId !== '') {
      selectedGardenId = parseInt(this.selectedGardenId, 10);
    }
  
    if (!selectedGardenId) {
      this.filteredLawnmowers = [...this.lawnmowers];
    } else {
      this.filteredLawnmowers = this.lawnmowers.filter(lawnmower => {
        if (typeof lawnmower.garden.id === 'number') {
          return lawnmower.garden.id === selectedGardenId;
        }
        return false;
      });
    } 
    // Reset paging
    this.p = 1;
  }

  // Update Status
  updateStatus(id: number, status: boolean): void {
    if (status === true) {
      status = !status;
      this.lawnmowerService.updateStatus(status, id).subscribe((res: any) => {
        this.status = res;
        this.fetchLawnmowers();
      });
    } else if (status === false) {
      status = !status;
      this.lawnmowerService.updateStatus(status, id).subscribe((res: any) => {
        this.status = res;
        this.fetchLawnmowers();
      });
    }
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
