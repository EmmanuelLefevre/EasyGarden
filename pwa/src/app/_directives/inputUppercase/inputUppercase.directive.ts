import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[inputUppercase]'
})


export class InputUppercaseDirective {

  @Output() ngModelChange = new EventEmitter();

  constructor(private el: ElementRef,
              private control: NgControl) {}

  /**
   * uppercase input value
  */
  @HostListener('focusout') onFocusOut() {
    (this.el.nativeElement as HTMLInputElement).value = (this.el.nativeElement as HTMLInputElement).value.toUpperCase();
    this.ngModelChange.emit(this.el.nativeElement.value)
    this.control.control?.setValue(this.el.nativeElement.value)
  }

}
