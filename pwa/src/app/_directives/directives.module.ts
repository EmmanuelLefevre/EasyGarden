import { NgModule } from '@angular/core';
import { InputClearDirective } from './inputClear/inputClear.directive';
import { InputFocusDirective } from './inputFocus/inputFocus.directive';
import { InputTrimDirective } from './inputTrim/inputTrim.directive';


@NgModule({
  declarations: [
    InputTrimDirective,
    InputFocusDirective,
    InputClearDirective
  ],
  exports: [
    InputTrimDirective,
    InputFocusDirective
  ]
})

export class DirectivesModule { }