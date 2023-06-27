import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[inputUpperCase]'
})


export class InputUpperCaseDirective {

  @Output() ngModelChange = new EventEmitter();

  constructor(private el: ElementRef,
              private control: NgControl) {}

  /**
   * Change input value in uppercase
  */
  @HostListener('input') onInput() {
    const value = this.control.value;
    if (value) {
      const transformedText = this.inputUppercase(value);
      this.el.nativeElement.value = transformedText;
      this.ngModelChange.emit(transformedText)
      this.control.control?.setValue(transformedText)
    }
  }

  inputUppercase(text: string): string {
    const words = text.toUpperCase();
    return words;
  }

}
