import { NgModule } from '@angular/core';
import { CustomMaxDirective } from 'app/@core/directives/max-value.directive';
import { CustomMinDirective } from 'app/@core/directives/min-value.directive';

@NgModule({
    declarations: [ CustomMaxDirective,CustomMinDirective ],
    exports: [  CustomMaxDirective,CustomMinDirective ]
  })
  export class MinMaxDirectiveModule {}