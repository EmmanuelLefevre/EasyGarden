import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
// RXJS
import { Subscription } from 'rxjs';
// Environment
import { environment } from 'src/environments/environment';
// Icons
import { faPowerOff, faPen, faTrash, faSort, faSearch, faFish, faXmark } from '@fortawesome/free-solid-svg-icons';
// Components
import { IConfirmDialog, ConfirmDialogComponent } from 'src/app/easygarden/components/modals/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
// Services
import { GardenFilterService } from '../../_services/garden-filter.service';
import { PoolService } from './pool.service';
import { SnackbarService } from 'src/app/_services/miscellaneous/snackbar.service';
// Modeles
import { IDataPool, IPool, IPoolFilter } from './IPool';
import { IGarden } from '../../components/garden/IGarden';
import { IName } from '../../_interfaces/IName';


@Component({
  selector: 'app-pool',
  templateUrl: './pool.component.html',
  encapsulation: ViewEncapsulation.None,
})

export class PoolComponent implements OnInit, OnDestroy {
  faPowerOff = faPowerOff;
  faPen = faPen;
  faTrash = faTrash;
  faSort = faSort;
  faSearch = faSearch;
  faFish = faFish;
  faXmark = faXmark;

  name = environment.application.name;
  title = 'Tableau bassin';

  // Declaration of subscriptions
  private fetchDataSubscription: Subscription = new Subscription;
  private deletePoolSubscription!: Subscription;
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
  sort(headerName: String) {
    this.isDescOrder = !this.isDescOrder;
    this.orderHeader = headerName;
    this.resetPagination();
  }
  // Ngx-filter
  searchInput: IPoolFilter = { name: '' };
  // Filter by garden
  selectedGardenId: number | '' = '';
  gardens: IName[] = [];

  pools: IPool[] = [];
  filteredPools: IPool[] = [];
  updateStatusBehaviorSubject: IDataPool[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private dialog: MatDialog,
              private gardenFilterService: GardenFilterService,
              private poolService: PoolService,
              private snackbarService: SnackbarService) {}


  ngOnInit(): void {
    this.fetchData();
    this.poolService.updateStatus$.subscribe((data$: IDataPool[]) => {
      this.updateStatusBehaviorSubject = data$;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  // Fetch gardens and pools
  fetchData(): void {
    this.fetchDataSubscription = this.activatedRoute.data
    .subscribe((data$) => {
      const poolData = data$['data']['pools'];
      const gardenData = data$['data']['gardens'];
      if (poolData && poolData.hasOwnProperty('hydra:member')) {
        this.pools = poolData['hydra:member'];
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
    this.filteredPools = this.gardenFilterService.filterByGarden(
      this.pools,
      selectedGardenId,
      'id'
    );
    // Reset pagination
    this.resetPagination();;
  }

  // Get list of gardens with pools
  getGardensWithPools(): IGarden[] {
    return this.gardens.filter(garden =>
      this.pools.some(pool => pool.garden.id === garden.id)
    );
  }

  // Update Status
  updateStatus(id: number, status: boolean, name: string): void {
    status = !status;
    this.updateStatusSubscription = this.poolService.updateStatus(status, id)
      .subscribe(() => {
        // Snackbar
        const action = status ? 'allumé' : 'éteint';
        const notificationMessage = `L\'équipement de bassin "${name}" a été ${action}.`;
        this.snackbarService.showNotification(notificationMessage, 'modified');
        // Display modified data locally
        this.filteredPools = this.filteredPools.map(pool => {
          if (pool.id === id) {
            return { ...pool, status: status };
          }
          return pool;
        });
      },
      (_error) => {
        let errorMessage;
        if (status === false) {
          errorMessage = `Impossible de démarrer l'équipement de bassin en raison d'une erreur!`;
        } else {
          errorMessage = `Impossible d'arrêter  l'équipement de bassin en raison d'une erreur!`;
        }
        this.snackbarService.showNotification(errorMessage,'red-alert');
    });
  }

  // Delete Pool
  confirmDialog(id: number, name: string): void {
    const value = name;
    const message = `Êtes-vous certain de vouloir supprimer l\'équipement de bassin "${name}"?`;
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
          this.deletePoolSubscription = this.poolService.deletePool(id)
          .subscribe(
            (res$: HttpResponse<any>) => {
              if (res$.status === 204) {
                const notificationMessage = this.snackbarService.getNotificationMessage();
                this.snackbarService.showNotification(notificationMessage, 'deleted');
                // Update data locally
                this.filteredPools = this.filteredPools.filter(pool => pool.id !== id);
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
    if (this.deletePoolSubscription) {
      this.deletePoolSubscription.unsubscribe();
    }
  }

}
