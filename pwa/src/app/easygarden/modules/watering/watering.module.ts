import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from 'src/app/_directives/directives.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { FilterPipeModule } from 'ngx-filter-pipe';

import { WateringRoutingModule } from './watering-routing.module';

import { WateringComponent } from './watering.component';


@NgModule({
  declarations: [
    WateringComponent
  ],
  imports: [
    CommonModule,
    WateringRoutingModule,
    FontAwesomeModule,
    FormsModule,
    MatTooltipModule,
    NgxPaginationModule,
    OrderModule,
    FilterPipeModule,
    DirectivesModule
  ]
})
export class WateringModule {}
