import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Modules
import { CloseFormButtonModule } from './closeFormButton/close-form-button.module';
import { EasygardenLogoModule } from './easyGardenLogo/easygarden-logo.module';


@NgModule({
  imports: [
    CommonModule,
    CloseFormButtonModule,
    EasygardenLogoModule
  ],
  exports: [
    CloseFormButtonModule,
    EasygardenLogoModule
  ]
})

export class PublicComponentsModule { }
