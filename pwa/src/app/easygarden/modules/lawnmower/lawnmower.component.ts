import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
// RXJS
import { Subscription } from 'rxjs';
// Environment
import { environment } from 'src/environments/environment';
// Icons
import { faPowerOff, faPen, faTrash, faSort, faSearch, faSeedling, faXmark } from '@fortawesome/free-solid-svg-icons';
// Components
import { IConfirmDialog, ConfirmDialogComponent } from 'src/app/easygarden/components/modals/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
// Services
import { GardenFilterService } from '../../_services/garden-filter.service';
import { LawnmowerService } from './lawnmower.service';
import { SnackbarService } from 'src/app/_services/miscellaneous/snackbar.service';
// Modeles
import { IDataLawnmower, ILawnmower, ILawnmowerFilter } from './ILawnmower';
import { IGarden } from '../../components/garden/IGarden';
import { IName } from '../../_interfaces/IName';


@Component({
  selector: 'app-lawnmower',
  templateUrl: './lawnmower.component.html',
  encapsulation: ViewEncapsulation.None,
})

export class LawnmowerComponent implements OnInit, OnDestroy {

  faPowerOff = faPowerOff;
  faPen = faPen;
  faTrash = faTrash;
  faSort = faSort;
  faSearch = faSearch;
  faSeedling = faSeedling;
  faXmark = faXmark;

  name = environment.application.name;
  title = 'Tableau tondeuse';

  // Declaration of subscriptions
  private fetchDataSubscription: Subscription = new Subscription;
  private deleteLawnmowerSubscription!: Subscription;
  private dialogRefSubscription!: Subscription;
  private updateStatusSubscription!: Subscription;

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
  sort(headerName: String) {
    this.isDescOrder = !this.isDescOrder;
    this.orderHeader = headerName;
    this.resetPagination();
  }
  // Ngx-filter
  searchInput: ILawnmowerFilter = { name: '' };
  // Filter by garden
  selectedGardenId: number | '' = '';
  gardens: IName[] = [];

  lawnmowers: ILawnmower[] = [];
  filteredLawnmowers: ILawnmower[] = [];
  updateStatusBehaviorSubject: IDataLawnmower[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private dialog: MatDialog,
              private gardenFilterService: GardenFilterService,
              private lawnmowerService: LawnmowerService,
              private snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.fetchData();
    this.lawnmowerService.updateStatus$.subscribe((data$: IDataLawnmower[]) => {
      this.updateStatusBehaviorSubject = data$;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  // Fetch gardens and lawnmowers
  fetchData(): void {
    this.fetchDataSubscription = this.activatedRoute.data
    .subscribe((data$) => {
      const lawnmowerData = data$['data']['lawnmowers'];
      const gardenData = data$['data']['gardens'];
      if (lawnmowerData && lawnmowerData.hasOwnProperty('hydra:member')) {
        this.lawnmowers = lawnmowerData['hydra:member'];
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
    this.filteredLawnmowers = this.gardenFilterService.filterByGarden(
      this.lawnmowers,
      selectedGardenId,
      'id'
    );
    // Reset pagination
    this.resetPagination();
  }

  // Get list of gardens with lawnmowers
  getGardensWithLawnmowers(): IGarden[] {
    return this.gardens.filter(garden =>
      this.lawnmowers.some(lawnmower => lawnmower.garden.id === garden.id)
    );
  }

  // Update Status
  updateStatus(id: number, status: boolean, name:string): void {
    status = !status;
    this.updateStatusSubscription = this.lawnmowerService.updateStatus(status, id)
      .subscribe(() => {
        // Snackbar
        const action = status ? 'allumée' : 'éteinte';
        const notificationMessage = `La tondeuse "${name}" a été ${action}.`;
        this.snackbarService.showNotification(notificationMessage, 'modified');
        // Display modified data locally
        this.filteredLawnmowers = this.filteredLawnmowers.map(lawnmower => {
          if (lawnmower.id === id) {
            return { ...lawnmower, status: status };
          }
          return lawnmower;
        });
      },
      (_error) => {
        let errorMessage;
        if (status === false) {
          errorMessage = `Impossible de démarrer la tondeuse en raison d'une erreur!`;
        } else {
          errorMessage = `Impossible d'arrêter la tondeuse en raison d'une erreur!`;
        }
        this.snackbarService.showNotification(errorMessage,'red-alert');
      });
  }

  // Delete Lawnmower
  confirmDialog(id: number, name: string): void {
    const value = name;
    const message = `Êtes-vous certain de vouloir supprimer la tondeuse "${name}"?`;
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
      .subscribe((dialogResult$) => {
        this.result = dialogResult$;
        if (this.result === true) {
          this.deleteLawnmowerSubscription = this.lawnmowerService.deleteLawnmower(id)
          .subscribe(
            (res$: HttpResponse<any>) => {
              if (res$.status === 204) {
                const notificationMessage = this.snackbarService.getNotificationMessage();
                this.snackbarService.showNotification(notificationMessage, 'deleted');
                // Update data locally
                this.filteredLawnmowers = this.filteredLawnmowers.filter(lawnmower => lawnmower.id !== id);
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
      });
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
    if (this.deleteLawnmowerSubscription) {
      this.deleteLawnmowerSubscription.unsubscribe();
    }
  }

}
