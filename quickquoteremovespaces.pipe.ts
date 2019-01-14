import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'quickquotenospace'})
export class QuickQuoteRemoveSpacesDirective implements PipeTransform {
  transform(value: string): string {
    let newStr: string = "";
    newStr = value.replace(/\s+/g, '');
    return newStr;
  }
}