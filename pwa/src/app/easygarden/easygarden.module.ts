import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from '../_directives/directives.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConfirmDialogModule } from './components/confirmDialog/confirm-dialog.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { MainPipeModule } from './pipe/pipe.module';

import { EasygardenRoutingModule } from './easygarden-routing.module';

import { GardenComponent } from './components/garden/garden.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EditNameEntityModule } from './components/editNameEntity/edit-name-entity.module';
import { AddEntityModule } from './components/addEntity/add-entity.module';


@NgModule({
    declarations: [
        NavbarComponent,
        GardenComponent
    ],
    imports: [
        CommonModule,
        EasygardenRoutingModule,
        FontAwesomeModule,
        FormsModule,
        ConfirmDialogModule,
        MatTooltipModule,
        NgxPaginationModule,
        OrderModule,
        FilterPipeModule,
        MainPipeModule,
        DirectivesModule,
        EditNameEntityModule,
        AddEntityModule
    ]
})

export class EasygardenModule { }
