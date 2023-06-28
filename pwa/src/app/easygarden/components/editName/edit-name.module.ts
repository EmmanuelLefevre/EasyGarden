import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DirectivesModule } from 'src/app/_directives/directives.module';

import { CloseFormButtonModule } from 'src/app/components/closeFormButton/close-form-button.module';

import { EditNameComponent } from './edit-name.component';


@NgModule({
  declarations: [
    EditNameComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DirectivesModule,
    CloseFormButtonModule
  ],
  exports: [
    EditNameComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class EditNameModule { }
