import { EventEmitter, Output, ElementRef, Component, OnInit, AfterViewInit } from '@angular/core';
import { NgModule, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { UppercaseModule } from 'app/@core/directives/uppercase.module';
@Component({
    selector: 'registrationnumber',
    templateUrl: './regNo.template.html',
})


// @@@@ Registration Number Directive Syntax
// <registrationnumber 
//     (onChange)="onChangeRegNumber($event)"
//     [(typeOfRegistration)]="regType"
//     [required]="true"
//     [value]="regNo"></registrationnumber>
// 


export class RegNoComponent implements OnInit, AfterViewInit {
    requiredForBackDated: boolean = false;
    @Input('name') name: any;
    regNoValue: RegNoFormat = new RegNoFormat();
    @Input('typeOfRegistration') typeOfRegistration: string;
    @Input('value') regnum: string;
    @Input('required') requiredChild: boolean;

    @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();
    @ViewChild('regNoComponent') regNoComponent: NgForm;

    @Input('disabled') disabled: boolean = false;
    constructor() {
    }

    ngOnInit() {
        this.regNoValue.registraionNumber = this.regnum;
        this.requiredForBackDated = this.requiredChild;
        this.splitregNuParts();
        this.validateAllFields();
    }

    splitregNuParts() {
        if (this.typeOfRegistration == 'New' && this.regNoValue.registraionNumber) {
            let regParts = this.regNoValue.registraionNumber.split('~');
            this.regNoValue.registrationNoPart1 = regParts[0];
            this.regNoValue.registrationNoPart2 = regParts[1];
            this.regNoValue.registrationNoPart3 = regParts[2];
            this.regNoValue.registrationNoPart4 = regParts[3];
        } else if (this.typeOfRegistration == 'Old' && this.regNoValue.registraionNumber) {
            let regParts = this.regNoValue.registraionNumber.split('~');
            this.regNoValue.OldregistrationNoPart1 = regParts[0];
            this.regNoValue.OldregistrationNoPart2 = regParts[1];
        } else {
            this.regNoValue.registrationNoPart1 = '';
            this.regNoValue.registrationNoPart2 = '';
            this.regNoValue.registrationNoPart3 = '';
            this.regNoValue.registrationNoPart4 = '';
        }

        this.ValidationReg();
    }

    FocusNextInput(value, maxLength, index) {
        if (value && (maxLength == value.length) && index) {
            if (index <= 3) {
                $(`#registrationNoPart${index + 1}`).focus();
            }
        }
        this.ValidationReg();

    }

    validateAllFields() {

        if ((this.regNoValue.registrationNoPart1
            && this.regNoValue.registrationNoPart2
            && this.regNoValue.registrationNoPart3
            && this.regNoValue.registrationNoPart4)) {
            if (this.requiredForBackDated) {
                this.requiredChild = true;
            } else {
                this.requiredChild = false;
            }
        }
        else if ((this.regNoValue.registrationNoPart1
            || this.regNoValue.registrationNoPart2
            || this.regNoValue.registrationNoPart3
            || this.regNoValue.registrationNoPart4)) {
            this.requiredChild = true;
        } else if (this.requiredForBackDated) {
            this.requiredChild = true;
        } else {
            this.requiredChild = false;
        }
    }

    ValidationReg() {
        this.validateAllFields();
        this.setRegValue();

        this.onChange.emit({ regNo: this.regnum, regType: this.typeOfRegistration });

    }

    setRegValue() {
        if (this.typeOfRegistration == 'New'
            && this.regNoComponent.form.valid
            && this.regNoValue.registrationNoPart1
            && this.regNoValue.registrationNoPart2
            && this.regNoValue.registrationNoPart3
            && this.regNoValue.registrationNoPart4
        ) {
            this.regNoValue.registraionNumber =
                this.regNoValue.registrationNoPart1 + '~' +
                this.regNoValue.registrationNoPart2 + '~' +
                this.regNoValue.registrationNoPart3 + '~' +
                this.regNoValue.registrationNoPart4;
            this.regnum = this.regNoValue.registraionNumber;
        } else if (this.typeOfRegistration == 'Old'
            && this.regNoComponent.form.valid
            && this.regNoValue.OldregistrationNoPart1
            && this.regNoValue.OldregistrationNoPart2
        ) {
            this.regNoValue.registraionNumber =
                this.regNoValue.OldregistrationNoPart1 + '~' +
                this.regNoValue.OldregistrationNoPart2;
            this.regnum = this.regNoValue.registraionNumber;
        } else {
            this.regnum = '';
        }
    }

    onchangeRegType() {
        this.clearFormFields();
        this.onChange.emit({ regNo: this.regnum, regType: this.typeOfRegistration });
    }

    clearFormFields() {
        this.regNoValue.registrationNoPart1 = '';
        this.regNoValue.registrationNoPart2 = '';
        this.regNoValue.registrationNoPart3 = '';
        this.regNoValue.registrationNoPart4 = '';
        this.regNoValue.OldregistrationNoPart1 = '';
        this.regNoValue.OldregistrationNoPart2 = '';
        this.regNoValue.registraionNumber = '';
        this.regnum = '';
        if (this.requiredForBackDated) {
            this.requiredChild = true;
        } else {
            this.requiredChild = false;
        }

    }

    ngAfterViewInit() {

    }
}

export class RegNoFormat {
    OldregistrationNoPart1: string;
    OldregistrationNoPart2: string;
    registrationNoPart1: string;
    registrationNoPart2: string;
    registrationNoPart3: string;
    registrationNoPart4: string;
    registraionNumber: string;
}

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        UppercaseModule
    ],
    declarations: [RegNoComponent],
    exports: [RegNoComponent]
})
export class RegistrationNumberModule { }