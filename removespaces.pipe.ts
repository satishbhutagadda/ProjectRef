import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'nospace'})
export class RemoveSpacesDirective implements PipeTransform {
  transform(value: string): string {
    let newStr: string = "";
    newStr = value.replace(/\s+/g, '');
    return newStr;
  }
}