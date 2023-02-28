import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CloseFormButtonModule } from './closeFormButton/close-form-button.module';


@NgModule({
  imports: [
    CommonModule,
    CloseFormButtonModule
  ],
  exports: [
    CloseFormButtonModule
  ]
})

export class PublicComponentsModule { }
