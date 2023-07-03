import { Directive, HostListener, Input, ElementRef } from '@angular/core';


@Directive({
  selector: '[searchInputReset]'
})

export class SearchInputResetDirective {

  @Input('searchInput') searchInput: any;

  constructor(private elementRef: ElementRef) {}

  /**
   * Reset search input to an empty string when click somewhere in the component unless if it's an order/filter/updateStatus method or a pagination click
   */
  @HostListener('document:click', ['$event.target']) onClick(target: HTMLElement) {
    const isSelect = this.elementRef.nativeElement.contains(target.closest('select.filter-select-garden'));
    const isTh = this.elementRef.nativeElement.contains(target.closest('th.order'));
    const isTd = this.elementRef.nativeElement.contains(target.closest('td.power'));
    // const isPagination = target.closest('div.pagination > pagination-controls > pagination-template > nav > ul.ngx-pagination > li');
    const isPagination = target.closest('.pagination') !== null;

    // if (!isSelect && !isTh && !isTd) {
    //   this.searchInput.name = '';
    // }
    if (!isSelect && !isTh && !isTd && (!isPagination && this.searchInput.name == '')) {
      this.searchInput.name = '';
    }

  }

}
