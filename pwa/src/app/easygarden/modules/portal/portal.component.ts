import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
// RXJS
import { Subscription } from 'rxjs';
// Environment
import { environment } from 'src/environments/environment';
// Icons
import { faPowerOff, faPen, faTrash, faSort, faSearch, faDoorOpen, faXmark } from '@fortawesome/free-solid-svg-icons';
// Components
import { IConfirmDialog, ConfirmDialogComponent } from 'src/app/easygarden/components/modals/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
// Services
import { GardenFilterService } from '../../_services/garden-filter.service';
import { PortalService } from './portal.service';
import { SnackbarService } from 'src/app/_services/miscellaneous/snackbar.service';
// Modeles
import { IDataPortal, IPortal, IPortalFilter } from './IPortal';
import { IGarden } from '../../components/garden/IGarden';
import { IName } from '../../_interfaces/IName';


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
  private fetchDataSubscription: Subscription = new Subscription;
  private deletePortalSubscription!: Subscription;
  private updateStatusSubscription!: Subscription;
  private dialogRefSubscription!: Subscription;

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
  updateStatusBehaviorSubject: IDataPortal[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private dialog: MatDialog,
              private gardenFilterService: GardenFilterService,
              private portalService: PortalService,
              private snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.fetchData();
    this.portalService.updateStatus$.subscribe((data$: IDataPortal[]) => {
      this.updateStatusBehaviorSubject = data$;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  // Fetch gardens and portals
  fetchData(): void {
    this.fetchDataSubscription = this.activatedRoute.data
    .subscribe((data$) => {
      const portalData = data$['data']['portals'];
      const gardenData = data$['data']['gardens'];
      if (portalData && portalData.hasOwnProperty('hydra:member')) {
        this.portals = portalData['hydra:member'];
        this.filterByGarden();
      }
      if (gardenData && gardenData.hasOwnProperty('hydra:member')) {
        this.gardens = gardenData['hydra:member'];
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
      .subscribe(() => {
        // Snackbar
        const action = status ? 'ouvert' : 'fermé';
        const notificationMessage = `Le portail "${name}" a été ${action}.`;
        this.snackbarService.showNotification(notificationMessage, 'modified');
        // Display modified data locally
        this.filteredPortals = this.filteredPortals.map(portal => {
          if (portal.id === id) {
            return { ...portal, status: status };
          }
          return portal;
        });
      },
      (_error) => {
        let errorMessage;
        if (status === false) {
          errorMessage = `Impossible d'ouvrir le portail en raison d'une erreur!`;
        } else {
          errorMessage = `Impossible de fermer le portail en raison d'une erreur!`;
        }
        this.snackbarService.showNotification(errorMessage,'red-alert');
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
      .subscribe((dialogResult$) => {
        this.result = dialogResult$;
        if (this.result === true) {
          this.deletePortalSubscription = this.portalService.deletePortal(id)
          .subscribe(
            (res$: HttpResponse<any>) => {
              if (res$.status === 204) {
                const notificationMessage = this.snackbarService.getNotificationMessage();
                this.snackbarService.showNotification(notificationMessage, 'deleted');
                // Update data locally
                this.filteredPortals = this.filteredPortals.filter(portal => portal.id !== id);
              }
            },
            (_error) => {
              this.snackbarService.showNotification(
                `Une erreur s'est produite lors de la suppression!`,
                'red-alert'
              );
            }
          );
        }
      })
  }

  resetPagination(): void {
    this.p = 1;
  }

  private unsubscribeAll(): void {
    this.fetchDataSubscription.unsubscribe();
    if (this.updateStatusSubscription) {
      this.updateStatusSubscription.unsubscribe();
    }
    if (this.dialogRefSubscription) {
      this.dialogRefSubscription.unsubscribe();
    }
    if (this.deletePortalSubscription) {
      this.deletePortalSubscription.unsubscribe();
    }
  }

}
