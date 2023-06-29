import { NgModule } from '@angular/core';
import { InputClearDirective } from './inputClear/inputClear.directive';
import { InputFocusDirective } from './inputFocus/inputFocus.directive';
import { InputTrimDirective } from './inputTrim/inputTrim.directive';
import { InputTitleCaseDirective } from './inputTitleCase/inputTitleCase.directive';
import { InputUpperCaseDirective } from './inputUppercase/inputUppercase.directive';
import { RemoveNgPristineDirective } from './removeNgPristine/removeNgPristine.directive';
import { RemoveNgTouchedDirective } from './removeNgTouched/removeNgTouched.directive';
import { RemoveNgUntouchedDirective } from './removeNgUntouched/removeNgUntouched.directive';
import { RemoveNgValidDirective } from './removeNgValid/removeNgValid.directive';


@NgModule({
  declarations: [	
    InputTrimDirective,
    InputFocusDirective,
    InputClearDirective,
    InputTitleCaseDirective,
    InputUpperCaseDirective,
    RemoveNgPristineDirective,
    RemoveNgTouchedDirective,
    RemoveNgUntouchedDirective,
    RemoveNgValidDirective
   ],
  exports: [
    InputTrimDirective,
    InputFocusDirective,
    InputClearDirective,
    InputTitleCaseDirective,
    InputUpperCaseDirective,
    RemoveNgPristineDirective,
    RemoveNgTouchedDirective,
    RemoveNgUntouchedDirective,
    RemoveNgValidDirective
  ]
})

export class DirectivesModule { }