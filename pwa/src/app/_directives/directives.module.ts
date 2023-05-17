import { NgModule } from '@angular/core';
import { InputClearDirective } from './inputClear/inputClear.directive';
import { InputFocusDirective } from './inputFocus/inputFocus.directive';
import { InputTrimDirective } from './inputTrim/inputTrim.directive';
import { FirstLetterWordsUppercaseDirective } from './firstLetterWordsUppercase/firstLetterWordsUppercase.directive';


@NgModule({
  declarations: [	
    InputTrimDirective,
    InputFocusDirective,
    InputClearDirective,
    FirstLetterWordsUppercaseDirective
   ],
  exports: [
    InputTrimDirective,
    InputFocusDirective,
    InputClearDirective,
    FirstLetterWordsUppercaseDirective
  ]
})

export class DirectivesModule { }