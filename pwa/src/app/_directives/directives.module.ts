import { NgModule } from '@angular/core';

import { CancelSearchInputResetDirective } from './cancel-search-input-reset.directive';
import { InputFocusDirective } from './inputFocus.directive';
import { InputTrimDirective } from './inputTrim.directive';
import { InputTitleCaseDirective } from './inputTitleCase.directive';
import { InputUpperCaseDirective } from './inputUppercase.directive';
import { RemoveNgPristineDirective } from './removeNgPristine.directive';
import { RemoveNgTouchedDirective } from './removeNgTouched.directive';
import { RemoveNgUntouchedDirective } from './removeNgUntouched.directive';
import { RemoveNgValidDirective } from './removeNgValid.directive';
import { SearchInputResetDirective } from './search-input-reset.directive';


@NgModule({
  declarations: [
    CancelSearchInputResetDirective,
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
    CancelSearchInputResetDirective,
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