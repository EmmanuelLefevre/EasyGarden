import { Directive, OnInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[inputFocus]'
})


export class InputFocusDirective implements OnInit {

  constructor(private el: ElementRef) {}

  /**
   * Focus input on component init
   */
  ngOnInit() {
    this.el.nativeElement.focus();
  }

}
