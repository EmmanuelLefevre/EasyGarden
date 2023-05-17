import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[firstLetterWordsUppercase]'
})


export class FirstLetterWordsUppercaseDirective {

  @Output() ngModelChange = new EventEmitter();
  
  constructor(private el: ElementRef,
              private control: NgControl) {}

  /**
   * Change first letter of each words in uppercase
  */            
  @HostListener('focusout') onFocusOut() {
    if (this.el.nativeElement.value) {
      const arr: string[] = this.el.nativeElement.value.split('');
      arr[0] = arr[0].toUpperCase();
      this.el.nativeElement.value = arr.join('');
      this.ngModelChange.emit(this.el.nativeElement.value)
      this.control.control?.setValue(this.el.nativeElement.value)
    }
  }
}
