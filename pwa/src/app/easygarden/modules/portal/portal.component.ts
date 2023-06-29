import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// Add ViewEncapsulation for resolve problems with loading custom scss .mat-tooltip-social in style.scss
import { faPowerOff, faPen, faTrash, faSort, faSearch, faDoorOpen, faXmark } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';

import { MatDialog } from '@angular/material/dialog';
import { IConfirmDialog, ConfirmDialogComponent } from 'src/app/easygarden/components/confirmDialog/confirm-dialog.component';

import { PortalService } from './portal.service';
import { GardenService } from '../../components/garden/garden.service';

import { IPortal, IPortalFilter } from './IPortal';
import { IName } from '../../_interfaces/IName';


@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  encapsulation: ViewEncapsulation.None
})

export class PortalComponent implements OnInit {

  faPowerOff = faPowerOff;
  faPen = faPen;
  faTrash = faTrash;
  faSort = faSort;
  faSearch = faSearch;
  faDoorOpen = faDoorOpen;
  faXmark = faXmark;

  name = environment.application.name;
  title = "Tableau portail";
  
  // Confirm Dialog this.result = boolean
  result: boolean | undefined;

  // updateStatus()
  status: boolean | undefined;

  // Ngx-paginator
  p: number = 1;
  // Ngx-order
  orderHeader: String = 'name';
  isDescOrder: boolean = true;
  sort(headerName:String) {
    this.isDescOrder = !this.isDescOrder;
    this.orderHeader = headerName;
  }
  // Ngx-filter
  searchInput: IPortalFilter = { name: ''};
  // Filter by garden
  selectedGardenId: number | '' = '';
  gardens: IName[] = [];

  portals: IPortal[] = [];
  filteredPortals: IPortal[] = [];

  constructor(private portalService: PortalService,
              private gardenService: GardenService,
              private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchPortals();
    this.fetchGardens();
  }

  // Recover Gardens
  fetchGardens(): void {
    this.gardenService.getAllGardens().subscribe((res: any) => {
      if (res.hasOwnProperty('hydra:member'))
      this.gardens = res['hydra:member'];
    });
  }

  // Display Portals
  fetchPortals(): void {
    this.portalService.getAllPortals().subscribe((res:any) => {
      if (res.hasOwnProperty('hydra:member'))
      this.portals = res['hydra:member'];
      this.filterByGarden();
    });
  }

  filterByGarden(): void {
    let selectedGardenId: number | undefined;
    if (typeof this.selectedGardenId === 'string' && this.selectedGardenId !== '') {
      selectedGardenId = parseInt(this.selectedGardenId, 10);
    }
  
    if (!selectedGardenId) {
      this.filteredPortals = [...this.portals];
    } else {
      this.filteredPortals = this.portals.filter(portal => {
        if (typeof portal.garden.id === 'number') {
          return portal.garden.id === selectedGardenId;
        }
        return false;
      });
    } 
    // Reset paging
    this.p = 1;
  }

  // Update Status
  updateStatus(id: number, status: boolean): void {
    if (status === true) {
      status = !status;
      this.portalService.updateStatus(status, id)
        .subscribe(
          (res:any) => {
            this.status = res;
            this.fetchPortals();
          }
        )
    } else if (status === false) {
      status = !status;
      this.portalService.updateStatus(status, id)
        .subscribe(
          (res:any) => {
            this.status = res;
            this.fetchPortals();
          }
        )
    }
  }

  // Delete Portal
  confirmDialog(id: number, name: string): void {
    const value = name;
    const message = `Êtes-vous certain de vouloir supprimer l\'équipement "${name}"?`;
    const dialogData = new IConfirmDialog("Confirmer l'action!", message, value);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    })
    
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      if (this.result === true) {
        this.portalService.deletePortal(id).subscribe(
          () => {
            this.fetchPortals();
          }
        )
      }   
    })
  }

}
