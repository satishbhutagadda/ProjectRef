import { Injectable, Inject } from "@angular/core";
import * as moment from 'moment';
import { Globals } from "app/globals";
import { Router } from "@angular/router";
@Injectable()
export class RefreshTokenService {
    constructor(private globals: Globals, private router: Router) {
        Inject(Globals);
        Inject(Router);
    }
    refreshTokenLogic() {
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
                    //console.log(sessionStorage.getItem('token'),moment().format('h:mm:ss a')+"dbtoken")
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
                    // console.log(sessionStorage.getItem('token'),moment().format('h:mm:ss a')+"refreshtoken")
                }
            }
        } else {
            this.globals.loginInvalid = false;
            sessionStorage.clear();
            this.router.navigate(['/login']);

        }
    }
}