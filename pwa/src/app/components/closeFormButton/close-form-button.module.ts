import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CloseFormButtonComponent } from './close-form-button.component';


@NgModule({
  declarations: [
    CloseFormButtonComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    CloseFormButtonComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class CloseFormButtonModule { }
