import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[inputClear]'
})

export class InputClearDirective {
  
  @Input('inputSearch') searchInput: any;

  constructor() {}

  /**
   * Clear input on click in component
   */
  @HostListener('click') onClick() {
    this.searchInput.name = '';
  }

}
