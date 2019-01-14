import { NgModule } from '@angular/core';
import { SafePipe } from 'app/@core/pipes/safe-url.ppe';


@NgModule({
    declarations: [ SafePipe ],
    exports: [ SafePipe ]
  })
  export class SafeDirectiveModule {}