import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
// Add ViewEncapsulation for resolve problems with loading custom scss .mat-tooltip-social in style.scss
import { Subject, Subscription, takeUntil } from 'rxjs';
// Environment
import { environment } from 'src/environments/environment';
// Icons
import { faPowerOff, faPen, faTrash, faSort, faSearch, faSeedling, faXmark } from '@fortawesome/free-solid-svg-icons';
// Components
import { IConfirmDialog, ConfirmDialogComponent } from 'src/app/easygarden/components/confirmDialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
// Services
import { GardenService } from '../../components/garden/garden.service';
import { GardenFilterService } from '../../_services/garden-filter.service';
import { LawnmowerService } from './lawnmower.service';
// Modeles
import { IGarden } from '../../components/garden/IGarden';
import { ILawnmower, ILawnmowerFilter } from './ILawnmower';
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
  private getAllGardensSubscription: Subscription = new Subscription;
  private getAllLawnmowersSubscription: Subscription = new Subscription;
  private deleteLawnmowerSubscription!: Subscription;
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
  searchInput: ILawnmowerFilter = { name: '' };
  // Filter by garden
  selectedGardenId: number | '' = '';
  gardens: IName[] = [];

  lawnmowers: ILawnmower[] = [];
  filteredLawnmowers: ILawnmower[] = [];

  constructor(private dialog: MatDialog,
              private gardenFilterService: GardenFilterService,
              private gardenService: GardenService,
              private lawnmowerService: LawnmowerService) {}

  ngOnInit(): void {
    this.fetchGardens();
    this.fetchLawnmowers();
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

  // Display Lawnmowers
  fetchLawnmowers(): void {
    this.getAllLawnmowersSubscription = this.lawnmowerService.getAllLawnmowers()
      // Use takeUntil to automatically unsubscribe
      .pipe(takeUntil(this.destroy$))
      .subscribe((res:any) => {
        if (res.hasOwnProperty('hydra:member')) {
          this.lawnmowers = res['hydra:member'];
          this.filterByGarden();
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
  updateStatus(id: number, status: boolean): void {
    status = !status;
    this.updateStatusSubscription = this.lawnmowerService.updateStatus(status, id)
      .subscribe((res: any) => {
        this.status = res;
        this.fetchLawnmowers();
      });
  }

  // Delete Lawnmower
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
          this.deleteLawnmowerSubscription = this.lawnmowerService.deleteLawnmower(id)
            .subscribe(() => {
              this.fetchLawnmowers();
            });
        }
      });
  }

  resetPagination(): void {
    this.p = 1;
  }

  private unsubscribeAll(): void {
    this.getAllGardensSubscription.unsubscribe();
    this.getAllLawnmowersSubscription.unsubscribe();
    if (this.updateStatusSubscription) {
      this.updateStatusSubscription.unsubscribe();
    }
    if (this.dialogRefSubscription && this.deleteLawnmowerSubscription) {
      this.dialogRefSubscription.unsubscribe();
      this.deleteLawnmowerSubscription.unsubscribe();
    }
  }

}
