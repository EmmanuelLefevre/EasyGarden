import { NgModule } from '@angular/core';
import { InputFocusDirective } from './inputFocus/inputFocus.directive';
import { InputTrimDirective } from './inputTrim/inputTrim.directive';
import { InputTitleCaseDirective } from './inputTitleCase/inputTitleCase.directive';
import { InputUpperCaseDirective } from './inputUppercase/inputUppercase.directive';
import { RemoveNgPristineDirective } from './removeNgPristine/removeNgPristine.directive';
import { RemoveNgTouchedDirective } from './removeNgTouched/removeNgTouched.directive';
import { RemoveNgUntouchedDirective } from './removeNgUntouched/removeNgUntouched.directive';
import { RemoveNgValidDirective } from './removeNgValid/removeNgValid.directive';
import { SearchInputResetDirective } from './searchInputReset/search-input-reset.directive';


@NgModule({
  declarations: [	
    InputTrimDirective,
    InputFocusDirective,
    InputTitleCaseDirective,
    InputUpperCaseDirective,
    RemoveNgPristineDirective,
    RemoveNgTouchedDirective,
    RemoveNgUntouchedDirective,
    RemoveNgValidDirective,
    SearchInputResetDirective
   ],
  exports: [
    InputTrimDirective,
    InputFocusDirective,
    InputTitleCaseDirective,
    InputUpperCaseDirective,
    RemoveNgPristineDirective,
    RemoveNgTouchedDirective,
    RemoveNgUntouchedDirective,
    RemoveNgValidDirective,
    SearchInputResetDirective
  ]
})

export class DirectivesModule { }