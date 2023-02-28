import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { MatSelectModule } from '@angular/material/select';
import { MyComponentsModule } from 'src/app/components/my-components.module';
import { PoolRoutingModule } from './pool-routing.module';

import { AddPoolComponent } from './components/addPool/add-pool.component';
import { EditPoolComponent } from './components/editPool/edit-pool.component';
import { PoolComponent } from './components/pool/pool.component';


@NgModule({
  declarations: [
    PoolComponent,
    EditPoolComponent,
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
    MyComponentsModule
  ]
})

export class PoolModule { }
