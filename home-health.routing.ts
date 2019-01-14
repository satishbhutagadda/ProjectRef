import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeHealthBasicDetailsComponent } from './basicdetails/basicdetails.component';
import { AuthGuard } from '../users/auth.guard';
import { HomePrintPolicyComponent } from 'app/homepolicy/printpolicy/home-printpolicy.component';
import { HomeHealthLayoutComponent } from 'app/home-health/home-health-layout.component';
import { HomeHealthLandingComponent } from 'app/home-health/home-health-landing/home-health-landing.component';
import { HomeHealthDetailsComponent } from 'app/home-health/products/products.component';
import { QuoteComponent } from 'app/home-health/quote/quote.component';
import { HomeHealthSummaryComponent } from 'app/home-health/summary/home-summary.component';
import { HomeHealthSearchComponent } from 'app/home-health/search/home-health-search.component';

const routes: Routes = [
    {
        path: '', component: HomeHealthLayoutComponent, children: [{
            path: '', component: HomeHealthLandingComponent
        }]
    },
    { path: 'search', component: HomeHealthSearchComponent },
    { path: 'basicDetails', component: HomeHealthBasicDetailsComponent, canActivate: [AuthGuard] },
    { path: 'homeDetails', component: HomeHealthDetailsComponent, canActivate: [AuthGuard] },
    { path: 'quote/:policyCode', component: QuoteComponent, canActivate: [AuthGuard] },
    { path: 'summary/:policyCode', component: HomeHealthSummaryComponent }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeHealthPolicyRoutingModule { }