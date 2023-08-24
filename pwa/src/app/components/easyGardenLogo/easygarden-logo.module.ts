import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
// Component
import { EasygardenLogoComponent } from './easygarden-logo.component';


@NgModule({
  declarations: [
    EasygardenLogoComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EasygardenLogoComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class EasygardenLogoModule { }