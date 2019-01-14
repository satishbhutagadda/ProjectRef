import { Pipe } from "@angular/core";

@Pipe({
  name: "sort"
})
export class SortPipe {
  transform(array: Array<string>, args: string): Array<string> {
    array.sort((a: any, b: any) => {
      if (isNaN(parseFloat(a)) && isNaN(parseFloat(b))) {
        if (a < b) {
          return -1;
        } else if (a > b) {
          return 1;
        } else {
          return 0;
        }
      } else if (!isNaN(parseFloat(a)) && !isNaN(parseFloat(b))) {
        if (parseFloat(a) < parseFloat(b)) {
          return -1;
        } else if (parseFloat(a) > parseFloat(b)) {
          return 1;
        } else {
          return 0;
        }
      }
    });
    return array;
  }
}