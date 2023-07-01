import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// Add ViewEncapsulation for resolve problems with loading custom scss .mat-tooltip-social in style.scss
import { faPowerOff, faPen, faTrash, faSort, faSearch, faFish, faXmark } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';

import { MatDialog } from '@angular/material/dialog';
import { IConfirmDialog, ConfirmDialogComponent } from 'src/app/easygarden/components/confirmDialog/confirm-dialog.component';

import { PoolService } from './pool.service';
import { GardenService } from '../../components/garden/garden.service';
import { GardenFilterService } from '../../_services/garden-filter.service';

import { IPool, IPoolFilter } from './IPool';
import { IName } from '../../_interfaces/IName';


@Component({
  selector: 'app-pool',
  templateUrl: './pool.component.html',
  encapsulation: ViewEncapsulation.None,
})

export class PoolComponent implements OnInit {
  faPowerOff = faPowerOff;
  faPen = faPen;
  faTrash = faTrash;
  faSort = faSort;
  faSearch = faSearch;
  faFish = faFish;
  faXmark = faXmark;

  name = environment.application.name;
  title = 'Tableau bassin';

  // Confirm Dialog this.result = boolean
  result: boolean | undefined;

  // updateStatus()
  status: boolean | undefined;

  // Ngx-paginator
  p: number = 1;
  // Ngx-order
  orderHeader: String = '';
  isDescOrder: boolean = true;
  sort(headerName: String) {
    this.isDescOrder = !this.isDescOrder;
    this.orderHeader = headerName;
  }
  // Ngx-filter
  searchInput: IPoolFilter = { name: '' };
  // Filter by garden
  selectedGardenId: number | '' = '';
  gardens: IName[] = [];

  pools: IPool[] = [];
  filteredPools: IPool[] = [];

  constructor(private poolService: PoolService,
              private gardenService: GardenService,
              private gardenFilterService: GardenFilterService,
              private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchPools();
    this.fetchGardens();
  }

  // Recover Gardens
  fetchGardens(): void {
    this.gardenService.getAllGardens().subscribe((res: any) => {
      if (res.hasOwnProperty('hydra:member'))
      this.gardens = res['hydra:member'];
    });
  }

  // Display Pools
  fetchPools(): void {
    this.poolService.getAllPools().subscribe((res: any) => {
      if (res.hasOwnProperty('hydra:member')) 
        this.pools = res['hydra:member'];
        this.filterByGarden();
    });
  }

  // Filter by garden
  filterByGarden(): void {
    // const selectedGardenId = this.gardenFilterService.convertSelectedGardenId(this.selectedGardenId);
    // this.filteredPools = this.gardenFilterService.filterByGarden(
    //   this.pools,
    //   selectedGardenId,
    //   'id'
    // );
    // // Reset paging
    // this.p = 1;
  }

  // Update Status
  updateStatus(id: number, status: boolean): void {
    status = !status;
    this.poolService.updateStatus(status, id).subscribe((res: any) => {
      this.status = res;
    });
  }

  // Delete Pool
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
        this.poolService.deletePool(id).subscribe(() => {
          this.fetchPools();
        });
      }
    });
  }
}
