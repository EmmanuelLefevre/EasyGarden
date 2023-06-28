import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DirectivesModule } from 'src/app/_directives/directives.module';

import { CloseFormButtonModule } from 'src/app/components/closeFormButton/close-form-button.module';

import { EditNameEntityComponent } from './edit-name-entity.component';


@NgModule({
  declarations: [
    EditNameEntityComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DirectivesModule,
    CloseFormButtonModule
  ],
  exports: [
    EditNameEntityComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class EditNameEntityModule { }
