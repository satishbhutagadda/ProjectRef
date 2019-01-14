import { NgModule } from '@angular/core';
import { SortPipe } from 'app/@core/pipes/orderby.pipe';



@NgModule({
    declarations: [SortPipe],
    exports: [SortPipe]
})
export class SortPipeModule { }