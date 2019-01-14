import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { CommonDataService } from 'app/@core/services/data.service'
import { PolicyService } from 'app/@core/services/policy.services';
import { MessageService } from 'primeng/components/common/messageservice';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from '../common/header.component';
import { SideNavComponent } from '../common/sidenav.component';
import { FooterComponent } from '../common/footer.component';
import { TooltipModule, DialogModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { DITService } from 'app/dit/dit.service';
import { SafeDirectiveModule } from 'app/@core/directives/safe.directive';


@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TooltipModule,
        DialogModule,
        FormsModule,
        SafeDirectiveModule
    ],
    declarations: [
        LayoutComponent,
        HeaderComponent,
        SideNavComponent,
        FooterComponent
        
    ],
    providers: [
        DatePipe,
        MessageService,
        CommonDataService,
        PolicyService,
        DITService
    ]
})
export class LayoutModule { }
