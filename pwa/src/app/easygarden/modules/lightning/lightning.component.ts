import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
// RXJS
import { Subscription } from 'rxjs';
// Environment
import { environment } from 'src/environments/environment';
// Icons
import { faPowerOff, faPen, faTrash, faSort, faSearch, faLightbulb, faXmark } from '@fortawesome/free-solid-svg-icons';
// Components
import { IConfirmDialog, ConfirmDialogComponent } from 'src/app/easygarden/components/modals/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
// Services
import { GardenFilterService } from '../../_services/garden-filter.service';
import { LightningService } from './lightning.service';
import { SnackbarService } from 'src/app/_services/miscellaneous/snackbar.service';
// Modeles
import { IDataLightning, ILightning, ILightningFilter } from './ILightning';
import { IGarden } from '../../components/garden/IGarden';
import { IName } from '../../_interfaces/IName';


@Component({
  selector: 'app-lightning',
  templateUrl: './lightning.component.html',
  encapsulation: ViewEncapsulation.None,
})

export class LightningComponent implements OnInit, OnDestroy {
  faPowerOff = faPowerOff;
  faPen = faPen;
  faTrash = faTrash;
  faSort = faSort;
  faSearch = faSearch;
  faLightbulb = faLightbulb;
  faXmark = faXmark;

  name = environment.application.name;
  title = 'Tableau éclairage';

  // Declaration of subscriptions
  private fetchDataSubscription: Subscription = new Subscription;
  private deleteLightningSubscription!: Subscription;
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
  searchInput: ILightningFilter = { name: '' };
  // Filter by garden
  selectedGardenId: number | '' = '';
  gardens: IName[] = [];

  lightnings: ILightning[] = [];
  filteredLightnings: ILightning[] = [];
  updateStatusBehaviorSubject: IDataLightning[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private dialog: MatDialog,
              private gardenFilterService: GardenFilterService,
              private lightningService: LightningService,
              private snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.fetchData();
    this.lightningService.updateStatus$.subscribe((data$: IDataLightning[]) => {
      this.updateStatusBehaviorSubject = data$;
    });
  }

  ngOnDestroy(): void {
    // Clean up subscriptions
    this.unsubscribeAll();
  }

  // Fetch gardens and lightnings
  fetchData(): void {
    this.fetchDataSubscription = this.activatedRoute.data
    .subscribe((data$) => {
      const lightningData = data$['data']['lightnings'];
      const gardenData = data$['data']['gardens'];
      if (lightningData && lightningData.hasOwnProperty('hydra:member')) {
        this.lightnings = lightningData['hydra:member'];
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
    this.filteredLightnings = this.gardenFilterService.filterByGarden(
      this.lightnings,
      selectedGardenId,
      'id'
    );
    // Reset pagination
    this.resetPagination();
  }

  // Get list of gardens with lightnings
  getGardensWithLightnings(): IGarden[] {
    return this.gardens.filter(garden =>
      this.lightnings.some(lightning => lightning.garden.id === garden.id)
    );
  }

  // Update Status
  updateStatus(id: number, status: boolean, name: string): void {
    status = !status;
    this.updateStatusSubscription = this.lightningService.updateStatus(status, id)
      .subscribe(() => {
        // Snackbar
        const action = status ? 'allumé' : 'éteint';
        const notificationMessage = `L'\éclairage "${name}" a été ${action}.`;
        this.snackbarService.showNotification(notificationMessage, 'modified');
        // Display modified data locally
        this.filteredLightnings = this.filteredLightnings.map(lightning => {
          if (lightning.id === id) {
            return { ...lightning, status: status };
          }
          return lightning;
        });
      },
      (_error) => {
        let errorMessage;
        if (status === false) {
          errorMessage = `Impossible d'allumer l'éclairage en raison d'une erreur!`;
        } else {
          errorMessage = `Impossible d'éteindre l'éclairage en raison d'une erreur!`;
        }
        this.snackbarService.showNotification(errorMessage,'red-alert');
      });
  }

  // Delete Lightning
  confirmDialog(id: number, name: string): void {
    const value = name;
    const message = `Êtes-vous certain de vouloir supprimer l\'éclairage "${name}"?`;
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
          this.deleteLightningSubscription = this.lightningService.deleteLightning(id)
          .subscribe(
            (res$: HttpResponse<any>) => {
              if (res$.status === 204) {
                const notificationMessage = this.snackbarService.getNotificationMessage();
                this.snackbarService.showNotification(notificationMessage, 'deleted');
                // Update data locally
                this.filteredLightnings = this.filteredLightnings.filter(lightning => lightning.id !== id);
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
    if (this.deleteLightningSubscription) {
      this.deleteLightningSubscription.unsubscribe();
    }
  }

}
