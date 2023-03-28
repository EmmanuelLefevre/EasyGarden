import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrossSvgModule } from './crossSvgComponent/cross-svg.module';


@NgModule({
  imports: [
    CommonModule,
    CrossSvgModule
  ],
  exports: [
    CrossSvgModule
  ]
})

export class PrivateComponentsModule { }
