import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { MatSelectModule } from '@angular/material/select';

import { LawnmowerRoutingModule } from './lawnmower-routing.module';
import { LawnmowerComponent } from './components/lawnmower/lawnmower.component';
import { EditLawnmowerComponent } from './components/editLawnmower/edit-lawnmower.component';
import { AddLawnmowerComponent } from './components/addLawnmower/add-lawnmower.component';

@NgModule({
  declarations: [
    LawnmowerComponent,
    EditLawnmowerComponent,
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
    MatSelectModule
  ]
})

export class LawnmowerModule { }
