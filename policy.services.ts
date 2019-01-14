import { Injectable, Inject } from '@angular/core';
import { IUser } from '../../users/user.model'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Globals } from '../../globals';
import { DatePipe } from '@angular/common';
import { AgentDetails } from '../../@core/model/agent.details.model';
import { ApiEndPoints } from 'app/api-end-points';

@Injectable()
export class PolicyService {
    private domicileDate: string[] = [];
    constructor(private http: Http, private router: Router, private globals: Globals, private datePipe: DatePipe, private _apiEndPoints: ApiEndPoints) {
        Inject(ApiEndPoints)
    }
    // private CONTEXT_PATH = "eappspolicyservices/";
    //private CONTEXT_PATH = "services/Endorsements/MotorEndorsements.HTTPEndpoint";
    private CONTEXT_PATH_WILDFLY = "eappspolicyservices/";

    private setHeader(userName: string, password: string, params: Map<string, string>) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append("userName", userName);
        headers.append("password", password);
        let myparams = new URLSearchParams();
        let options = null;
        if (null != params && params.size > 0) {
            //Array.from(map.entries())
            for (let key of Array.from(params.keys())) {
                myparams.append('policyId', params.get(key));
            }
            options = new RequestOptions({ headers: headers, search: myparams });
        } else {
            options = new RequestOptions({ headers: headers });
        }
        return options;
    }


    loadCities() {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });
        let url = this._apiEndPoints.filteredEndPoints['getCitiesAndStates'];
        return this.http.post(url, {}, options).map(response => {
            return response.json().CITIESANDSTATES;
        });
    }

    loadStates(cityCode) {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });

        let url = this._apiEndPoints.filteredEndPoints['getStateByCityCode'];
        return this.http.post(url, {
            code: cityCode
        }, options).map(response => {
            return response.json().States;
        });
    }

    loadGSTStateCode(state) {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });
        let url = this._apiEndPoints.filteredEndPoints['getGSTStateCode'];
        return this.http.post(url, {
            state: state
        }, options).map(response => {
            return response.json().GSTSTATECODES;
        });
    }

    loadBranchesForSelf() {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });
        let url = this._apiEndPoints.filteredEndPoints['getBranchMasterDetails'];
        return this.http.post(url, {}, options).map(response => {
            return response.json().BRANCHMASTERDETAILS;
        });
    }

    loadInternalAgents(code) { //notusing
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });
        var datePipe = new DatePipe("en-US");
        var currentDate = datePipe.transform(new Date(), 'dd/MM/yyyy');
        let url = this._apiEndPoints.filteredEndPoints['getInternalAgentDetails'];
        return this.http.post(url, {
            currentDate: currentDate
        }, options).map(response => {
            return response.json();
        });
    }

    loadInternalAgentsWithInput(code, searchParam) { //notusing n notconsuimg
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });
        var datePipe = new DatePipe("en-US");
        var currentDate = datePipe.transform(new Date(), 'dd/MM/yyyy');
        let url = this._apiEndPoints.filteredEndPoints['getInternalAgentDetails'];
        return this.http.post(url, {
            currentDate: currentDate
        }, options).map(response => {
            return response.json();
        });
    }
    loadExternalAgents(code) { // not using
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });
        var datePipe = new DatePipe("en-US");
        var currentDate = datePipe.transform(new Date(), 'dd/MM/yyyy');
        let url = this.globals.URLPREFIX + this.globals.CONTEXT_PATH + '/getExternalAgents?agentCode=' + code;
        return this.http.get(url, options).map(response => {
            return response.json().AGENTS;
        });
    }

    loadAgentDetails(agentCode, selfOrBehalf, inceptionDate) {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });
        let url = this._apiEndPoints.filteredEndPoints['getAgentDetails'];
        return this.http.post(url, {
            inceptionDate: inceptionDate,
            selfOrBehalf: selfOrBehalf,
            selectedAgentCode: agentCode,
            lob: 'motor',
            userName: this.globals.USERDTO.userName,
        }, options).map(response => {
            return response.json();
        });
    }

    loadPartyCodeDetails(partyCode) {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });
        let url = this._apiEndPoints.filteredEndPoints['getPartieDetails'];
        return this.http.post(url, {
            roleId: partyCode
        }, options).map(response => {
            return response.json();
        });
    }

    loadInsuredPartyCodeDetails(partyCode) {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });
        let url = this._apiEndPoints.filteredEndPoints['fetchPartyDetails']
        return this.http.post(url, { partyCode: partyCode }, options).map(response => {
            return response.json();
        });
    }

    loadBdos(inceptionDate) {
        var inceptionDt = inceptionDate.split(" ")[0];
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });

        let url = this._apiEndPoints.filteredEndPoints['getBDO']
        return this.http.post(url, {
            inceptionDate: inceptionDt
        }, options).map(response => {
            return response.json().BDOS;
        });
    }
    loadAgentBdos(agentCode, inceptionDate) {
        var inceptionDt = inceptionDate.split(" ")[0];
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });

        let url = this._apiEndPoints.filteredEndPoints['getAgentBDO'];
        return this.http.post(url, {
            agentCode: agentCode,
            currentDate: inceptionDt
        }, options).map(response => {
            return response.json().BDOS;
        });
    }
    loadOccupations() {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });
        let url = this._apiEndPoints.filteredEndPoints['getOccupation'];
        return this.http.post(url, {}, options).map(response => {
            return response.json().OCCUPATIONS;
        });
    }

    loadPOS() {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });
        var datePipe = new DatePipe("en-US");
        var currentDate = datePipe.transform(new Date(), 'dd/MM/yyyy');
        let url = this._apiEndPoints.filteredEndPoints['getPOS'];
        return this.http.post(url, {
            currentDate: currentDate
        }, options).map(response => {
            return response.json().POSLIST;
        });
    }

    loadPOSDetails(posCode) {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });
        let url = this._apiEndPoints.filteredEndPoints['getPosAgentDetails'];
        return this.http.post(url, {
            posCode: posCode
        }, options).map(response => {
            return response.json();
        });
    }

    loadCoverNoteList(agentCode, productName, branchCode, isManualCoverNote) {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });

        let url = this._apiEndPoints.filteredEndPoints['getCoverNotes'];
        return this.http.post(url, {
            agentCode: agentCode,
            productName: productName,
            branchCode: branchCode,
            isManualCoverNote: isManualCoverNote
        }, options).map(response => {
            return response.json();
        });
    }

    loadCoverNoteDetails(coverNoteNumber, isManualCoverNote) {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });

        let url = this._apiEndPoints.filteredEndPoints['getCoverNoteDetails'];
        return this.http.post(url, {
            coverNoteNumber: coverNoteNumber,
            isManualCoverNote: isManualCoverNote
        }, options).map(response => {
            return response.json();
        });
    }

    loadInsuranceRepositories() {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });

        let url = this._apiEndPoints.filteredEndPoints['getInsuranceRepositories'];
        return this.http.post(url, {}, options).map(response => {
            return response.json().INSREPOSITORIES;
        });
    }

    loadRTOS(stateName) {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });

        let url = this._apiEndPoints.filteredEndPoints['getRTO'];
        return this.http.post(url, {
            mastername1: 'RTOMaster',
            mastername2: 'State',
            name: stateName
        }, options).map(response => {
            return response.json();
        });
    }

    loadVechiles(modelCode) {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });

        let url = this._apiEndPoints.filteredEndPoints['getVechileDetails'];
        return this.http.get(url, options).map(response => {
            return response.json().COVERNOTEDETAILS;
        });
    }

    loadRegionInfo(regCity, productName) {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });

        let url = this._apiEndPoints.filteredEndPoints['getRegRegionZone'];
        return this.http.post(url, {
            regCity: regCity,
            productName: productName
        }, options).map(response => {
            return response.json();
        });
    }

    loadMake(subline, agentCode, productName, inceptionDate) {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });

        let url = this._apiEndPoints.filteredEndPoints['getAvailableMakes'];
        return this.http.post(url, {
            subline: subline,
            agentCode: agentCode,
            productName: productName,
            inceptionDate: inceptionDate,
            userName: this.globals.USER.username
        }, options).map(response => {
            return response.json();
        });
    }

    loadModelDetails(modelCode, regDate, productName, region, inceptionDate, yom, registrationCity, transType, prevPolNo, polPeriod) {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });

        let url = this._apiEndPoints.filteredEndPoints['getModelData'];
        return this.http.post(url, {
            modelCode: modelCode,
            regDate: regDate,
            productName: productName,
            region: region,
            inceptionDate: inceptionDate,
            yom: yom,
            registrationCity: registrationCity,
            transactionType: transType,
            previousPolicyNo: prevPolNo,
            policyPeriod: Number(polPeriod)
        }, options).map(response => {
            return response.json();
        });
    }

    loadModel(subline, make, branchCode, productName, effectiveDate, yom) {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });
        //var date = this.datePipe.transform( effectiveDate, 'dd/MM/yyyy' );

        let url = this._apiEndPoints.filteredEndPoints['getModelsForMake'];
        return this.http.post(url, {
            subline: subline,
            make: make,
            blackListedBranchCode: branchCode,
            productName: productName,
            effectiveDate: effectiveDate,
            effectiveEndDate: effectiveDate,
            yom: yom
        }, options).map(response => {
            return response.json();
        });
    }

    loadTechnicalDiscount(body) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let url = this._apiEndPoints.filteredEndPoints['getTechnicalDiscountDetails'];
        return this.http.post(url, body, options).map(response => {
            return response.json();
        });
    }

    loadServiceProviders(branchCode) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let url = this._apiEndPoints.filteredEndPoints['getServiceProviders'];
        return this.http.post(url, {
            branchCode: branchCode
        }, options).map(response => {
            return response.json();
        });
    }

    loadAutoAssociations(regState) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let url = this._apiEndPoints.filteredEndPoints['getAutoAssociations'];
        return this.http.post(url, { regState: regState }, options).map(response => {
            return response.json();
        });
    }

    loadAddonCoverageForExternalUser(productName, inceptionDate) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let url = this._apiEndPoints.filteredEndPoints['getAddonCoverageForExternalUser'];
        return this.http.post(url, {
            productName: productName,
            transactionType: 'NB',
            inceptionDate: inceptionDate,
            userName: this.globals.USER.username
        }, options).map(response => {
            return response.json();
        });
    }

    loadCampaignDiscounts(campaignName) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let url = this._apiEndPoints.filteredEndPoints['getCampaignDiscounts'];
        return this.http.post(url, { campaignName: campaignName, userName: this.globals.USER.username }, options).map(response => {
            return response.json();
        });
    }

    loadFraudReasons() {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let url = this._apiEndPoints.filteredEndPoints['getFraudReasons'];
        return this.http.post(url, {}, options).map(response => {
            return response.json().FRAUDREASONS;
        });
    }

    loadMasterData(productName, customerType) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let url = this._apiEndPoints.filteredEndPoints['getMasterData'];
        return this.http.post(url, {
            productName: productName,
            userName: this.globals.USER.username,
            customerType: customerType
        }, options).map(response => {
            return response.json();
        });
    }

    loadPreviousInsurers() {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });

        let url = this._apiEndPoints.filteredEndPoints['getPreviousInsurers'];
        return this.http.post(url, {}, options).map(response => {
            return response.json().PREVIOUSINSURERS;
        });
    }

    /*loadPreviousInsurerBranches(insurerCode){
        let headers = new Headers({ 'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers}); 
        let url = 'http://rsaiclvam11gsvr:9765/services/Endorsements/MotorEndorsements/getCompanyBranches?companyCode='+insurerCode;
        return this.http.get(url, options).map(response => {
          return response.json().COMPANYBRANCHES;
        });
    }*/

    loadPreviousInsurerBranches(insurerCode) {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });

        let url = this._apiEndPoints.filteredEndPoints['getCompanyBranches'];
        return this.http.post(url, {
            companyCode: insurerCode
        }, options).map(response => {
            return response.json().COMPANYBRANCHES;
        });
    }

    loadCompanyBranchAddress(branchCode, branchName) {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });

        let url = this._apiEndPoints.filteredEndPoints['getCompanyBranchAddress'];
        return this.http.post(url, {
            branchCode: branchCode,
            name: branchName
        }, options).map(response => {
            return response.json().COMPANYBRANCHADDRESSES;
        });
    }

    loadCommisions(subline, agentCode, branchCode, salesCompany) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let url = this._apiEndPoints.filteredEndPoints['getCommissionDetails'];
        return this.http.post(url, {
            transactionType: 'NB',
            userName: this.globals.USER.username,
            subline: subline,
            agentCode: agentCode,
            branchCode: branchCode,
            salesCompany: salesCompany
        }, options).map(response => {
            return response.json();
        });
    }

    loadMotorCoverages(body) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let url = this._apiEndPoints.filteredEndPoints['getMotorCoverages'];
        return this.http.post(url, body, options).map(response => {
            return response.json();
        });
    }

    loadHealthCoverages(body) {
        let headers = new Headers();
        headers.append('Cache-Control', 'no-cache, no-store, must-revalidate');
        headers.append('Pragma', 'no-cache');
        headers.append('Expires', '0');
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });

        let url = this._apiEndPoints.filteredEndPoints['getHealthCoverages'];
        return this.http.post(url, body, options).map(response => {
            return response.json();
        });
    }

    loadInsuredDetails(body) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let url = this._apiEndPoints.filteredEndPoints['getFloaterRelations'];
        return this.http.post(url, body, options).map(response => {
            return response.json();
        });
    }

    showErrorOnAGentChange(policyNumber, transactionType, agentCode) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let url = this._apiEndPoints.filteredEndPoints['getOARenewalStatus'];
        //let url = 'http://rsaiclvam059:8080/eappspolicyservices/getOARenewalStatus';
        return this.http.post(url, {
            policyNumber: policyNumber,
            transactionType: 'RN',
            agentCode: agentCode
        }, options).map(response => {
            return response.json();
        });
    }

    loadHomeCoverages(body) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let url = this._apiEndPoints.filteredEndPoints['getHomeCoverages'];
        return this.http.post(url, body, options).map(response => {
            return response.json();
        });
    }

    getPincodeMasterDetails(pincode) {
        let headers = new Headers({ 'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let url = this._apiEndPoints.filteredEndPoints['getPincodeMasterDetails'];
        return this.http.post(url, {
            pincode: pincode
        },
            options).map(response => {
                return response.json();
            });
    }

    getHomeOccupations() {
        let headers = new Headers({ 'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let url = this._apiEndPoints.filteredEndPoints['getOccupations'];
        return this.http.get(url, options).map(response => {
            return response.json().OCCUPATIONS;
        });
    }

    getMasterOccupations() {
        let headers = new Headers({ 'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let url = this._apiEndPoints.filteredEndPoints['getMasterOccupations'];
        return this.http.get(url, options).map(response => {
            return response.json().OCCUPATIONS;
        });
    }

    getCampaignNomineeRelations(campaignName) { // not get but consuming
        let headers = new Headers({ 'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let url = `${this.globals.URLPREFIXHOME}getCampaignNomineeRelations?campaignName=${campaignName}`;
        return this.http.get(url, options).map(response => {
            return response.json().CAMPAIGNNOMINEERELATIONS;
        });
    }

    loadQuote(body, userName) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let url = this._apiEndPoints.filteredEndPoints['saveMotorQuote'];
        return this.http.post(url, {
            userName: userName,
            quoteRequest: body
        }, options).map(response => {
            return response.json().policyDetail;
        });
    }

    loadAgentsAutoSuggest(paramString) { //not using
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let url = this._apiEndPoints.filteredEndPoints['getAgents'];
        return this.http.post(url, {
            agentCodeName: paramString
        }, options).map(response => {
            return response.json();
        });
    }
    loadAgentsForLookup(agentName, agentCode, transactionType) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let url = this._apiEndPoints.filteredEndPoints['getAgents'];
        return this.http.post(url, {
            agentName: agentName,
            agentCode: agentCode,
            userType: this.globals.USERDTO.userType,
            userPartyCode: this.globals.USERDTO.partyCode,
            transactionType: transactionType
        }, options).map(response => {
            return response.json();
        });
    }
    loadAgents(agentName, agentCode, transactionType) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let url = this._apiEndPoints.filteredEndPoints['getAgents'];
        return this.http.post(url, {
            agentName: agentName,
            agentCode: agentCode,
            userType: 'normal',
            userPartyCode: this.globals.USERDTO.partyCode,
            transactionType: transactionType
        }, options).map(response => {
            return response.json();
        });
    }

    loadPartyCodesForLookup(partyName, partyCode) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let url = this._apiEndPoints.filteredEndPoints['searchParties'];
        return this.http.post(url, {
            partyName: partyName,
            partyCode: partyCode
        }, options).map(response => {
            return response.json();
        });
    }

    loadExternalCovernotes(ecovernoteNumber, engineNumber, chassisNumber, registrationNumber, tokenNumber) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let url = this._apiEndPoints.filteredEndPoints['getExternalCoverNoteDetails'];
        return this.http.post(url, {
            eCoverNoteNo: ecovernoteNumber,
            engineNo: engineNumber,
            chassisNo: chassisNumber,
            regNo: registrationNumber,
            tokenNo: tokenNumber
        }, options).map(response => {
            return response.json();
        });
    }

    loadNomineeRelationship() {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });

        let url = this._apiEndPoints.filteredEndPoints['getNomineeRelationship'];
        return this.http.post(url, {}, options).map(response => {
            return response.json().RELATIONSHIPS;
        });
    }

    fetchSchemeCodeList(campaignName) {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });

        let url = this._apiEndPoints.filteredEndPoints['fetchSchemeCodeList'];
        return this.http.post(url, { campaingName: campaignName }, options).map(response => {
            return response.json();
        });
    }

    loadTrailerMakes() {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });

        let url = this._apiEndPoints.filteredEndPoints['getTrailerMakes'];
        return this.http.post(url, {}, options).map(response => {
            return response.json().MAKENAMES;
        });
    }

    loadTrailerModels(make, incepationDate, product) {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });

        let url = this._apiEndPoints.filteredEndPoints['getTrailerModels'];
        return this.http.post(url, {
            make: make,
            inceptionDate: incepationDate,
            productName: product
        }, options).map(response => {
            return response.json().TRAILERMODELS;
        });
    }
    loadCampaignDetails(productName, inceptionDate) {
        var inceptionDt = inceptionDate.split(" ")[0];
        //productName = productName.split("-")[0];
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });

        let url = this._apiEndPoints.filteredEndPoints['getCampaignDetails'];
        return this.http.post(url, {
            productName: productName,
            inceptionDate: inceptionDt
        }, options).map(response => {
            return response.json();
        });
    }

    getGroupCampaigns(campaignName, inceptionDate) {  //not in get but consuming
        var inceptionDt = inceptionDate.split(" ")[0];

        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });
        let url = this.globals.URLPREFIX + this.CONTEXT_PATH_WILDFLY + 'getGroupCampaigns?campaignName=' + campaignName + '&inceptionDate=' + inceptionDate;
        return this.http.get(url, options).map(response => {

            return response.json();
        });
    }

    getGroupNames(campaignName, isCombi, inceptionDate, expiryDate, combiCampaign) {
        var inceptionDt = inceptionDate.split(" ")[0];
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });

        let url = this._apiEndPoints.filteredEndPoints['checkGroupCampaign'];
        return this.http.post(url, { campaignName: campaignName, isCombi: isCombi, inceptionDate: inceptionDt, expiryDate: expiryDate, combiCampaign: combiCampaign }, options).map(response => {

            return response.json();
        });
    }

    loadHomeCombieDetails(campainName) { //not in get but consuming

        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });
        //let url = `http://rsaiclvam11gsvr:9765/services/HomePolicy.HTTPEndpoint/getCombiProduct?campaignName=${campainName}`;
        let url = `${this.globals.URLPREFIXHOME}getCombiProduct?campaignName=${campainName}`;
        return this.http.get(url, options).map(response => {
            return response.json();
        });
    }

    loadHealthProducts(isPartner, selfOrBehalf, agentName, subline, channel, agentPartyType) {
        if (agentName == undefined) {
            agentName = '';
        } if (agentPartyType == undefined) {
            agentPartyType = '';
        }
        let myHeaders = new Headers();
        //let serviceName = 'fetchProductForPolicyForNB';
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });
        let url = this._apiEndPoints.filteredEndPoints['fetchProductForPolicyForNB'];
        if (isPartner) {
            let url = this._apiEndPoints.filteredEndPoints['fetchProductForPartnerForNB'];
            //serviceName = 'fetchProductForPartnerForNB';
            //let url = this.globals.URLPREFIX + this.CONTEXT_PATH_WILDFLY + serviceName

        }
        return this.http.post(url, {
            isPartner: isPartner,
            policyTo: selfOrBehalf,
            agentName: agentName,
            subline: subline,
            channel: channel,
            mode: 'Internet',
            agentPartyType: agentPartyType

        }, options).map(response => {
            return response.json();
        });
    }
    loadLivesCovered(productName) {
        //productName = productName.split("-")[0];
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });

        let url = this._apiEndPoints.filteredEndPoints['getLivesCoveredCampaigns'];
        return this.http.post(url, {
            camapignName: productName
        }, options).map(response => {
            return response.json();
        });
    }
    loadPlans(productName, planLevel, subline, inceptionDate) {
        /*if (productName.indexOf('-') !== -1) {
            productName = productName.split("-")[0];
        }*/
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });

        let url = this._apiEndPoints.filteredEndPoints['getPlansForCampaign'];
        return this.http.post(url, {
            productName: productName,
            planLevel: planLevel,
            subline: subline,
            inceptionDate: inceptionDate
        }, options).map(response => {
            return response.json();
        });
    }
    loadIdentityProofs(inceptionDate) {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });

        let url = this._apiEndPoints.filteredEndPoints['getIdentityProofs'];
        return this.http.post(url, {
            partyType: 'IndividualCustomer',
            inceptionDate: inceptionDate
        }, options).map(response => {
            return response.json();
        });

    }
    loadResidenceProofs(inceptionDate) {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });

        let url = this._apiEndPoints.filteredEndPoints['getResidenceProofs'];
        return this.http.post(url, {
            partyType: 'IndividualCustomer',
            inceptionDate: inceptionDate
        }, options).map(response => {
            return response.json();
        });
    }
    loadRiders(productName, planLevel) {
        /*if (productName.indexOf('-') !== -1) {
            productName = productName.split("-")[0];
        }*/
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });

        let url = this._apiEndPoints.filteredEndPoints['getRiders'];
        return this.http.post(url, {
            productName: productName,
            planLevel: planLevel
        }, options).map(response => {
            return response.json();
        })
    }
    loadPreAilments() {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });

        let url = this._apiEndPoints.filteredEndPoints['getPreAilments'];
        return this.http.post(url, {}, options).map(response => {
            return response.json();
        })
    }
    loadICDDesc(icdcode) {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });

        let url = this._apiEndPoints.filteredEndPoints['getICDDesc'];
        return this.http.post(url, {
            icdCode: icdcode
        }, options).map(response => {
            return response.json().ICDDESCRIPTIONS;
        })
    }
    saveHealthQuote(body, userName) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let url = this._apiEndPoints.filteredEndPoints['saveHealthQuote'];
        //let url = 'http://rsaiclvam055:8090/eappspolicyservices/saveHealthQuote?userName=' + userName;
        return this.http.post(url, {
            userName: userName,
            quoteRequest: body
        }, options).map(response => {
            return response.json();
            //return response.json().policyDetail;
        });
    }

    saveFillCheckList(body) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let url = this._apiEndPoints.filteredEndPoints['updateCheckListFilled'];
        return this.http.post(url, body, options).map(response => {
            return response.json();
        });
    }

    loadHomeQuote(body, userName) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let url = this._apiEndPoints.filteredEndPoints['saveHomeQuote'];
        return this.http.post(url,
            {
                userName: userName,
                policyDetails: body.policyDetails
            }
            , options)
            .map(response => {
                return response.json();
                //return response.json().policyDetail;
            });
    }

    loadAdditionalInfo(agentName, CampaingName) {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });

        let url = this._apiEndPoints.filteredEndPoints['getAdditionalInfoPropForAgents']
        return this.http.post(url, {
            agentName: agentName,
            campaingName: CampaingName
        }, options).map(response => {
            return response.json();
        })
    }

    fetchAgents(DCB) {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });

        let url = this._apiEndPoints.filteredEndPoints['fetchEnquiryAgents']
        return this.http.post(url, {
            agentType: DCB,

        }, options).map(response => {
            return response.json();
        })
    }
    loadGender(relation) {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });

        let url = this._apiEndPoints.filteredEndPoints['getGender'];
        return this.http.post(url, {
            relationshipName: relation
        }, options).map(response => {
            return response.json().GENDERS;
        })
    }

    checkFillCheckList(policyId) {
        let myHeaders = new Headers();
        myHeaders.append('Cache-Control', 'no-cache, no-store, must-revalidate');
        myHeaders.append('Pragma', 'no-cache');
        myHeaders.append('Expires', '0');
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });

        let url = this._apiEndPoints.filteredEndPoints['checkIfCheckListFilled'];
        return this.http.post(url, { policyId: policyId }, options).map(response => {
            return response.json();
        });
    }

    loadFillCheckList(policyId) {
        let myHeaders = new Headers();
        myHeaders.append('Cache-Control', 'no-cache, no-store, must-revalidate');
        myHeaders.append('Pragma', 'no-cache');
        myHeaders.append('Expires', '0');
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });

        let url = this._apiEndPoints.filteredEndPoints['getChkList'];
        return this.http.post(url, { policyId: policyId }, options).map(response => {
            return response.json();
        });
    }

    getHealthPolicySearchDetails(formValues) {  //doubt with url
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let url = this._apiEndPoints.filteredEndPoints['searchHealthPolicy'];
        //let url = 'http://rsaiclvam048:8090/eappspolicyservices/searchHealthPolicy';
        return this.http.post(url, JSON.stringify(formValues.getRawValue()), options)
            .map((res: Response) => {
                if (res) {
                    return JSON.parse(JSON.stringify(res))._body;
                }
                else {
                    alert("No Data Found");
                }
            })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    loadMasterPlans(productName) {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });

        let url = this._apiEndPoints.filteredEndPoints['getMasterPlanList'];
        return this.http.post(url, {
            product: productName
        }, options).map(response => {
            return response.json().MASTERPLANLISTS;
        });
    }

    loadSubPlans(productName, plan) {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });

        let url = this._apiEndPoints.filteredEndPoints['getMasterSubPlanList'];
        return this.http.post(url, {
            product: productName,
            plan: plan
        }, options).map(response => {
            return response.json().MASTERSUBPLANLISTS;
        });
    }
    loadFOSPlans(productName, planLevel) {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });

        let url = this._apiEndPoints.filteredEndPoints['getFOSProductPlans'];
        return this.http.post(url, {
            product: productName,
            planLevel: planLevel
        }, options).map(response => {
            return response.json().FOSPRODUCTPLAN;
        });
    }
    getFieldsForExternalUser(body) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let url = this._apiEndPoints.filteredEndPoints['showCoverageOptionPartner'];
        return this.http.post(url, body, options).map(response => {
            return response.json();
        });
    }

    loadCampaignNames() {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });

        let url = this._apiEndPoints.filteredEndPoints['getCampaignNames'];
        return this.http.post(url, {}, options).map(response => {
            return response.json().CAMPAIGNNAMES;
        });
    }

    getProducts(subline) { // doubt with curly braces

        let url = this._apiEndPoints.filteredEndPoints['getProducts'];
        return this.http.post(url, { subline: subline })
            .map(response => {
                return response.json();
            });
    }

    loadProductsOnModeofDel(agentCode, mod, channel, subline, incDate, agentPartyType) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let url = this._apiEndPoints.filteredEndPoints['getAgentProducts'];
        return this.http.post(url, {
            agentCode: agentCode,
            mod: mod,
            channel: channel,
            subline: subline,
            inceptionDate: incDate,
            agentPartyType: agentPartyType
        }, options).map(response => {
            return response.json();

        });

    }

    displayCombiDetails(prodName, agentCode, transType) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let url = this._apiEndPoints.filteredEndPoints['isCombiProduct'];
        return this.http.post(url, {
            productName: prodName,
            agentCode: agentCode,
            transactionType: transType
        }, options).map(response => {
            return response.json();

        });
    }

    fetchCombiSumInsureds(transType, combiProduct, agentCode, productName) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let url = this._apiEndPoints.filteredEndPoints['fetchCombiSumInsureds'];
        return this.http.post(url, {
            transactionType: transType,
            combiProduct: combiProduct,
            agentCode: agentCode,
            productName: productName
        }, options).map(response => {
            return response.json();

        });
    }

    loadInsuranceCompanyNames() {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });

        let url = this._apiEndPoints.filteredEndPoints['getInsuranceCompanyNames'];
        return this.http.post(url, {}, options).map(response => {
            return response.json().INSURANCECOMPANYNAMES;
        });
    }

    getICDCodeFromMasterDisease(pedcode) {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });

        let url = this._apiEndPoints.filteredEndPoints['getICDCodeFromMasterDisease'];
        return this.http.post(url, {
            diseaseCode: pedcode
        }, options).map(response => {
            return response.json().ICDCODES;
        })
    }

    loadPEPNames() { //same and doubt
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });

        let url = this._apiEndPoints.filteredEndPoints['getPEPName'];
        return this.http.post(url, {}, options).map(response => {
            return response.json().PEPNAMES;
        });
    }

    loadCustomerSegments() { //same and doubt
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });

        let url = this._apiEndPoints.filteredEndPoints['getPEPName']
        return this.http.post(url, {}, options).map(response => {
            return response.json().PEPNAMES;
        });
    }

    loadCommonItems(input) {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });

        let url = this._apiEndPoints.filteredEndPoints['getNameFromCommonItem'];
        return this.http.post(url, {
            masterName: input
        }, options).map(response => {
            return response.json().NAMES;
        });
    }

    loadRenewalPartyCodes(policyCode) { //doubt get service
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });

        let url = this.globals.URLPREFIX + this.globals.CONTEXT_PATH + '/getRenewalPartyCodes?POLICYCODE=' + policyCode;
        return this.http.get(url, options).map(response => {
            return response.json().RENEWALPARTYCODES;
        });
    }

    loadPreviousInsurerDetails(policyCode) {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });

        let url = this._apiEndPoints.filteredEndPoints['getPreviousPolicyDetails'];
        return this.http.post(url, {
            policyCode: policyCode,
            userName: this.globals.USERDTO.userName
        }, options).map(response => {
            return response.json().policyDetail;
        });
    }

    loadMobileNumvalid(mobile) {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });

        let url = this._apiEndPoints.filteredEndPoints['mobileNumberValidation']
        return this.http.post(url, {
            mobile: mobile
        }, options).map(response => {
            return response.json();
        })
            .catch(function (e) {
                throw e;
            });
    }

    loadBreakInLoading(agentCode, branchCode, productName, incepdate, expirydate, prenInsurerName, isSecoundHandVehicle, username) {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });

        let url = this._apiEndPoints.filteredEndPoints['getBreakInLoading'];
        return this.http.post(url, {
            agentCode: agentCode,
            branchCode: branchCode,
            productName: productName,
            inceptiondate: incepdate,
            expirydate: expirydate,
            prenInsurerName: prenInsurerName,
            isSecoundVehicle: isSecoundHandVehicle,
            username: username
        }, options).map(response => {
            return response.json();
        })
            .catch(function (e) {
                throw e;
            });
    }


    loadReasons() {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });

        let url = this._apiEndPoints.filteredEndPoints['getReasons'];
        return this.http.post(url, {
            referenceName: 'POLICY'
        },
            options).map(response => {
                return response.json().REASONS;
            });
    }

    checkIsCombi(productName) {
        let myHeaders = new Headers();
        myHeaders.append('Cache-Control', 'no-cache, no-store, must-revalidate');
        myHeaders.append('Pragma', 'no-cache');
        myHeaders.append('Expires', '0');
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });

        let url = this._apiEndPoints.filteredEndPoints['checkCombiCampaign'];
        return this.http.post(url, { campaignName: productName }, options).map(response => {
            return JSON.parse(JSON.stringify(response))._body;
        });
    }

    cancelQuote(policyId) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let url = this._apiEndPoints.filteredEndPoints['cancelQuote']
        return this.http.post(url, { policyId: policyId, userName: this.globals.USER.username }, options).map(response => {
            return response.json();
        });
    }

    loadQuestions(productName) {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });

        let url = this._apiEndPoints.filteredEndPoints['fetchQuestions'];
        //let url = 'http://rsaiclvam048:8090/eappspolicyservices/fetchQuestions?productName=' + productName;
        return this.http.post(url, { campaingName: productName }, options).map(response => {
            return response.json();
        });
    }

    loadPOSAgentDetails(posCode) {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });
        let url = this._apiEndPoints.filteredEndPoints['getPosAgentDetails'];
        return this.http.post(url, { posCode: posCode }, options).map(response => {
            return response.json();
        });
    }

    loadVIRGlobalSearchInfo(EngineNumber, RegistrationNumber, ChassisNumber, WebReferenceNumber, serviceProviderName) {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });
        let url = this._apiEndPoints.filteredEndPoints['getVIRGlobalSearchInfo'];
        let body = {
            "Engine_Number": EngineNumber,
            "Registration_Number": RegistrationNumber,
            "Chassis_Number": ChassisNumber,
            "WebReferenceNumber": WebReferenceNumber,
            "loginUsername": this.globals.USERDTO.userName,
            "serviceProvider": serviceProviderName
        };
        return this.http.post(url, body, options).map(response => {
            return response.json();
        });
    }

    getProposalNotesForInternal(agentCode, branchCode) {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });
        let url = this._apiEndPoints.filteredEndPoints['getProposalNotesForInternal'];
        let body = {
            "agentcode": agentCode,
            "branchCode": branchCode
        };
        return this.http.post(url, body, options).map(response => {
            return response.json();
        });
    }

    getProposalNotesForAgent(agentCode) {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });
        let url = this._apiEndPoints.filteredEndPoints['getProposalNotesForAgent'];
        let body = {
            "agentcode": agentCode
        };
        return this.http.post(url, body, options).map(response => {
            return response.json();
        });
    }

    loadCustomersForLookup(CustomerName, CustomerCode, PassportNumber) {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });

        let url = this._apiEndPoints.filteredEndPoints['searchCustomerFromMaster'];


        return this.http.post(url, {
            customerId: CustomerCode,
            firstName: CustomerName,
            passportNumber: PassportNumber
        }, options).map(response => {
            return response.json();
        }).catch(function (e) {
            throw e;
        });
    }
    getFinGSTIN(hypothecatedToLeaseHirePurchaseWith, financierState) {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });
        let url = this._apiEndPoints.filteredEndPoints['getFinancierGSTIN']
        return this.http.post(url, {
            financierWith: hypothecatedToLeaseHirePurchaseWith,
            financierState: financierState
        }, options).map(response => {
            return response.json();
        })
            .catch(function (e) {
                throw e;
            });
    }

    PostEndorsementHealthDetails(nonFinanDetailsModel) {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });
        let url = this._apiEndPoints.filteredEndPoints['postEndorsementHealthDetails'];
        let body = nonFinanDetailsModel;
        return this.http.post(url, body, options).map(response => {
            return response.json();
        });
    }

    saveReasons(id, quoteNum, reasonCode, reasonText) {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });
        let url = this._apiEndPoints.filteredEndPoints['updateReason'];
        return this.http.post(url, {
            policyId: id,
            quoteNumber: quoteNum,
            reasonCode: reasonCode,
            reasonText: reasonText
        }, options).map(response => {
            return response.status;
        });
    }

    loadSublineBranches(subline, agentcode) {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });
        let url = this._apiEndPoints.filteredEndPoints['getSublineBranches'];
        return this.http.post(url, {
            selectedSubline: subline,
            agentCode: agentcode,
        }, options).map(response => {
            return response.json();
        });
    }


    LoadValidateLivesCovered(productName, TransactionType, livesCovered, deleteInsuredIndex) {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });
        let url = this._apiEndPoints.filteredEndPoints['validateLivesCovered'];
        return this.http.post(url, {
            productName: productName,
            TransactionType: TransactionType,
            livesCovered: livesCovered,
            deleteInsuredIndex: deleteInsuredIndex
        }, options).map(response => {
            return response.json();
        });

    }

    GetCampaignsForTravelProduct(SCPSubAgentCode, TPMProductType, ACPAgentCode, ACPEffectiveStartAndEndDate) {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        myHeaders.append("Access-Control-Allow-Origin", "true");

        let options = new RequestOptions({ headers: myHeaders });
        let url = `${this.globals.URLPREFIXDIT}GetCampaignsForTravelProduct?SCPSubAgentCode=${SCPSubAgentCode}&TPMProductType=${TPMProductType}&ACPAgentCode=${ACPAgentCode}&ACPEffectiveStartAndEndDate=${ACPEffectiveStartAndEndDate}`;
        return this.http.get(url, options)
            .map(response => {
                return response.json();
            });
    }

    getPlansForTravelCampaigns(SCPSubAgentCode, TPMProductType, ACPAgentCode, ACPCampaignId, ACPEffectiveStartAndEndDate) {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        myHeaders.append("Access-Control-Allow-Origin", "true");
        let options = new RequestOptions({ headers: myHeaders });
        let url = `${this.globals.URLPREFIXDIT}getPlansForTravelCampaigns?SCPSubAgentCode=${SCPSubAgentCode}&TPMProductType=${TPMProductType}&ACPAgentCode=${ACPAgentCode}&ACPCampaignId=${ACPCampaignId}&ACPEffectiveStartAndEndDate=${ACPEffectiveStartAndEndDate}`;
        return this.http.get(url, options)
            .map(response => {
                return response.json();
            });
    }

    getCountryGroupsForPlan(planId) {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        myHeaders.append("Access-Control-Allow-Origin", "true");
        let options = new RequestOptions({ headers: myHeaders });
        let url = `${this.globals.URLPREFIXDIT}getCountryGroupsForPlan?planId=${planId}`;
        return this.http.get(url, options)
            .map(response => {
                return response.json();
            });
    }

    getTravelPurpose(campaignid) {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        myHeaders.append("Access-Control-Allow-Origin", "true");
        let options = new RequestOptions({ headers: myHeaders });
        let url = `${this.globals.URLPREFIXDIT}getTravelPurpose?campaignid=${campaignid}`;
        return this.http.get(url, options)
            .map(response => {
                return response.json();
            });
    }

    getCountriesListForTravelPlan(TPCPlanId, TCMEffetctiveStartAndEndDate, TCGGroupId) {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        myHeaders.append("Access-Control-Allow-Origin", "true");
        let options = new RequestOptions({ headers: myHeaders });
        let url = `${this.globals.URLPREFIXDIT}getCountriesListForTravelPlan?TPCPlanId=${TPCPlanId}&TCMEffetctiveStartAndEndDate=${TCMEffetctiveStartAndEndDate}&TCGGroupId=${TCGGroupId}`;
        return this.http.get(url, options)
            .map(response => {
                return response.json();
            });
    }

}