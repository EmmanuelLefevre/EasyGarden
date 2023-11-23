import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DirectivesModule } from 'src/app/_directives/directives.module';
// Modules
import { PublicComponentsModule } from 'src/app/components/public-components.module';
// Components
import { EditEntityNameComponent } from './edit-entity-name.component';


@NgModule({
  declarations: [
    EditEntityNameComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    PublicComponentsModule
  ],
  exports: [
    EditEntityNameComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class EditEntityNameModule { }
