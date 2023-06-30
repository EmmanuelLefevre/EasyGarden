import { Injectable } from '@angular/core';

import { ILawnmower } from '../modules/lawnmower/ILawnmower';
import { ILightning } from '../modules/lightning/ILightning';
import { IPool } from '../modules/pool/IPool';
import { IPortal } from '../modules/portal/IPortal';
import { IWatering } from '../modules/watering/IWatering';


@Injectable({
  providedIn: 'root'
})

export class GardenFilterService {

  private p: number = 1;

  constructor() { }

  convertSelectedGardenId(selectedGardenId: number | string): number | '' {
    if (typeof selectedGardenId === 'string' && selectedGardenId !== '') {
      return parseInt(selectedGardenId, 10);
    }
    return selectedGardenId;
  }

  filterByGarden<T extends ILawnmower | ILightning | IPool | IPortal | IWatering>(
    items: T[],
    selectedGardenId: number | '',
    propertyName: keyof T
  ): T[] {
    let filteredItems: T[] = [];

    if (selectedGardenId === '') {
      filteredItems = [...items];
    } else {
      filteredItems = items.filter((item: T) => {
        if (typeof item.garden?.id === 'number') {
          return item.garden.id === selectedGardenId;
        }
        return false;
      });
    }

    filteredItems.sort((a, b) => {
      if (a.status === b.status) {
        if (typeof a[propertyName] === 'string' && typeof b[propertyName] === 'string') {
          return (a[propertyName] as string).localeCompare(b[propertyName] as string);
        } else {
          // Handle the case where the specified property is not a string
          return 0;
        }
      } else if (a.status) {
        return -1;
      } else {
        return 1;
      }
    });

    // Reset paging
    this.p = 1;
    
    return filteredItems;

  }

  setPageNumber(pageNumber: number): void {
    this.p = pageNumber;
  }

  getPageNumber(): number {
    return this.p;
  }

}
