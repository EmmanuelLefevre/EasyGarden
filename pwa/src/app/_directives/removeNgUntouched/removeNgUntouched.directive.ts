import { Directive, ElementRef, HostListener, Renderer2  } from '@angular/core';

@Directive({
  selector: '[removeNgUntouched]'
})


export class RemoveNgUntouchedDirective {

  constructor(private elementRef: ElementRef, 
              private renderer: Renderer2) {}

  @HostListener('change') onChange() {
    this.removeNgUntouched();
  }

  private removeNgUntouched() {
    const selectElement = this.elementRef.nativeElement as HTMLSelectElement;
    this.renderer.removeClass(selectElement, 'ng-untouched');
  }

}