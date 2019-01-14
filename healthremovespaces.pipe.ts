import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'healthnospace'})
export class HealthRemoveSpacesDirective implements PipeTransform {
  transform(value: string): string {
    let newStr: string = "";
    newStr = value.replace(/\s+/g, '');
    return newStr;
  }
}