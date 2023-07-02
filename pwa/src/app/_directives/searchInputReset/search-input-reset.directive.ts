import { Directive, HostListener, Input, ElementRef } from '@angular/core';


@Directive({
  selector: '[searchInputReset]'
})

export class SearchInputResetDirective {

  @Input('searchInput') searchInput: any;

  constructor(private elementRef: ElementRef) {}

  /**
   * Clear search input on click somewhere in an equipment component unless if it's an order, filter or update status method
   */
  @HostListener('document:click', ['$event.target']) onClick(target: HTMLElement) {
    const isSelect = this.elementRef.nativeElement.contains(target.closest('select.filter-select-garden'));
    const isTh = this.elementRef.nativeElement.contains(target.closest('th.order'));
    const isTd = this.elementRef.nativeElement.contains(target.closest('td.power'));
    const isPagination = target.closest('.pagination li');

    console.log('isPagination:', isPagination);
    console.log('Pagination Element:', target.closest('div.pagination > pagination-controls > pagination-template > nav > ul.ngx-pagination > li'));
    
    if (!isSelect && !isTh && !isTd && (!isPagination && this.searchInput.name == '')) {
      this.searchInput.name = '';
    }

  }

}
