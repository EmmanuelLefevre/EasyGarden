import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'presenceSensor'
})
export class PresenceSensorPipe implements PipeTransform {

  transform(value: any, ..._args: any[]): any {
    return value ? "Attention!" : "-";
  }

}
