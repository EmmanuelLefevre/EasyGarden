import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
// Add ViewEncapsulation for resolve problems with loading custom scss .mat-tooltip-social in style.scss
import { Subject, Subscription, takeUntil } from 'rxjs';
// Environment
import { environment } from 'src/environments/environment';
// Icons
import { faPowerOff, faPen, faTrash, faSort, faSearch, faLightbulb, faXmark } from '@fortawesome/free-solid-svg-icons';
// Components
import { IConfirmDialog, ConfirmDialogComponent } from 'src/app/easygarden/components/confirmDialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
// Services
import { GardenService } from '../../components/garden/garden.service';
import { GardenFilterService } from '../../_services/garden-filter.service';
import { LightningService } from './lightning.service';
// Modeles
import { IGarden } from '../../components/garden/IGarden';
import { ILightning, ILightningFilter } from './ILightning';
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
  private getAllGardensSubscription: Subscription = new Subscription;
  private getAllLightningsSubscription: Subscription = new Subscription;
  private deleteLightningSubscription!: Subscription;
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

  constructor(private dialog: MatDialog,
              private gardenFilterService: GardenFilterService,
              private gardenService: GardenService,
              private lightningService: LightningService,) {}

  ngOnInit(): void {
    this.fetchGardens();
    this.fetchLightnings();
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

  // Display Lightnings
  fetchLightnings(): void {
    this.getAllLightningsSubscription = this.lightningService.getAllLightnings()
      // Use takeUntil to automatically unsubscribe
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: any) => {
        if (res.hasOwnProperty('hydra:member')) {
          this.lightnings = res['hydra:member'];
          this.filterByGarden();        
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
  updateStatus(id: number, status: boolean): void {
    status = !status;
    this.updateStatusSubscription = this.lightningService.updateStatus(status, id)
      .subscribe((res: any) => {
        this.status = res;
        this.fetchLightnings();
      });
  }

  // Delete Lightning
  confirmDialog(id: number, name: string): void {
    const value = name;
    const message = `Êtes-vous certain de vouloir supprimer l\'équipement "${name}"?`;
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
          this.deleteLightningSubscription = this.lightningService.deleteLightning(id)
            .subscribe(() => {
              this.fetchLightnings();
            });
        }
      });
  }

  resetPagination(): void {
    this.p = 1;
  }

  private unsubscribeAll(): void {
    this.getAllGardensSubscription.unsubscribe();
    this.getAllLightningsSubscription.unsubscribe();
    if (this.updateStatusSubscription) {
      this.updateStatusSubscription.unsubscribe();
    }
    if (this.dialogRefSubscription && this.deleteLightningSubscription) {
      this.dialogRefSubscription.unsubscribe();
      this.deleteLightningSubscription.unsubscribe();
    }
  }

}
