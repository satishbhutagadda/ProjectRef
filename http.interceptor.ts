import { Injectable } from "@angular/core";
import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { environment } from "../../environments/environment";
import * as moment from 'moment';
import { Globals } from "app/globals";
import { Router } from "@angular/router";
import { RefreshTokenService } from "app/users/refresh-token";
import { NgProgress } from "@ngx-progressbar/core";
@Injectable()
export class InterceptedHttp extends Http {
    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private globals: Globals, private router: Router, public ngProgress: NgProgress) {
        super(backend, defaultOptions);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return super.request(url, options).map((response) => {
            return response;
        });
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        this.beforeRequest();
        return super.get(url, this.getRequestOptionArgs(options)).map((response) => {
            this.afterRequest();
            return response;
        }).finally(() => {
            this.afterRequest();
        });
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        this.beforeRequest();
        if (url.includes('getTokenService') || url.includes('RefreshTokenService')) {
            return super.post(url, body, options).map((response) => {
                this.afterRequest();
                return response;
            })
                .finally(() => {
                    this.afterRequest();
                });

        } else {
            return super.post(url, body, this.getRequestOptionArgs(options)).map((response) => {
                this.afterRequest();
                return response;
            })
                .finally(() => {
                    this.afterRequest();
                });

        }

    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.put(url, body, this.getRequestOptionArgs(options)).map((response) => {
            this.afterRequest();
            return response;
        }).finally(() => {
            this.afterRequest();
        });
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.delete(url, this.getRequestOptionArgs(options)).map((response) => {
            this.afterRequest();
            return response;
        }).finally(() => {
            this.afterRequest();
            alert('Something went wrong please contact your system administrator !!')
        });
    }

    private beforeRequest(): void {

        $('#loadingScreen').addClass('d-block');
    }


    private afterRequest(): void {

        $('#loadingScreen').removeClass('d-block');
    }

    private getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        if (this.globals.USEOAUTH) {
            let currentToken = '';
            let refreshToken = '';
            let Dbtoken = '';
            if (sessionStorage.getItem('token')) {
                refreshToken = JSON.parse(sessionStorage.getItem('token')).refresh_token;
                currentToken = JSON.parse(sessionStorage.getItem('token')).access_token;
                //console.log(sessionStorage.getItem('token'),moment().format('h:mm:ss a')+"token")
            }
            let tokenTime = Number(sessionStorage.getItem('tokentime'));
            let refreshTokenTime = moment(tokenTime, 'X').subtract(300, 'seconds').unix();
            let currentTime = moment().unix();
            // if (sessionStorage.getItem("username")) {
            //     console.log(sessionStorage.getItem("username"));
            //     console.log(sessionStorage.getItem("password"));
    
            // }
            if (tokenTime > currentTime) {
                if (refreshTokenTime < currentTime) {

                    var dbaccesstoken = $.ajax({
                        url: `${this.globals.TOKENPOINT}` + "eappsservices/getTokenService/getToken", success: function (result) {
                        },
                        headers: {
                            'header1': this.globals.AUTHORIZATION,
                            'userName': sessionStorage.getItem("username"),
                            'password': sessionStorage.getItem("password")
                        },
                        method: 'POST',
                        async: false
                    });
                    sessionStorage.setItem("dbaccesstoken", JSON.stringify(dbaccesstoken.responseJSON))
                    Dbtoken = dbaccesstoken.responseJSON.access_token;
                    if (currentToken != Dbtoken) {
                        currentToken = Dbtoken;
                        let expiringTime = moment().add(Number(dbaccesstoken.responseJSON.expires_in), 'seconds').unix().toString();
                        sessionStorage.setItem('token', JSON.stringify(dbaccesstoken.responseJSON));
                        sessionStorage.setItem("tokentime", expiringTime);
                        //console.log(sessionStorage.getItem('token'),moment().format('h:mm:ss a')+"newtoken")
                    }
                    else {
                        var refreshedToken = $.ajax({
                            url: `${this.globals.TOKENPOINT}eappsservices/RefreshTokenService/refreshToken`, success: function (result) {
                            },
                            headers: {
                                'header1': this.globals.AUTHORIZATION,
                                'refreshToken': refreshToken
                            },
                            method: 'POST',
                            async: false
                        });

                        let expiringTime = moment().add(Number(refreshedToken.responseJSON.expires_in), 'seconds').unix().toString();
                        sessionStorage.setItem('token', JSON.stringify(refreshedToken.responseJSON));
                        sessionStorage.setItem("tokentime", expiringTime);
                        //console.log(sessionStorage.getItem('token'),moment().format('h:mm:ss a')+"refreshtoken")
                    }


                }
            } else {
                sessionStorage.clear();
                // console.log("http.interceptor")
                this.router.navigate(['/login']);

            }

            let token = '';
            if (sessionStorage.getItem('token')) {
                token = JSON.parse(sessionStorage.getItem('token')).access_token;
            }
            if (token != null) {
                options.headers.append('Authorization', `Bearer ${token}`);
            }
        }

        options.headers.append('Cache-Control', 'no-cache');
        options.headers.append('Pragma', 'no-cache');
        options.headers.append('Expires', '-1');
        options.headers.append('If-Modified-Since', '0');

        return options;
    }
}


