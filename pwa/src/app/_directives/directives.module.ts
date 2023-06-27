import { NgModule } from '@angular/core';
import { InputClearDirective } from './inputClear/inputClear.directive';
import { InputFocusDirective } from './inputFocus/inputFocus.directive';
import { InputTrimDirective } from './inputTrim/inputTrim.directive';
import { InputTitleCaseDirective } from './inputTitleCase/inputTitleCase.directive';
import { InputUpperCaseDirective } from './inputUpperCase/inputUpperCase.directive';


@NgModule({
  declarations: [	
    InputTrimDirective,
    InputFocusDirective,
    InputClearDirective,
    InputTitleCaseDirective,
    InputUpperCaseDirective
   ],
  exports: [
    InputTrimDirective,
    InputFocusDirective,
    InputClearDirective,
    InputTitleCaseDirective,
    InputUpperCaseDirective
  ]
})

export class DirectivesModule { }