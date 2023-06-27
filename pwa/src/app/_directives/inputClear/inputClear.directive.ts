import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[inputClear]'
})

export class InputClearDirective {
  
  @Input('inputSearch') searchInput: any;

  constructor() {}

  /**
   * Clear search input on click somewhere in an equipment component
   */
  @HostListener('click') onClick() {
    this.searchInput.name = '';
  }

}
