import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { MatSelectModule } from '@angular/material/select';
import { MainPipeModule } from '../../pipe/pipe.module';

import { PortalRoutingModule } from './portal-routing.module';
import { PortalComponent } from './components/portal/portal.component';
import { EditPortalComponent } from './components/editPortal/edit-portal.component';
import { AddPortalComponent } from './components/addPortal/add-portal.component';

@NgModule({
  declarations: [
    PortalComponent,
    EditPortalComponent,
    AddPortalComponent
  ],
  imports: [
    CommonModule,
    PortalRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    MatTooltipModule,
    NgxPaginationModule,
    OrderModule,
    FilterPipeModule,
    MatSelectModule,
    MainPipeModule
  ]
})

export class PortalModule { }
