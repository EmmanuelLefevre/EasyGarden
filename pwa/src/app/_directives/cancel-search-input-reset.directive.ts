import { Directive, HostListener, Input } from '@angular/core';


@Directive({
  selector: '[cancelSearchInputReset]'
})

export class CancelSearchInputResetDirective {

  @Input('searchInput') searchInput: any;

  constructor() { }

  /**
   * Cancel search input reset on pagination event
   */
  @HostListener('document:click', ['$event']) onClick(event: MouseEvent) { }

}
