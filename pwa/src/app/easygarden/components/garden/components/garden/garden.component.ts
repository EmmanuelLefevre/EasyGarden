import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// Add ViewEncapsulation for resolve problems with loading custom scss .mat-tooltip in style.scss
import { faPen, faTrash, faSort, faSearch, faTree } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { GardenService } from '../../garden.service';
import { IGarden, IGardenFilter } from '../../IGarden';

import { MatDialog } from '@angular/material/dialog';
import { IConfirmDialog, ConfirmDialogComponent } from 'src/app/easygarden/components/confirmDialog/confirmDialogComponent/confirm-dialog.component';
import { DecodedTokenService } from 'src/app/_services/service/decoded-token.service';


@Component({
  selector: 'app-garden',
  templateUrl: './garden.component.html',
  encapsulation: ViewEncapsulation.None
})

export class GardenComponent implements OnInit {

  faPen = faPen;
  faTrash = faTrash;
  faSort = faSort;
  faSearch = faSearch;
  faTree = faTree;

  name = environment.application.name;
  id: String = '';
  title = "Tableau jardin";

  // Confirm Dialog this.result = boolean
  result: boolean | undefined;

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
  searchInput: IGardenFilter = { name: '' };
  clearInput() {
    this.searchInput.name = '';
  }

  gardens: IGarden[] = [];

  constructor(private gardenService: GardenService,
              private dialog: MatDialog,
              public router: Router,
              private decodedTokenService: DecodedTokenService) {} 

  ngOnInit(): void {
    this.fetchGardens();
  }

  // Display Gardens
  fetchGardens(): void {
    this.gardenService.getAllGardens()
      .subscribe(
        (res:any) => {
          if (res.hasOwnProperty('hydra:member'))
          this.gardens = res['hydra:member'];
          this.id = this.decodedTokenService.idDecoded();
        }
      )
  }

  // Delete Garden
  confirmDialog(id: number, name: string): void {
    const value = name;
    const message = `Êtes-vous certain de vouloir supprimer le jardin "${name}"
      ainsi que tous ses équipements?`;
    const dialogData = new IConfirmDialog("Confirmer l'action!", message, value);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    })
    
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      if (this.result === true) {
        this.gardenService.deleteGarden(id).subscribe(
          () => {
            this.fetchGardens();        
          }
        )
      }   
    })
  }

}
