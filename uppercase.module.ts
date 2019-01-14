import { NgModule } from '@angular/core';
import { UppercaseDirective } from 'app/@core/directives/uppercase.directive';


@NgModule({
    declarations: [UppercaseDirective],
    exports: [UppercaseDirective]
})
export class UppercaseModule { }