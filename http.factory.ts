
import {XHRBackend, Http, RequestOptions} from "@angular/http";
import {InterceptedHttp} from "./http.interceptor";
import { Globals } from "app/globals";
import { Router } from "@angular/router";
import { RefreshTokenService } from "app/users/refresh-token";
import { NgProgress } from "@ngx-progressbar/core";

export function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions,globals:Globals,router:Router,ngProgress: NgProgress): Http {
    return new InterceptedHttp(xhrBackend, requestOptions,globals,router,ngProgress);
}