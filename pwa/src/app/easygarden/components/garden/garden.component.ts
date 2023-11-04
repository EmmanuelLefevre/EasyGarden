import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
// Add ViewEncapsulation for resolve problems with loading custom scss .mat-tooltip in style.scss
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Subject, Subscription } from 'rxjs';
// Environment
import { environment } from 'src/environments/environment';
// Icons
import { faPen, faTrash, faSort, faSearch, faTree, faXmark } from '@fortawesome/free-solid-svg-icons';
// Components
import { IConfirmDialog, ConfirmDialogComponent } from 'src/app/easygarden/components/confirmDialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
// Services
import { DecodedTokenService } from 'src/app/_services/miscellaneous/decoded-token.service';
import { GardenService } from './garden.service';
import { SnackbarService } from 'src/app/_services/miscellaneous/snackbar.service';
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
  private getAllGardensInGardenSubscription: Subscription = new Subscription;
  private deleteGardenSubscription!: Subscription;
  private dialogRefInGardenSubscription!: Subscription;
  private navigationEndSubscription!: Subscription;
  // Private Subject to handle component destruction
  private destroy$ = new Subject<void>();

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

  constructor(public router: Router,
              private route: ActivatedRoute,
              private decodedTokenService: DecodedTokenService,
              private dialog: MatDialog,
              private gardenService: GardenService,
              private snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.fetchGardens();

    // Observing route changes with NavigationEnd
    this.navigationEndSubscription = this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    )
      .subscribe((_event: NavigationEnd) => {
      // Check if the current route matches a child route
        if (this.route.snapshot.firstChild) {
          this.unsubscribeAll();
        }
      });
  }

  ngOnDestroy(): void {
    // Destroy Subject
    this.destroy$.next();
    this.destroy$.complete();
    // Clean up subscriptions
    this.unsubscribeAll();
    this.navigationEndSubscription.unsubscribe();
  }

  // Display Gardens
  fetchGardens(): void {
    this.getAllGardensInGardenSubscription = this.gardenService.getAllGardens()
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

    this.dialogRefInGardenSubscription = dialogRef.afterClosed()
      .subscribe((dialogResult) => {
        this.result = dialogResult;
        if (this.result === true) {
          this.deleteGardenSubscription = this.gardenService.deleteGarden(id)
          .subscribe(
            (response: HttpResponse<any>) => {
              if (response.status === 204) {
                const notificationMessage = this.snackbarService.getNotificationMessage();
                this.snackbarService.showNotification(notificationMessage, 'deleted');
                this.fetchGardens();
              }
            },
            (_error) => {
              this.snackbarService.showNotification(
                `Une erreur s'est produite!`,
                'red-alert'
              );
            }
          )
        }
      });
  }

  resetPagination(): void {
    this.p = 1;
  }

  private unsubscribeAll(): void {
    this.getAllGardensInGardenSubscription.unsubscribe();
    if (this.dialogRefInGardenSubscription && this.deleteGardenSubscription) {
      this.dialogRefInGardenSubscription.unsubscribe();
      this.deleteGardenSubscription.unsubscribe();
    }
  }

}
