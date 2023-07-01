import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DirectivesModule } from 'src/app/_directives/directives.module';

import { CloseFormButtonModule } from 'src/app/components/closeFormButton/close-form-button.module';

import { EditEntityNameComponent } from './edit-entity-name.component';



@NgModule({
  declarations: [
    EditEntityNameComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DirectivesModule,
    CloseFormButtonModule
  ],
  exports: [
    EditEntityNameComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class EditEntityNameModule { }
