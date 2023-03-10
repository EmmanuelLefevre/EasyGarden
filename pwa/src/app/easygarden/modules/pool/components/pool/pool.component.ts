import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// Add ViewEncapsulation for resolve problems with loading custom scss .mat-tooltip-social in style.scss
import { faPowerOff, faPen, faTrash, faSort, faSearch, faFish } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';

import { MatDialog } from '@angular/material/dialog';
import { IConfirmDialog, ConfirmDialogComponent } from 'src/app/easygarden/components/confirmDialog/confirm-dialog.component';

import { PoolService } from '../../pool.service';
import { IPool, IPoolFilter } from '../../IPool';


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

  name = environment.application.name;
  title = 'Tableau bassin';

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
  searchInput: IPoolFilter = { name: '' };
  clearInput() {
    this.searchInput.name = '';
  }

  pools: IPool[] = [];

  constructor(private poolService: PoolService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchPools();
  }

  // Display Pools
  fetchPools(): void {
    this.poolService.getAllPools().subscribe((res: any) => {
      if (res.hasOwnProperty('hydra:member')) this.pools = res['hydra:member'];
    });
  }

  // Update Status
  updateStatus(id: number, status: boolean): void {
    if (status === true) {
      status = !status;
      this.poolService.updateStatus(status, id).subscribe((res: any) => {
        this.status = res;
        this.fetchPools();
      });
    } else if (status === false) {
      status = !status;
      this.poolService.updateStatus(status, id).subscribe((res: any) => {
        this.status = res;
        this.fetchPools();
      });
    }
  }

  // Delete Pool
  confirmDialog(id: number, name: string): void {
    const value = name;
    const message = `??tes-vous certain de vouloir supprimer l\'??quipement "${name}"?`;
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
