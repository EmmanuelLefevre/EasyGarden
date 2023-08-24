import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DirectivesModule } from 'src/app/_directives/directives.module';
// Modules
import { MatSelectModule } from '@angular/material/select';
import { PublicComponentsModule } from 'src/app/components/public-components.module';
// Components
import { AddEntityComponent } from './add-entity.component';


@NgModule({
  declarations: [
    AddEntityComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DirectivesModule,
    MatSelectModule,
    PublicComponentsModule
  ],
  exports: [
    AddEntityComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AddEntityModule { }
