import { Injectable } from '@angular/core';
import { IUser } from './user.model'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Globals } from '../globals';
import { ApiEndPoints } from 'app/api-end-points';
import * as moment from 'moment';
@Injectable()
export class LoginService {

  public currentUser: IUser;

  constructor(private http: Http, private router: Router, private globals: Globals, private _apiEndPoints: ApiEndPoints) { }

  loginUser(userName: string, password: string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append("userName", userName);
    headers.append("password", password);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this._apiEndPoints.filteredEndPoints['loginUserDetails'], "", options)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let user = JSON.parse(JSON.stringify(response))._body;
        return user;
      }).catch(error => {
        return Observable.of(false);
      });
  }

  oauthToken(userName: string, password: string) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    headers.append("header1", this.globals.AUTHORIZATION);
    headers.append('userName', userName);
    headers.append('password',password);
    let options = new RequestOptions({ headers: headers });
  
    var URL = `${this.globals.TOKENPOINT}` + "eappsservices/getTokenService/getToken";
    return this.http.post(URL, "", options)
      .map((response: Response) => {
        //login successful if there's a jwt token in the response
        let token = JSON.parse(JSON.stringify(response))._body;
        return token;
      }).catch(error => {
        return Observable.throw(this.errorHandler(error.json()));
      });
  }

  errorHandler(error){
    //console.log(error.error);
    return error.error;
  }

}
