import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule, GrowlModule, DialogModule, DataListModule, MessageModule, AutoCompleteModule, InputMaskModule, AccordionModule, TabViewModule, CheckboxModule } from 'primeng/primeng';
import { ModelDataService } from '../@core/services/model.service';
import { HomeHealthBasicDetailsComponent } from './basicdetails/basicdetails.component';

import { CustomMinDirective } from 'app/@core/directives/min-value.directive';
import { CustomMaxDirective } from 'app/@core/directives/max-value.directive';
import { MinMaxDirectiveModule } from 'app/@core/directives/minMax-directive.module';

import { NgxPaginationModule } from 'ngx-pagination';
import { UppercaseModule } from 'app/@core/directives/uppercase.module';
import { NoSpaceModule } from 'app/@core/directives/nospace.directive';
import { SortPipeModule } from 'app/@core/pipes/sort-pipe.module';
import { HomeHealthLayoutComponent } from 'app/home-health/home-health-layout.component';
import { HomeHealthPolicyRoutingModule } from 'app/home-health/home-health.routing';
import { HomeHealthLandingComponent } from 'app/home-health/home-health-landing/home-health-landing.component';
import { HomeHealthDetailsComponent } from 'app/home-health/products/products.component';
import { CommonDataService } from 'app/@core/services/data.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { PolicyService } from 'app/@core/services/policy.services';
import { QuoteComponent } from 'app/home-health/quote/quote.component';
import { HomeHealthService } from 'app/home-health/home-health.service';
import { HomeHealthSummaryComponent } from 'app/home-health/summary/home-summary.component';
import { HomeHealthNavComponent } from 'app/home-health/home-health-nav/home-health-nav.component';
import { HomeHealthSearchComponent } from 'app/home-health/search/home-health-search.component';
import { RandomMessageService } from 'app/@core/services/randomMessage.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CalendarModule,
        GrowlModule,
        DialogModule,
        DataListModule,
        MessageModule,
        AutoCompleteModule,
        InputMaskModule,
        HomeHealthPolicyRoutingModule,
        AccordionModule,
        TabViewModule,
        MinMaxDirectiveModule,
        NgxPaginationModule,
        CheckboxModule,
        UppercaseModule,
        NoSpaceModule,
        SortPipeModule
    ],
    declarations: [
        HomeHealthLayoutComponent,
        HomeHealthNavComponent,
        HomeHealthLandingComponent,
        HomeHealthSearchComponent,
        HomeHealthBasicDetailsComponent,
        HomeHealthDetailsComponent,
        QuoteComponent,
        HomeHealthSummaryComponent
    ],
    providers: [ModelDataService,RandomMessageService,  DatePipe,MessageService, CommonDataService,
        PolicyService,HomeHealthService],
        exports:[HomeHealthNavComponent,HomeHealthSummaryComponent]
})
export class HomeHealthModule { }