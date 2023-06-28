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
import { LawnmowerRoutingModule } from './lawnmower-routing.module';

import { AddLawnmowerComponent } from './components/addLawnmower/add-lawnmower.component';
import { LawnmowerComponent } from './components/lawnmower/lawnmower.component';


@NgModule({
  declarations: [
    LawnmowerComponent,
    AddLawnmowerComponent
  ],
  imports: [
    CommonModule,
    LawnmowerRoutingModule,
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

export class LawnmowerModule { }
