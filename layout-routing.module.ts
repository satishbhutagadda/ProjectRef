import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'dashboard', loadChildren: '../dashboard/dashboard.module#DashboardModule' },
            { path: 'policysearch', loadChildren: '../policysearch/policysearch.module#PolicySearchModule' },
            { path: 'newEndorsements/:policyId/:userName/:productName/:proposalCode/:subline', loadChildren: '../endorsements/endorsement.module#EndorsementModule' },
            { path: 'nonFinacialEndorsements', loadChildren: '../nonfinancialendorsements/nonfin.module#NonFinancialModule' },
            { path: 'financial', loadChildren: '../financialendorsements/fin.module#FinancialModule' },
            { path: 'motor', loadChildren: '../policy/policy.module#PolicyModule' },
            { path: 'home', loadChildren: '../homepolicy/policy.module#PolicyModule' },
            { path: 'quickquote', loadChildren: '../quickquote/quickquote.module#QuickquoteModule' },
            { path: 'health', loadChildren: '../health/health.module#HealthModule' },
            { path: 'dit', loadChildren: '../dit/dit.module#DITModule' },
            { path: 'travelinsurance', loadChildren: '../travel-insurance/travel-insurance.module#TravelInsuranceModule' },
            { path: 'enrichMotor', loadChildren: '../enrich-policy/enrich-policy.module#EnrichPolicyModule' },
            { path: 'Endorsements/:policyId/:userName/:productName/:proposalCode/:subline', loadChildren: '../healthEndorsements/newEndorsements.module#NewEndorsementModule'},
            { path: 'healthNonFinacialEndorsements', loadChildren: '../Health_NonFin/healthnonfinan.module#HealthNonFinancialModule' },
            { path: 'payment/:id/:quoteNo/:inceptionDate/:tranType/:agentCode/:paymentAmt/:customerName/:productName/:channel', loadChildren: '../payment/payment.module#PaymentModule' },
            { path: 'changeuserdetails', loadChildren: '../changedetails/changedetails.module#changeUserDetailsModule' },
            { path: 'quickcalc', loadChildren: '../quickcalc/quickcalc.module#QuickcalcModule' },
            
            //  { path: 'not-found', loadChildren: './not-found/not-found.module#NotFoundModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
