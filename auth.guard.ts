import { Injectable } from '@angular/core';
import { Globals } from '../globals';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
 
@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(private router: Router, private globals: Globals) { }
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        //alert("user===================="+sessionStorage.getItem('currentUser'));
        //if (sessionStorage.getItem('currentUser')) {
        if(JSON.parse(sessionStorage.getItem("currentUser"))){
            // logged in so return true
            if(JSON.parse(sessionStorage.getItem('currentUserDTO')).userName == 'dbsuser_tl'){
                if(state.url.includes('homehealth')){
                    return true;
                }else {
                    this.router.navigateByUrl('/homehealth');
                    return false;
                }
            }
           
            else {
                return true;
            }
        }
 
        // not logged in so redirect to login page with the return url
        this.router.navigateByUrl('/login');
        return false;
    }
}