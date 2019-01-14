import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Globals } from '../../globals';
import { DatePipe } from '@angular/common';
import { PolicyService } from './policy.services';
import { ApiEndPoints } from 'app/api-end-points';


@Injectable()
export class CommonDataService {

  private date: any = [];
  private currentdate: any = [];
  constructor(private http: Http, private router: Router, private globals: Globals, private _apiEndPoints: ApiEndPoints,
    private datePipe: DatePipe, private policyService: PolicyService) { }

  //private CONTEXT_PATH = "eappspolicyservices/";
  //private CONTEXT_PATH = "services/Endorsements/MotorEndorsements.HTTPEndpoint";
  private CONTEXT_PATH_WILDFLY = "eappspolicyservices/";

  getPolicyService() {
    return this.policyService;
  }

  checkDSARefNumber(dsaRefNumber, subline) {
    //debugger 
    let myHeaders = new Headers();
    //myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: myHeaders });

    let url = this._apiEndPoints.filteredEndPoints['checkDSARefNumber'];
    return this.http.post(url, {
      dsaRefNumber: dsaRefNumber,
      subline: subline
    }, options).map(response => {
      return response.json();
    })
      .catch(function (e) {
        throw e;
      });
  }
  loadBanks() {
    //debugger
    let myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: myHeaders });

    let url = this._apiEndPoints.filteredEndPoints['getBanks'];
    return this.http.post(url, {
      mastername: 'BankMaster',
      rownum: 10000,
      rnum: 0
    }, options).map(response => {
      return response.json().BANKS;
    })
      .catch(function (e) {
        throw e;
      });
  }

  loadCities() {
    let myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: myHeaders });
    let url = this._apiEndPoints.filteredEndPoints['getCitiesAndStates'];
    return this.http.post(url, {}, options)
      .map(response => {
        return response.json().CITIESANDSTATES;
      });
  }

  loadOccupations() {
    let myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: myHeaders });
    let url = this._apiEndPoints.filteredEndPoints['getOccupation'];
    return this.http.post(url, {}, options).map(response => {
      return response.json().OCCUPATIONS;
    })
      .catch(function (e) {
        throw e;
      });

  }

  loadStates(cityCode) {
    let myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: myHeaders });

    let url = this._apiEndPoints.filteredEndPoints['getStateByCityCode']
    return this.http.post(url, {
      code: cityCode
    }, options).map(response => {
      return response.json().States;
    })
      .catch(function (e) {
        throw e;
      });
  }

  loadvehicleModels(make, subline, branchCode, productName) {
    this.date = new Date();
    this.currentdate = this.datePipe.transform(this.date, 'dd/MM/yyyy')
    let myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: myHeaders });

    let url = this._apiEndPoints.filteredEndPoints['getModelsForMake'];
    return this.http.post(url, {
      SUBLINE: subline,
      MAKE: make,
      BLACKLISTEDBRANCHCODE: branchCode,
      PRODUCTNAME: productName,
      EFFECTIVEDATE: this.currentdate,
      EFFECTIVEENDDATE: this.currentdate
    }, options).map(response => {
      return response.json().MODELS;
    })
      .catch(function (e) {
        throw e;
      });
  }

  loadvehicleModelsYom(make, subline, branchCode, productName, incepdate, yom) {
    //this.date = new Date();
    this.currentdate = incepdate.split(" ")[0];
    let myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: myHeaders });
    //alert(this.currentdate);

    let url = this._apiEndPoints.filteredEndPoints['getModelsForMake'];
    return this.http.post(url, {
      subline: subline,
      make: make,
      blackListedBranchCode: branchCode,
      productName: productName,
      effectiveDate: this.currentdate,
      effectiveEndDate: this.currentdate,
      yom: yom
    }, options).map(response => {
      return response.json();
    })
      .catch(function (e) {
        throw e;
      });
  }

  loadvehicleBodyType(make) {
    let myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: myHeaders });

    let url = this._apiEndPoints.filteredEndPoints['getBodyType']
    return this.http.post(url, { make: make }, options).map(response => {
      return response.json().BODYTYPES;
    })
      .catch(function (e) {
        throw e;
      });
  }

  loadRtos() {
    //debugger
    let myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: myHeaders });

    let url = this._apiEndPoints.filteredEndPoints['getRTO']
    return this.http.post(url, {
      mastername1: 'RTOMaster',
      mastername2: 'State',
      name: 'Bihar'
    }, options).map(response => {
      return response.json().RTOS;
    })
      .catch(function (e) {
        throw e;
      });
  }

  loadFinancierWith() {
    //debugger
    let myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: myHeaders });

    let url = this._apiEndPoints.filteredEndPoints['getHypothecation'];
    return this.http.post(url, {}, options)
      .map(response => {
        return response.json().HYPOTHICATIONDETAILS;
      })
      .catch(function (e) {
        throw e;
      });
  }

  loadAgents() {
    if ('normal' == this.globals.USERDTO.userType) {
      return this.getPolicyService().loadInternalAgents(this.globals.USERDTO.partyCode).map(result => {
        return result;
      });
    } else {
      this.getPolicyService().loadExternalAgents(this.globals.USERDTO.userType).map(result => {
        return result;
      });
    }
  }

  getMessageDetails(msgId) {
    //debugger 
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: myHeaders });

    let url = this._apiEndPoints.filteredEndPoints['getMessageDetails'];
    return this.http.post(url, {
      msgId: msgId
    }, options).map(response => {
      return response.json().messageServiceDetails;
    })
      .catch(function (e) {
        throw e;
      });
  }

  approveEndorsement(id, msgDetails, combiApproveOrReject) {
    let body = {
      "userDetails": {
        "userName": this.globals.USERDTO.userName
      },
      "msgText": msgDetails,
      "msgIds": [id],
      "combiApproveOrReject": combiApproveOrReject
    };

    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: myHeaders });

    let url = this._apiEndPoints.filteredEndPoints['approveMessageDetails'];

    return this.http.post(url, body, options).map(response => {
      return response.json();
    });
  }
  approvePolicy(id) {
    let body = {


      "policyId": id,
      "userName": this.globals.USERDTO.userName

    };

    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: myHeaders });

    let url = this._apiEndPoints.filteredEndPoints['approveZone2Referral'];
    //let url = 'http://rsaiclvam048:8090/eappspolicyservices/approveZone2Referral?userName=' + '&userName=' + this.globals.USERDTO.userName;
    return this.http.post(url, body, options).map(response => {
      return response.json();
    });
  }
  rejectEndorsement(id, msgDetails, combiApproveOrReject) {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    /*let myparams = new URLSearchParams();
    myparams.append('msgId', id);
    myparams.append('msgtext', msgDetails);
    myparams.append('userName', this.globals.USERDTO.userName);*/
    //let options = new RequestOptions({ headers: myHeaders, search: myparams });
    let options = new RequestOptions({ headers: myHeaders });

    let body = {
      "userDetails": {
        "userName": this.globals.USERDTO.userName
      },
      "msgText": msgDetails,
      "msgIds": [id],
      "combiApproveOrReject": combiApproveOrReject
    };

    let url = this._apiEndPoints.filteredEndPoints['rejectMessageDetails'];
    //let url = this.globals.URLPREFIX + this.CONTEXT_PATH_WILDFLY + 'rejectMessageDetails?msgId=' + id + '&msgtext=' + msgDetails + '&userName=' + this.globals.USERDTO.userName;
    return this.http.post(url, body, options)
      .toPromise()
      .then(response => response.json())
      .catch(function (e) {
        throw e;
      });

  }

  getSubline(objectId) {
    let myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: myHeaders });

    let url = this._apiEndPoints.filteredEndPoints['getSublineForInsPolicy']
    return this.http.post(url, {
      policyId: objectId
    }, options).map(response => {
      return response.json().SUBLINESFORINSPOLICY;
    })
      .catch(function (e) {
        throw e;
      });
  }
}