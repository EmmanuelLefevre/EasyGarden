import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DirectivesModule } from 'src/app/_directives/directives.module';

import { MatSelectModule } from '@angular/material/select';
import { PublicComponentsModule } from 'src/app/components/public-components.module';

import { AddComponent } from './add.component';


@NgModule({
  declarations: [
    AddComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DirectivesModule,
    MatSelectModule,
    PublicComponentsModule
  ],
  exports: [
    AddComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AddModule { }
