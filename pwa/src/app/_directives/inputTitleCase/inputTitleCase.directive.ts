import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[inputTitleCase]'
})


export class InputTitleCaseDirective {

  @Output() ngModelChange = new EventEmitter();
  
  constructor(private el: ElementRef,
              private control: NgControl) {}

  /**
   * Change first letter of each words in uppercase
  */            
  @HostListener('input') onInput() {
    const value = this.control.value;
    if (value) {
      const transformedText = this.inputTitleCase(value);
      this.el.nativeElement.value = transformedText;
      this.ngModelChange.emit(transformedText)
      this.control.control?.setValue(transformedText)
    }
  }

  inputTitleCase(text: string): string {
    const words = text.split(' ');
  
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const dashIndex = word.indexOf('-');
      const apostropheIndex = word.indexOf("'");
  
      if (dashIndex !== -1 && dashIndex < word.length - 1) {
        const nextLetterIndex = dashIndex + 1;
        words[i] =
          word.substring(0, nextLetterIndex) +
          word.charAt(nextLetterIndex).toUpperCase() +
          word.substring(nextLetterIndex + 1);
      }
  
      if (apostropheIndex !== -1 && apostropheIndex < word.length - 1) {
        const nextLetterIndex = apostropheIndex + 1;
        words[i] =
          word.substring(0, nextLetterIndex) +
          word.charAt(nextLetterIndex).toUpperCase() +
          word.substring(nextLetterIndex + 1);
      }
    }
  
    return words
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

}
