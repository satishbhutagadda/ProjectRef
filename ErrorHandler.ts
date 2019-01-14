import { ErrorHandler, Injectable, Inject, NgZone, Injector } from "@angular/core";
import { Router } from "@angular/router";
import { Globals } from "app/globals";
@Injectable()
export class RsErrorHandler extends ErrorHandler {

    constructor(private injector: Injector, private globals: Globals) {
        super()
    }

    public get router(): Router {
        return this.injector.get(Router);
    }

    handleError(error) {
        console.log(error);
        if(error == 'invalid_grant'){
            this.globals.loginInvalid=true;
            this.globals.loginInvalidMsg="Your login attempt was not successfull, try again Reason: Bad Credentials";
        }
        
    }
}
