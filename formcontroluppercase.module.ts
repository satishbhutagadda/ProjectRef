import { NgModule } from '@angular/core';
import { FormControlUppercaseDirective } from 'app/@core/directives/formcontroluppercase.directive';


@NgModule({
    declarations: [FormControlUppercaseDirective],
    exports: [FormControlUppercaseDirective]
})
export class FormControlUppercaseModule { }