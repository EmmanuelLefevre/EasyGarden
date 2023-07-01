import { Directive, HostListener, Input, ElementRef } from '@angular/core';


@Directive({
  selector: '[inputClear]'
})

export class InputClearDirective {
  @Input('inputSearch') searchInput: any;

  constructor(private elementRef: ElementRef) {}

  /**
   * Clear search input on click somewhere in an equipment component unless if it's an order method
   */
  @HostListener('document:click', ['$event.target']) onClick(target: HTMLElement) {
    const isSelect = this.elementRef.nativeElement.contains(target.closest('select.filter-select-garden'));
    const isTh = this.elementRef.nativeElement.contains(target.closest('th.order'));

    if (!isSelect && !isTh) {
      this.searchInput.name = '';
    }
  }

}
