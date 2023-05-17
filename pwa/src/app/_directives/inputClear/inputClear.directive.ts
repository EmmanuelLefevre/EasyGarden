import { Directive, ElementRef, AfterViewInit } from '@angular/core';


@Directive({
  selector: '[inputClear]'
})

export class InputClearDirective implements AfterViewInit {
  searchInput: any;

  constructor(private el: ElementRef) {}

  /**
   * Clear input on click in component
   */
   ngAfterViewInit() {
    this.searchInput.name = '';
  } 

}
