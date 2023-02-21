import { Component, OnInit } from '@angular/core';
import { faPowerOff, faPen, faTrash, faSort, faSearch, faFish } from '@fortawesome/free-solid-svg-icons';

import { MatDialog } from '@angular/material/dialog';
import { IConfirmDialog, ConfirmDialogComponent } from 'src/app/easygarden/components/confirmDialog/confirmDialogComponent/confirm-dialog.component';

import { PoolService } from '../../pool.service';

import { IPool, IPoolFilter } from '../../IPool';


@Component({
  selector: 'app-pool',
  templateUrl: './pool.component.html'
})

export class PoolComponent implements OnInit {

  title = "Easy Garden Bassin Liste";
  faPowerOff = faPowerOff;
  faPen = faPen;
  faTrash = faTrash;
  faSort = faSort;
  faSearch = faSearch;
  faFish = faFish;

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
  searchInput: IPoolFilter = { name: ''};
  clearInput() {
    this.searchInput.name = '';
  }

  pools: IPool[] = [];

  constructor(private poolService: PoolService,
              private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchPools();
  }

  // Display Pools
  fetchPools(): void {
    this.poolService.getAllPools()
      .subscribe(
        (res:any) => {
          if (res.hasOwnProperty('hydra:member'))  
          this.pools = res['hydra:member'];
        }
      )
  }

  // Update Status
  updateStatus(id: number, status: boolean): void {
    if (status === true) {
      status = !status;
      this.poolService.updateStatus(status, id)
        .subscribe(
          (res:any) => {
            this.status = res;
            this.fetchPools();
          }
        )
    } else if (status === false) {
      status = !status;
      this.poolService.updateStatus(status, id)
        .subscribe(
          (res:any) => {
            this.status = res;
            this.fetchPools();
          }
        )
    }
  }

  // Delete Pool
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
        this.poolService.deletePool(id).subscribe(
          () => {
            this.fetchPools();
          }
        )
      }   
    })
  }

}
