import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from 'src/app/_directives/directives.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { FilterPipeModule } from 'ngx-filter-pipe';

import { LightningRoutingModule } from './lightning-routing.module';

import { LightningComponent } from './lightning.component';


@NgModule({
  declarations: [
    LightningComponent
  ],
  imports: [
    CommonModule,
    LightningRoutingModule,
    FontAwesomeModule,
    FormsModule,
    MatTooltipModule,
    NgxPaginationModule,
    OrderModule,
    FilterPipeModule,
    DirectivesModule
  ]
})

export class LightningModule { }
