import { NgModule } from '@angular/core';
import { InputClearDirective } from './inputClear/inputClear.directive';
import { InputFocusDirective } from './inputFocus/inputFocus.directive';
import { InputTrimDirective } from './inputTrim/inputTrim.directive';
import { InputFirstLetterWordsUppercaseDirective } from './inputFirstLetterWordsUppercase/inputFirstLetterWordsUppercase.directive';
import { InputUppercaseDirective } from './inputUppercase/inputUppercase.directive';


@NgModule({
  declarations: [	
    InputTrimDirective,
    InputFocusDirective,
    InputClearDirective,
    InputFirstLetterWordsUppercaseDirective,
    InputUppercaseDirective
   ],
  exports: [
    InputTrimDirective,
    InputFocusDirective,
    InputClearDirective,
    InputFirstLetterWordsUppercaseDirective,
    InputUppercaseDirective
  ]
})

export class DirectivesModule { }