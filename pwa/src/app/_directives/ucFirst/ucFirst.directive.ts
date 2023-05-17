import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[ucFirst]'
})


export class UcFirstDirective {

  @Output() ngModelChange = new EventEmitter();

  constructor(private el: ElementRef,
              private control: NgControl) {}

  /**
  * Change first letter of each word in uppercase
  */
  @HostListener('focusout') onFocusOut() {
    (this.el.nativeElement as HTMLInputElement).value = (this.el.nativeElement as HTMLInputElement).value.charAt(0).toUpperCase();
    this.ngModelChange.emit(this.el.nativeElement.value)
    this.control.control?.setValue(this.el.nativeElement.value)
  }

}