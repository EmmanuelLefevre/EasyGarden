import { Directive, ElementRef, HostListener  } from '@angular/core';

@Directive({
  selector: '[removeNgValid]'
})


export class RemoveNgValidDirective {

  constructor(private elementRef: ElementRef) {}

  @HostListener('focus') onFocus() {
    this.removeNgValidClass();
  }

  private removeNgValidClass() {
    const selectElement = this.elementRef.nativeElement as HTMLSelectElement;
    selectElement.classList.remove('ng-valid');
  }

}