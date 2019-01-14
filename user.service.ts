import { Injectable } from '@angular/core';
import {IUser} from './user.model'
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

@Injectable()
export class UserService {
  public currentUser:IUser

  constructor(private http: Http) {}

  /*getAll() {
    return this.http.get('/users').map((response: Response) => response.json());
  }*/
}