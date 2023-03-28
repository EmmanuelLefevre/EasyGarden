import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrossSvgComponent } from './cross-svg.component';


@NgModule({
  declarations: [
    CrossSvgComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CrossSvgComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class CrossSvgModule { }