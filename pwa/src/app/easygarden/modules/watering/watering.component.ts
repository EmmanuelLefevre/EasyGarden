import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
// RXJS
import { Subscription } from 'rxjs';
// Environment
import { environment } from 'src/environments/environment';
// Icons
import { faPowerOff, faPen, faTrash, faSort, faSearch, faDroplet, faXmark } from '@fortawesome/free-solid-svg-icons';
// Components
import { IConfirmDialog, ConfirmDialogComponent } from 'src/app/easygarden/components/confirmDialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
// Services
import { GardenFilterService } from '../../_services/garden-filter.service';
import { WateringService } from './watering.service';
import { SnackbarService } from 'src/app/_services/miscellaneous/snackbar.service';
// Modeles
import { IDataWatering, IWatering, IWateringFilter } from './IWatering';
import { IGarden } from '../../components/garden/IGarden';
import { IName } from '../../_interfaces/IName';


@Component({
  selector: 'app-watering',
  templateUrl: './watering.component.html',
  encapsulation: ViewEncapsulation.None
})

export class WateringComponent implements OnInit, OnDestroy {

  faPowerOff = faPowerOff;
  faPen = faPen;
  faTrash = faTrash;
  faSort = faSort;
  faSearch = faSearch;
  faDroplet = faDroplet;
  faXmark = faXmark;

  name = environment.application.name;
  title = "Tableau arrosage";

  // Declaration of subscriptions
  private fetchDataSubscription: Subscription = new Subscription;
  private deleteWateringSubscription!: Subscription;
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
  searchInput: IWateringFilter = { name: ''};
  // Filter by garden
  selectedGardenId: number | '' = '';
  gardens: IName[] = [];

  waterings: IWatering[] = [];
  filteredWaterings: IWatering[] = [];
  updateStatusBehaviorSubject: IDataWatering[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private dialog: MatDialog,
              private gardenFilterService: GardenFilterService,
              private snackbarService: SnackbarService,
              private wateringService: WateringService) {}

  ngOnInit(): void {
    this.fetchData();
    this.wateringService.updateStatus$.subscribe((data$: IDataWatering[]) => {
      this.updateStatusBehaviorSubject = data$;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  // Fetch gardens and waterings
  fetchData(): void {
    this.fetchDataSubscription = this.activatedRoute.data
    .subscribe((data$) => {
      const wateringData = data$['data']['waterings'];
      const gardenData = data$['data']['gardens'];
      if (wateringData && wateringData.hasOwnProperty('hydra:member')) {
        this.waterings = wateringData['hydra:member'];
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
    this.filteredWaterings = this.gardenFilterService.filterByGarden(
      this.waterings,
      selectedGardenId,
      'id'
    );
    // Reset pagination
    this.resetPagination();
  }

  // Get list of gardens with waterings
  getGardensWithWaterings(): IGarden[] {
    return this.gardens.filter(garden =>
      this.waterings.some(watering => watering.garden.id === garden.id)
    );
  }

  // Update Status
  updateStatus(id: number, status: boolean, name: string): void {
    status = !status;
    this.updateStatusSubscription = this.wateringService.updateStatus(status, id)
      .subscribe(() => {
        // Snackbar
        const action = status ? 'allumé' : 'éteint';
        const notificationMessage = `L\'arrosage "${name}" a été ${action}.`;
        this.snackbarService.showNotification(notificationMessage, 'modified');
        // Display modified data locally
        this.filteredWaterings = this.filteredWaterings.map(watering => {
          if (watering.id === id) {
            return { ...watering, status: status };
          }
          return watering;
        });
      },
      (_error) => {
        let errorMessage;
        if (status === false) {
          errorMessage = `Impossible de démarrer l'arrosage en raison d'une erreur!`;
        } else {
          errorMessage = `Impossible d'arrêter l'arrosage en raison d'une erreur!`;
        }
        this.snackbarService.showNotification(errorMessage,'red-alert');
      });
  }

  // Delete Watering
  confirmDialog(id: number, name: string): void {
    const value = name;
    const message = `Êtes-vous certain de vouloir supprimer l\'arrosage "${name}"?`;
    const dialogData = new IConfirmDialog("Confirmer l'action!", message, value);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    })

    this.dialogRefSubscription = dialogRef.afterClosed()
      .subscribe((dialogResult$) => {
        this.result = dialogResult$;
        if (this.result === true) {
          this.deleteWateringSubscription = this.wateringService.deleteWatering(id)
          .subscribe(
            (res$: HttpResponse<any>) => {
              if (res$.status === 204) {
                const notificationMessage = this.snackbarService.getNotificationMessage();
                this.snackbarService.showNotification(notificationMessage, 'deleted');
                // Update data locally
                this.filteredWaterings = this.filteredWaterings.filter(watering => watering.id !== id);
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
    if (this.deleteWateringSubscription) {
      this.deleteWateringSubscription.unsubscribe();
    }
  }

}
