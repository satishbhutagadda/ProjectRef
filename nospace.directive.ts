import { NgModule } from '@angular/core';
import { RemoveSpacesDirective } from 'app/@core/pipes/removespaces.pipe';




@NgModule({
    declarations: [RemoveSpacesDirective],
    exports: [RemoveSpacesDirective]
})
export class NoSpaceModule { }