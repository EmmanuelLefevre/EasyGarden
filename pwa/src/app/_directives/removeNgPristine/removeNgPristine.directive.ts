import { Directive, ElementRef, HostListener, Renderer2  } from '@angular/core';

@Directive({
  selector: '[removeNgPristine]'
})


export class RemoveNgPristineDirective {

  constructor(private elementRef: ElementRef, 
              private renderer: Renderer2) {}

  @HostListener('change') onChange() {
    this.removeNgPristine();
  }

  private removeNgPristine() {
    const selectElement = this.elementRef.nativeElement as HTMLSelectElement;
    this.renderer.removeClass(selectElement, 'ng-pristine');
  }

}