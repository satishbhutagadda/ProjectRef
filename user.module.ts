import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonDataService } from '../@core/services/data.service';
import { UserRoutingModule } from './user.routing';
import { LoginComponent } from '../users/login.component';
import { LoginService } from '../users/login.service';
import { ApiEndPoints } from 'app/api-end-points';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        UserRoutingModule
    ],
    declarations: [ 
        LoginComponent
    ],
    providers: [ LoginService,ApiEndPoints ]
})
export class UserModule {
}
