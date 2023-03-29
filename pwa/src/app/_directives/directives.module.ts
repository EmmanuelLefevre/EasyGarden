import { NgModule } from '@angular/core';
import { InputFocusDirective } from './inputFocus/inputFocus.directive';
import { InputTrimDirective } from './inputTrim/inputTrim.directive';


@NgModule({
  declarations: [
    InputTrimDirective,
    InputFocusDirective],
  exports: [
    InputTrimDirective,
    InputFocusDirective
  ]
})

export class DirectivesModule { }