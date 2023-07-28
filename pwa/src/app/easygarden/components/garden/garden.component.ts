import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
// Add ViewEncapsulation for resolve problems with loading custom scss .mat-tooltip in style.scss
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
// Environment
import { environment } from 'src/environments/environment';
// Images
import { faPen, faTrash, faSort, faSearch, faTree, faXmark } from '@fortawesome/free-solid-svg-icons';
// Components
import { MatDialog } from '@angular/material/dialog';
import { IConfirmDialog, ConfirmDialogComponent } from 'src/app/easygarden/components/confirmDialog/confirm-dialog.component';
// Services
import { DecodedTokenService } from 'src/app/_services/miscellaneous/decoded-token.service';
import { GardenService } from './garden.service';
// Modeles
import { IGarden, IGardenFilter } from './IGarden';


@Component({
  selector: 'app-garden',
  templateUrl: './garden.component.html',
  encapsulation: ViewEncapsulation.None,
})

export class GardenComponent implements OnInit, OnDestroy {
  
  faPen = faPen;
  faTrash = faTrash;
  faSort = faSort;
  faSearch = faSearch;
  faTree = faTree;
  faXmark = faXmark;

  name = environment.application.name;
  title = 'Tableau jardin';

  // Declaration of subscriptions
  private getAllGardensSubscription: Subscription = new Subscription;
  private deleteGardenSubscription!: Subscription;
  private dialogRefSubscription!: Subscription;

  // Get user id from DecodedTokenService
  id: String = '';
  // Confirm Dialog this.result = boolean
  result: boolean | undefined;
  // Ngx-pagination
  p: number = 1;
  // Ngx-order
  orderHeader: String = 'name';
  isDescOrder: boolean = true;
  sort(headerName: String) {
    this.isDescOrder = !this.isDescOrder;
    this.orderHeader = headerName;
    this.resetPagination();
  }
  // Ngx-filter
  searchInput: IGardenFilter = { name: '' };

  gardens: IGarden[] = [];

  constructor(
    private gardenService: GardenService,
    private dialog: MatDialog,
    public router: Router,
    private decodedTokenService: DecodedTokenService
  ) {}

  ngOnInit(): void {
    this.fetchGardens();
  }

  ngOnDestroy(): void {
    this.getAllGardensSubscription.unsubscribe();
    if (this.deleteGardenSubscription && this.dialogRefSubscription) {
      this.deleteGardenSubscription.unsubscribe();
      this.dialogRefSubscription.unsubscribe();
    }
  }

  // Display Gardens
  fetchGardens(): void {
    this.getAllGardensSubscription = this.gardenService.getAllGardens()
      .subscribe((res: any) => {
        if (res.hasOwnProperty('hydra:member')) {
          this.gardens = res['hydra:member'];
        }
        this.id = this.decodedTokenService.idDecoded();
      });
  }

  // Delete Garden
  confirmDialog(id: number, name: string): void {
    const value = name;
    const message = `Êtes-vous certain de vouloir supprimer le jardin "${name}"
      ainsi que tous ses équipements?`;
    const dialogData = new IConfirmDialog(
      "Confirmer l'action!",
      message,
      value
    );
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    this.dialogRefSubscription = dialogRef.afterClosed()
      .subscribe((dialogResult) => {
        this.result = dialogResult;
        if (this.result === true) {
          this.deleteGardenSubscription = this.gardenService.deleteGarden(id)
            .subscribe(() => {
              this.fetchGardens();
            });
        }
      });
  }

  resetPagination(): void {
    this.p = 1;
  }

}
