import { Directive, EventEmitter, HostListener, Output, ElementRef, Component, OnInit, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
import { FormControl, FormGroup, FormBuilder, FormArray, NgForm, FormsModule } from '@angular/forms';
declare var $: any;
import * as moment from 'moment';
@Component({
    selector: 'rs-datetimepicker',
    template: `
    <form #datePickerComponent="ngForm" class="form-group">
    <div [id]="id+'panelDate'" class="col-12 p-0">
    <input 
    [required]="required"
    [disabled]="disabled"
    [readonly]="readonly"
    type="text" [id]="id+'inceptionDateRS'" (change)="onManualChangeDate()" [(ngModel)]="dateValue" name="inceptionDate" class="DateRSClass form-control"
     #inceptionDate="ngModel">
     
    <div *ngIf="!readonly" [id]="id+'demo1'" class="rs-calendar"></div>
</div>
</form>`,
    styles: [`
.rs-calendar {
    display: none;
    position: absolute;
}

.DateRSClass:focus{
	display: block;
}

.rs-calendar:focus {
	display: block !important;
}

.gj-datepicker-md [role=right-icon]{
	display: none;
}
`]
})
export class RSDatePickerDirective implements OnInit {
    viewMode: string;
    dateTimeDefaultFormat: string;
    momentTimeFormat: string;

    @Input('value') dateValue: any;
    @Input('id') id: any;
    @Input('required') required: boolean = false;
    @Input('disabled') disabled: boolean = false;
    @Input('readonly') readonly: boolean = false;
    @Input('showTime') showTime: boolean = false;


    @Output('onChange') changedDate: EventEmitter<any> = new EventEmitter();

    constructor() {

    }

    ngOnInit() {
        this.required = $.parseJSON(this.required);
        this.disabled = $.parseJSON(this.disabled);
        this.readonly = $.parseJSON(this.readonly);
        this.showTime = $.parseJSON(this.showTime);

        this.setFormats(this);

    }

    setFormats(scope) {

        if (scope.showTime) {
            scope.momentTimeFormat = 'DD/MM/YYYY HH:mm:ss';
            scope.dateTimeDefaultFormat = 'dd/MM/yyyy HH:mm:ss';
            scope.viewMode = 'YMDHMS';
        }
        else {
            scope.momentTimeFormat = 'DD/MM/YYYY';
            scope.dateTimeDefaultFormat = 'dd/MM/yyyy';
            scope.viewMode = 'YMD';
        }
    }

    onManualChangeDate() {
        if (moment(`${this.dateValue}`, this.momentTimeFormat).format(this.momentTimeFormat) != 'Invalid date') {
            this.changedDate.emit(this.dateValue);
        }
        else {
            this.dateValue = '';
            this.changedDate.emit(this.dateValue);
        }
    }

    checkFutureDate(date) {
        let futureDate = date.split('/');
        let todayDate = moment().format('DD');
        if ((moment().format('DD/MM/YYYY') != moment(futureDate, 'DD/MM/YYYY').format('DD/MM/YYYY')) && moment().diff(moment(futureDate, 'DD/MM/YYYY'), 'days') <= 0) {
            return true;
        } else {
            return false;
        }
    }


    ngAfterViewInit() {
        var self = this;
        $(`#${self.id}demo1`).datetimepicker({

            date: new Date(),
            viewMode: self.viewMode,
            firstDayOfWeek: 0,
            onDisplayUpdate: function () {

            },

            onDateChange: function (this) {

                let testValue = this.getValue();
                self.setFormats(self);
                if (self.dateValue != this.getText(self.dateTimeDefaultFormat)) {
                    self.dateValue = this.getText(self.dateTimeDefaultFormat);

                    if (self.checkFutureDate(self.dateValue.split(" ")[0])) {
                        self.dateValue = moment(self.dateValue.split(" ")[0], 'DD/MM/YYYY 00:00:00').format('DD/MM/YYYY 00:00:00');
                        let setDate = moment(self.dateValue, 'DD/MM/YYYY 00:00:00').toDate();
                        this.setSelectedDate(setDate);

                    }
                    else {
                        self.dateValue = this.getText(self.dateTimeDefaultFormat);
                        let setDate = moment(self.dateValue, 'DD/MM/YYYY HH:mm:ss').toDate();
                        this.setSelectedDate(setDate);
                        self.changedDate.emit(self.dateValue);
                    }

                    this.loadTimeView(new Date(moment(self.dateValue, 'DD/MM/YYYY HH:mm:ss').format()));
                    self.changedDate.emit(self.dateValue);
                }

            },
            onClear: function () {
                self.dateValue = '';
                this.dateValue = '';
                self.changedDate.emit(self.dateValue);
            },
            onOk: function (this) {
                self.setFormats(self);
                let formatdate = moment(this.getDisplayDate()).format(self.momentTimeFormat);

                let buildTime = `${this.$timetable.$h[0].value}:${this.$timetable.$m[0].value}:${this.$timetable.$s[0].value}`;

                self.dateValue = `${formatdate.split(' ')[0]} ${buildTime}`;
                self.changedDate.emit(self.dateValue);

                $(`#${self.id}demo1`).css({ 'z-index': '0', 'display': 'none' });
            },
            onClose: function () {
                $(`#${self.id}demo1`).css({ 'z-index': '0', 'display': 'none' });
            },
            onToday: function () {
                $(`#${self.id}demo1`).css({ 'z-index': '0', 'display': 'none' });
            },
        });

        $('.tt input').click(function () {
            console.log('clicked');
        })




        $(`#${self.id}inceptionDateRS`).focus(function () {
            $(`#${self.id}demo1`).css({ 'z-index': '100001', 'display': 'block' });
        });

        $(document).click(function (event) {
            if (event.target.id != `${self.id}inceptionDateRS`) {
                if (!$(event.target).closest(`#${self.id}demo1`).length) {
                    if ($(`#${self.id}demo1`).is(":visible")) {
                        $(`#${self.id}demo1`).hide();
                    }
                }
            }
        });

    }

}


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
    imports: [
        FormsModule,
        CommonModule
    ],
    declarations: [RSDatePickerDirective],
    exports: [RSDatePickerDirective]
})
export class RSDatePickerModuleModule { }