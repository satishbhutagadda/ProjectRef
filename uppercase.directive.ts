import { Directive, EventEmitter, HostListener, Output, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[ngModel][uppercase]'
})
export class UppercaseDirective {
    @Output() ngModelChange: EventEmitter<any> = new EventEmitter();
    value: any;
    constructor(private ngControl: NgControl, private el: ElementRef) {
        this.onChanges();
    }
    onChanges() {
        this.ngControl.control.valueChanges.subscribe((val) => {
            let value = val;
            if(this.el.nativeElement.localName == 'p-autocomplete' && value != null && value != '' && value != undefined){
                this.el.nativeElement.children[0].children[0].value = value.toUpperCase();
            }
            else if(value){
                this.el.nativeElement.value = value.toUpperCase();
            }
        });
    }

    @HostListener('input', ['$event']) onKeydownHandler($event) {
        this.value = $event.target.value.toUpperCase();
        //$event.target.value = this.value;
        this.ngModelChange.emit(this.value);
    }


}