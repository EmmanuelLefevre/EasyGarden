import { NgModule } from '@angular/core';
import { InputClearDirective } from './inputClear/inputClear.directive';
import { InputFocusDirective } from './inputFocus/inputFocus.directive';
import { InputTrimDirective } from './inputTrim/inputTrim.directive';
import { InputTitleCaseDirective } from './inputTitleCase/inputTitleCase.directive';
import { InputUpperCaseDirective } from './inputUppercase/inputUppercase.directive';
import { RemoveNgTouchedDirective } from './removeNgTouched/removeNgTouched.directive';


@NgModule({
  declarations: [	
    InputTrimDirective,
    InputFocusDirective,
    InputClearDirective,
    InputTitleCaseDirective,
    InputUpperCaseDirective,
    RemoveNgTouchedDirective
   ],
  exports: [
    InputTrimDirective,
    InputFocusDirective,
    InputClearDirective,
    InputTitleCaseDirective,
    InputUpperCaseDirective,
    RemoveNgTouchedDirective
  ]
})

export class DirectivesModule { }