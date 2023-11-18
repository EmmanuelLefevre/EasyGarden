import { Directive, ElementRef, HostListener, Renderer2  } from '@angular/core';

@Directive({
  selector: '[removeNgTouched]'
})


export class RemoveNgTouchedDirective {

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2) {}

  @HostListener('change') onChange() {
    this.removeNgTouched();
  }

  private removeNgTouched() {
    const selectElement = this.elementRef.nativeElement as HTMLSelectElement;
    this.renderer.removeClass(selectElement, 'ng-touched');
  }

}
