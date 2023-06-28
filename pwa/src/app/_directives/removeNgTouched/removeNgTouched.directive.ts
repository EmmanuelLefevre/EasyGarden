import { Directive, ElementRef, HostListener  } from '@angular/core';

@Directive({
  selector: '[removeNgTouched]'
})


export class RemoveNgTouchedDirective {

  constructor(private elementRef: ElementRef) {}

  @HostListener('focus') onFocus() {
    this.removeNgTouchedClass();
  }

  private removeNgTouchedClass() {
    const selectElement = this.elementRef.nativeElement as HTMLSelectElement;
    selectElement.classList.remove('ng-touched');
  }

}
