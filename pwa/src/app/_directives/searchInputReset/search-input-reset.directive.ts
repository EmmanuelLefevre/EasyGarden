import { Directive, HostListener, Input, ElementRef } from '@angular/core';


@Directive({
  selector: '[searchInputReset]'
})

export class SearchInputResetDirective {

  @Input('searchInput') searchInput: any;

  constructor(private elementRef: ElementRef) {}

  /**
   * Reset search input to an empty string when click somewhere in an equipment component unless if it's an order, filter or update status method
   */
  @HostListener('document:click', ['$event.target']) onClick(target: HTMLElement) {
    const isSelect = this.elementRef.nativeElement.contains(target.closest('select.filter-select-garden'));
    const isTh = this.elementRef.nativeElement.contains(target.closest('th.order'));
    const isTd = this.elementRef.nativeElement.contains(target.closest('td.power'));
    
    if (!isSelect && !isTh && !isTd) {
      this.searchInput.name = '';
    }

  }

}
