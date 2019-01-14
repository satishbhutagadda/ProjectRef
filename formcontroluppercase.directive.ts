import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
@Directive({
    selector: '[uppercase]'
})
export class FormControlUppercaseDirective {
    @Output() ngModelChange: EventEmitter<any> = new EventEmitter();
    value: any;

    @HostListener('input', ['$event']) onKeydownHandler($event) {
        this.value = $event.target.value.toUpperCase();
        $event.target.value = this.value;
    }
}