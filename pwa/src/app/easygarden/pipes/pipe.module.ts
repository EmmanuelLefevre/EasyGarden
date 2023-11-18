import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { PresenceSensorPipe } from './presence-sensor.pipe';

@NgModule({
  declarations:[
    PresenceSensorPipe
  ],
  imports:[CommonModule],
  exports:[
    PresenceSensorPipe
  ]
})

export class MainPipeModule{}