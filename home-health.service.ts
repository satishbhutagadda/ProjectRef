import { Injectable } from '@angular/core';
import { IUser } from '../users/user.model'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Globals } from '../globals';
import { DatePipe } from '@angular/common';
import { ApiEndPoints } from 'app/api-end-points';

@Injectable()
export class HomeHealthService {
    constructor(private http: Http, private router: Router, private globals: Globals, private datePipe: DatePipe,private _apiEndPoints: ApiEndPoints) { }



    saveQuote(body) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let url = this._apiEndPoints.filteredEndPoints['getHealthCombiCoveragesandQuote'];
      
        return this.http.post(url, 
            {coverageRequest:body,
            userName: this.globals.USERDTO.userName
            }, options).map(response => {
            return response.json();
        });
    }


    loadPolicy(id, userName) {

        let url =  this._apiEndPoints.filteredEndPoints['loadPolicy'];
        return this.http.post(url,{
            policyId:id,
            userName:userName
        })
            .map(response => {
                return response.json();
            });

    }

    validateOTP(policyDetails,userName,otpNumber,id) {

        
        let url = this._apiEndPoints.filteredEndPoints['getHealthCombiOTPValidate'];;
        return this.http.post(url,{
            policyDetails:policyDetails,
            userName:userName,
            validOTP:otpNumber,
            policyId:id
        })
            .map(response => {
                return response.json();
            });
    }

    validateOTPfromUserSide(policyDetails,userName,otpNumber,id){
       let url = this._apiEndPoints.filteredEndPoints['otpValidateforDBSUser'];
        return this.http.post(url,{
            policyDetails:policyDetails,
            userName:userName,
            validOTP:otpNumber,
            policyId:id
        })
        .map(response => {
            return response.json();
        })
    }

    getOtpforHealthCombi(policyId,userName,mobile,email){
        
        let url = this._apiEndPoints.filteredEndPoints['getOtpforHealthCombi'];
        return this.http.post(url,{
            policyId:policyId,
            userName:userName,
            mobile:mobile,
            email:email
        })
            .map(response => {
                return response.json();
            });
    }
    getRegeneratedOtpforHealthCombi(policyId,userName,mobile,email){
        let url = this._apiEndPoints.filteredEndPoints['regenerateOtpforHealthCombi'];
      
        return this.http.post(url,{
            policyId:policyId,
            userName:userName,
            mobile:mobile,
            email:email
        })
            .map(response => {
                return response.json();
            });
    }
    dedupeCheck(firstname, middlename, lastname, dob, loanapplicationnumber){

        let url = this._apiEndPoints.filteredEndPoints['dedupeCheck'];
   
        return this.http.post(url,{
            firstname: firstname,
            lastname: lastname,
            dob: dob,
            loanApplicationNumber: 'APPL'+loanapplicationnumber
        })
            .map(response => {
                return response.json();
            });
    }

    getcustomerApprove(policyId,status){
        
        let url = this._apiEndPoints.filteredEndPoints['customerApprove'];
        return this.http.post(url,{
            policyId:policyId,
            status:status
        })
            .map(response => {
                return response.json();
            });
    }

    getSentToFinance(policyDetails,userName){
        
        let url = this._apiEndPoints.filteredEndPoints['sendToFinance'];
        return this.http.post(url,{
            policyDetails:policyDetails,
            userName:userName
        })
            .map(response => {
                return response.json();
            });
    }
    updateLoanAccountNumber(policyId,loanaccountnumber){
        
        let url = this._apiEndPoints.filteredEndPoints['updateLoanAccountNumber'];
        return this.http.post(url,{
            policyId:policyId,
            loanAccountNumber:loanaccountnumber
        })
            .map(response => {
                return response.json();
            });
    }

    loadOTPAcceptRejectCases(status) {
        
        let url = this._apiEndPoints.filteredEndPoints['getOTPAcceptAndPendingCases'];
        return this.http.post(url,{
            status:status
        })
            .map(response => {
                return response.json();
            });
    }

}