import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from '../_directives/directives.module';
// Routing
import { EasygardenRoutingModule } from './easygarden-routing.module';
// Modules
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConfirmDialogModule } from './components/modals/confirm-dialog.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { MainPipeModule } from './pipes/pipe.module';
import { EditEntityNameModule } from './components/editEntityName/edit-entity-name.module';
import { AddEntityModule } from './components/addEntity/add-entity.module';
// Components
import { GardenComponent } from './components/garden/garden.component';
import { NavbarComponent } from './components/navbar/navbar.component';


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
        EditEntityNameModule,
        AddEntityModule
    ]
})

export class EasygardenModule { }
