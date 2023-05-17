import { NgModule } from '@angular/core';
import { InputClearDirective } from './inputClear/inputClear.directive';
import { InputFocusDirective } from './inputFocus/inputFocus.directive';
import { InputTrimDirective } from './inputTrim/inputTrim.directive';
import { UcFirstDirective } from './ucFirst/ucFirst.directive';


@NgModule({
  declarations: [	
    InputTrimDirective,
    InputFocusDirective,
    InputClearDirective,
    UcFirstDirective
   ],
  exports: [
    InputTrimDirective,
    InputFocusDirective,
    InputClearDirective
  ]
})

export class DirectivesModule { }