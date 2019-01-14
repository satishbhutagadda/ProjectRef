import { Directive, ElementRef, HostListener, Input } from '@angular/core';
@Directive( {
    selector: '[customfocus]'
} )
export class Customfocus {

    private el: ElementRef;
    private value: number;
    private parent: number;

    @Input() set customfocus( value: string ) {
        var spVal = value.split( ',' );
        this.parent = parseInt( spVal[0] );
        this.value = parseInt( spVal[1] );
    }

    constructor( private _el: ElementRef ) {
        this.el = this._el;
    }

    @HostListener( 'keydown', ['$event'] ) onKeyDown( e ) {
        if ( ( e.which != 8 && e.keyCode != 46 ) ) {
            let control: any;
            control = e.srcElement.nextElementSibling;
            while ( true ) {
                if ( control ) {
                    if ( ( !control.hidden ) &&
                        ( control.nodeName == 'INPUT' ||
                            control.nodeName == 'SELECT' ||
                            control.nodeName == 'BUTTON' ||
                            control.nodeName == 'TEXTAREA' ) ) {
                        if ( e.srcElement.value.length == this.value ) {
                            control.focus();
                        }
                        return;
                    }
                } else {
                    return;
                }
            }
        } else {
            let control: any;
            control = e.srcElement.previousElementSibling;
            if ( e.srcElement.value.length == 0 && this.parent != 1 ) {
                control.focus();
            }
            return;
        }

    }

}