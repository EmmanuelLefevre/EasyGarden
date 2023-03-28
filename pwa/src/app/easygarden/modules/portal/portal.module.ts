import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { DirectivesModule } from 'src/app/_directives/directives.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { MatSelectModule } from '@angular/material/select';
import { MainPipeModule } from '../../pipe/pipe.module';
import { PublicComponentsModule } from 'src/app/components/public-components.module';
import { PortalRoutingModule } from './portal-routing.module';

import { AddPortalComponent } from './components/addPortal/add-portal.component';
import { EditPortalComponent } from './components/editPortal/edit-portal.component';
import { PortalComponent } from './components/portal/portal.component';


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
    MainPipeModule,
    PublicComponentsModule,
    DirectivesModule
  ]
})

export class PortalModule { }
