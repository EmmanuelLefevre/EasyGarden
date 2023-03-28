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
import { WateringRoutingModule } from './watering-routing.module';

import { AddWateringComponent } from './components/addWatering/add-watering.component';
import { EditWateringComponent } from './components/editWatering/edit-watering.component';
import { WateringComponent } from './components/watering/watering.component';


@NgModule({
  declarations: [
    WateringComponent,
    EditWateringComponent,
    AddWateringComponent
  ],
  imports: [
    CommonModule,
    WateringRoutingModule,
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
export class WateringModule {}
