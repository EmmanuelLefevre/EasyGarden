import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
// Add ViewEncapsulation for resolve problems with loading custom scss .mat-tooltip-social in style.scss
import { HttpResponse } from '@angular/common/http';
import { Subject, Subscription, takeUntil } from 'rxjs';
// Environment
import { environment } from 'src/environments/environment';
// Icons
import { faPowerOff, faPen, faTrash, faSort, faSearch, faDoorOpen, faXmark } from '@fortawesome/free-solid-svg-icons';
// Components
import { IConfirmDialog, ConfirmDialogComponent } from 'src/app/easygarden/components/confirmDialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
// Services
import { GardenService } from '../../components/garden/garden.service';
import { GardenFilterService } from '../../_services/garden-filter.service';
import { PortalService } from './portal.service';
import { SnackbarService } from 'src/app/_services/miscellaneous/snackbar.service';
// Modeles
import { IGarden } from '../../components/garden/IGarden';
import { IName } from '../../_interfaces/IName';
import { IPortal, IPortalFilter } from './IPortal';


@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  encapsulation: ViewEncapsulation.None
})

export class PortalComponent implements OnInit, OnDestroy {

  faPowerOff = faPowerOff;
  faPen = faPen;
  faTrash = faTrash;
  faSort = faSort;
  faSearch = faSearch;
  faDoorOpen = faDoorOpen;
  faXmark = faXmark;

  name = environment.application.name;
  title = "Tableau portail";

  // Declaration of subscriptions
  private getAllGardensSubscription: Subscription = new Subscription;
  private getAllPortalsSubscription: Subscription = new Subscription;
  private deletePortalSubscription!: Subscription;
  private updateStatusSubscription!: Subscription;
  private dialogRefSubscription!: Subscription;
  // Private Subject to handle component destruction
  private destroy$ = new Subject<void>();

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
  searchInput: IPortalFilter = { name: ''};
  // Filter by garden
  selectedGardenId: number | '' = '';
  gardens: IName[] = [];

  portals: IPortal[] = [];
  filteredPortals: IPortal[] = [];

  constructor(private dialog: MatDialog,              
              private gardenFilterService: GardenFilterService,
              private gardenService: GardenService,
              private portalService: PortalService,
              private snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.fetchGardens();
    this.fetchPortals();
  }

  ngOnDestroy(): void {
    // Destroy Subject
    this.destroy$.next();
    this.destroy$.complete();
    // Clean up subscriptions
    this.unsubscribeAll();
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

  // Display Portals
  fetchPortals(): void {
    this.getAllPortalsSubscription = this.portalService.getAllPortals()
      // Use takeUntil to automatically unsubscribe
      .pipe(takeUntil(this.destroy$))
      .subscribe((res:any) => {
        if (res.hasOwnProperty('hydra:member')) {
          this.portals = res['hydra:member'];
          this.filterByGarden();
        }
      });
  }

  // Filter by garden
  filterByGarden(): void {
    const selectedGardenId = this.gardenFilterService.convertSelectedGardenId(this.selectedGardenId);
    this.filteredPortals = this.gardenFilterService.filterByGarden(
      this.portals,
      selectedGardenId,
      'id'
    );
    // Reset pagination
    this.resetPagination();
  }

  // Get list of gardens with portals
  getGardensWithPortals(): IGarden[] {
    return this.gardens.filter(garden =>
      this.portals.some(portal => portal.garden.id === garden.id)
    );
  }

  // Update Status
  updateStatus(id: number, status: boolean, name: string): void {
    status = !status;
    this.updateStatusSubscription = this.portalService.updateStatus(status, id)
      .subscribe((res: any) => {
        this.status = res;
        this.fetchPortals();
        // Snackbar
        const action = status ? 'ouvert' : 'fermé';
        const notificationMessage = `Le portail "${name}" a été ${action}.`;
        this.snackbarService.showNotification(notificationMessage, 'modified');
      });
  }

  // Delete Portal
  confirmDialog(id: number, name: string): void {
    const value = name;
    const message = `Êtes-vous certain de vouloir supprimer le portail "${name}"?`;
    const dialogData = new IConfirmDialog("Confirmer l'action!", message, value);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    })
    
    this.dialogRefSubscription = dialogRef.afterClosed()
      .subscribe(dialogResult => {
        this.result = dialogResult;
        if (this.result === true) {
          this.deletePortalSubscription = this.portalService.deletePortal(id)
            .subscribe(
              (response: HttpResponse<any>) => {
                if (response.status === 204) {
                  const notificationMessage = this.snackbarService.getNotificationMessage();
                  this.snackbarService.showNotification(notificationMessage, 'deleted');
                  this.fetchPortals();
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
      })
  }

  resetPagination(): void {
    this.p = 1;
  }

  private unsubscribeAll(): void {
    this.getAllGardensSubscription.unsubscribe();
    this.getAllPortalsSubscription.unsubscribe();
    if (this.updateStatusSubscription) {
      this.updateStatusSubscription.unsubscribe();
    }
    if (this.dialogRefSubscription && this.deletePortalSubscription) {
      this.dialogRefSubscription.unsubscribe();
      this.deletePortalSubscription.unsubscribe();
    }
  }

}
