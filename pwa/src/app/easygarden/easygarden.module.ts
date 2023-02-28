import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EasygardenRoutingModule } from './easygarden-routing.module';
import { ConfirmDialogModule } from './components/confirmDialog/confirm-dialog.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { MainPipeModule } from './pipe/pipe.module';
import { PublicComponentsModule } from '../components/public-components.module';

import { AddGardenComponent } from './components/garden/components/addGarden/add-garden.component';
import { EditGardenComponent } from './components/garden/components/editGarden/edit-garden.component';
import { GardenComponent } from './components/garden/components/garden/garden.component';
import { NavbarComponent } from './components/navbar/navbar.component';


@NgModule({
    declarations: [
        NavbarComponent,
        EditGardenComponent,
        GardenComponent,
        AddGardenComponent
    ],
    imports: [
        CommonModule,
        EasygardenRoutingModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        FormsModule,
        ConfirmDialogModule,
        MatTooltipModule,
        NgxPaginationModule,
        OrderModule,
        FilterPipeModule,
        MainPipeModule,
        PublicComponentsModule
    ]
})

export class EasygardenModule { }
