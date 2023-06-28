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
import { PublicComponentsModule } from 'src/app/components/public-components.module';
import { PoolRoutingModule } from './pool-routing.module';

import { AddPoolComponent } from './components/addPool/add-pool.component';
import { PoolComponent } from './components/pool/pool.component';


@NgModule({
  declarations: [
    PoolComponent,
    AddPoolComponent
  ],
  imports: [
    CommonModule,
    PoolRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    MatTooltipModule,
    NgxPaginationModule,
    OrderModule,
    FilterPipeModule,
    MatSelectModule,
    PublicComponentsModule,
    DirectivesModule
  ]
})

export class PoolModule { }
