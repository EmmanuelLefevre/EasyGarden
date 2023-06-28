import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from 'src/app/_directives/directives.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { MainPipeModule } from '../../pipe/pipe.module';

import { PortalRoutingModule } from './portal-routing.module';

import { PortalComponent } from './portal.component';


@NgModule({
  declarations: [
    PortalComponent
  ],
  imports: [
    CommonModule,
    PortalRoutingModule,
    FontAwesomeModule,
    FormsModule,
    MatTooltipModule,
    NgxPaginationModule,
    OrderModule,
    FilterPipeModule,
    MainPipeModule,
    DirectivesModule
  ]
})

export class PortalModule { }
