import { Injectable } from '@angular/core';
// RXJS
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class SharedFormInputValueService {

  private fieldValue = new BehaviorSubject<string>('');

  constructor() { }

  setFieldValue(value: string) {
    this.fieldValue.next(value);
  }

  getFieldValue() {
    return this.fieldValue.asObservable();
  }

}
