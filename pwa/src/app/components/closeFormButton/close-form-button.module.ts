import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
// Modules
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTooltipModule } from '@angular/material/tooltip';
// Components
import { CloseFormButtonComponent } from './close-form-button.component';


@NgModule({
  declarations: [
    CloseFormButtonComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MatTooltipModule
  ],
  exports: [
    CloseFormButtonComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class CloseFormButtonModule { }
