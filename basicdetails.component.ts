import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, FormBuilder, FormArray, NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/map';
import { Globals } from '../../globals';
import { PaymentService } from '../../payment/payment.service';

import { CommonDataService } from '../../@core/services/data.service';
import { IUser } from '../../users/user.model';
import { AgentDetails } from '../../@core/model/agent.details.model';
import { OaAgentDetails } from '../../@core/model/agent.details.model';
import { PosAgentDetail } from '../../@core/model/agent.details.model';
import { PolicyDetailModel, PolicyDetails, RiskDetails } from '../../@core/model/policy.model';
import { CommonModel, AgentLookupModel, ExternalCovernotes, Nominee1Details } from '../../@core/model/common.model';
import { NG_VALIDATORS, Validator, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

import { DataList, AutoComplete } from 'primeng/primeng';
import * as moment from 'moment';
import { ChangeDetectorRef, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { ModelDataService } from '../../@core/services/model.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { CampaignDetails } from "app/@core/model/campaign.details.model";
import { PolicySummaryService } from 'app/policysearch/policysummary.service';
import { HealthInsured } from 'app/@core/model/healthinsured.model';
import { HomeInsured } from 'app/@core/model/homeinsured.model';
import { HomeHealthService } from 'app/home-health/home-health.service';
import { OnDestroy } from '@angular/core';
declare var $: any;

@Component({
    templateUrl: './basicdetails.component.html',
    styleUrls: ['../homehealth-layout.css', './basicdetails.component.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [PolicySummaryService, HomeHealthService]
})

export class HomeHealthBasicDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
    timeout10: number;
    timeout9: number;
    timeout8: NodeJS.Timer;
    timeout7: NodeJS.Timer;
    timeout6: NodeJS.Timer;
    timeout5: NodeJS.Timer;
    timeout4: number;
    timeout3: NodeJS.Timer;
    timeout2: number;
    timeout1: NodeJS.Timer;
    setGuardianMandatory: boolean = false;
    public filterIRL: string[] = [];
    currentVIew: any = 'ProposerDetails';
    ShowCombiSchemeCode: boolean;
    inwardId: any;
    combiCampaignDetails: CampaignDetails;
    agentPartyType: any;
    combiePlans: any[] = [];
    newGroupPoliciesLookups: any;
    newHomeGroupPolicy: boolean = false;
    editPolicyId: any;
    combieDetails: any;
    filteredProducts: any[];
    public plans: any = [];
    campaignDetails: CampaignDetails;
    private isPartner: boolean = false;
    subline: string;
    selectedCombiProduct: string;
    public cities: string[] = [];
    public agents: AgentLookupModel[] = [];
    public sublineArr: any = [];
    public bdoCodes: string[] = [];
    public branches: string[] = [];
    public oaDetails: any[];
    public occupations: string[] = [];
    public channels: any = [];
    public posList: any = [];
    public modeOfDeliveryList: any = [];
    public oaAgentDetails: OaAgentDetails;
    public posAgentDetails: string[] = [];
    public products: any = [];
    public coverNoteList: string[] = [];
    public insuranceRepositoriesList: string[] = [];
    public agentDetails: AgentDetails;
    public basicDetailsForm: FormGroup;
    public policyDetailsModel: PolicyDetailModel;
    public showValidationMsgs: boolean;
    public commonModel: CommonModel;
    public status: string;
    public selfOrBehalf: string;
    public showGuardianDetails: boolean = false;
    public inwardDateValidation: boolean = false;
    public showAgentModalDialog: boolean = false;
    public showExternalCoverNotes: boolean = false;
    public externalCovernotesList: ExternalCovernotes[] = [];
    public filteredBranches: string[] = [];
    public filteredcoverNoteList: string[] = [];
    public filteredCities: string[] = [];
    public filteredNomineeCities: string[] = [];
    public filteredOccupations: string[] = [];
    public nomineeRelationship: string[] = [];
    public filteredNomineeRelationship: string[] = [];
    public filteredBdoCodes: string[] = [];
    public filteredPosAgentDetails: string[] = [];
    public msgs: any;
    public identityProofs: any = [];
    public residenceProofs: any = [];
    public agentCampaignAddiInfo: any = [];
    public dedupeCheckProp: boolean = false;
    public nominee1Details: Nominee1Details;
    public preailments: any = [];
    public count=0;
    @ViewChild('agentLookupDataList') dataListModule: DataList;
    @ViewChild('ecnLookupDataList') ecnLookupDataList: DataList;
    //@ViewChild('branchAutoComplete') branchAutoComplete : AutoComplete;
    @ViewChild('proposerdetailsform') proposerdetailsform: NgForm;

    constructor(private router: Router, private route: ActivatedRoute, private dataService: CommonDataService,
        private formBuilder: FormBuilder, public globals: Globals, private modelDataService: ModelDataService,
        private datePipe: DatePipe, private messageService: MessageService,
        private policySummaryService: PolicySummaryService,
        private healthhomeservice: HomeHealthService) {
        this.initiateModel();
        // override the route reuse strategy
        // this.router.routeReuseStrategy.shouldReuseRoute = function () {
        //     return false;
        // }

        $('.buytranferradio').click(function () {
            $('.buytranferradio').removeClass('active');
            $(this).addClass('active');
            if ($(this).hasClass('buynewRadio')) {
                $('.alreadyinsuredparent').hide()
                $('.portabilitysummary').hide()
                $('.alreadyinsuredsum').hide()
                $('#welcomeoption').val('buyNew')

                $('#propalreadyins,#proppolciyno,#propalreadyins .formfieldHolder,#proppolciyno .formfieldHolder').hide();
            }
            if ($(this).hasClass('tranferRadio')) {
                $('.alreadyinsuredparent').show()
                $('.alreadyinsuredsum').show()
                $('#welcomeoption').val('transferRenew')
                $('#propalreadyins').show();
            }
            $('.alreadyinsuredyes').prop('checked', false)
            $('.alreadyinsuredno').prop('checked', false)
            $('.alreadyinsuredpropyes').prop('checked', false)
            $('.alreadyinsuredpropno').prop('checked', false)

        })


        this.route.queryParams.subscribe(
            params => {
                this.status = params['status'];
                this.selfOrBehalf = params['businessType'];
                this.subline = params['subline'];
                this.editPolicyId = params['policyId'];
                this.inwardId = params['inwardId'];
                this.currentVIew = params['currentVIew'];
                if (!this.currentVIew) {
                    this.currentVIew = 'ProposerDetails';
                }
                if(this.count > 0){
                    this.ngOnInit();
                    
                  }
                  this.count++;
            }
        );

    }

    initiateModel() {
        this.nominee1Details = new Nominee1Details();
        this.policyDetailsModel = new PolicyDetailModel();
        this.policyDetailsModel.policyDetails = new PolicyDetails();
        this.policyDetailsModel.policyDetails.riskDetails = [new RiskDetails()];
        this.policyDetailsModel.policyDetails.riskDetails[0].healthInsured = new HealthInsured();
        this.policyDetailsModel.policyDetails.riskDetails[0].homeInsured = new HomeInsured();
    }
    setModelValues() {
        this.modelDataService.setPageModel("policyDetailsModel", this.policyDetailsModel);
        this.modelDataService.setPageModel("campaignDetails", this.campaignDetails);
        this.modelDataService.setPageModel("agentDetails", this.agentDetails);
        this.modelDataService.setPageModel("commonModel", this.commonModel);
        this.modelDataService.setPageModel("nominee1Details", this.nominee1Details);
        this.modelDataService.setPageModel("oaAgentDetails", this.oaAgentDetails);
    }

    GoToHomeDetails(formValues, isValid: boolean, idofForm) {
        if (!isValid) {
            this.validateAllFields(formValues.form);
            this.showValidationMsgs = true;
            this.SubmitVal(idofForm);
        } else {
            this.setModelValues();
            this.router.navigate(['homehealth/homeDetails'], { queryParams: { 'currentVIew': 'PropertyDetails' } });
        }
    }

    backToAddressDetails() {
        this.setModelValues();
        this.router.navigate(['homehealth/basicDetails'], { queryParams: { 'currentVIew': 'AddressDetails' } });
    }

    backToProposerDetails() {
        this.setModelValues();
        this.router.navigate(['homehealth/basicDetails'], { queryParams: { 'currentVIew': 'ProposerDetails' } });
    }
    backToAdditionalDetails() {
        this.setModelValues();
        this.router.navigate(['homehealth/basicDetails'], { queryParams: { 'currentVIew': 'AdditionalDetails' } });
    }
    backToNominee1Details() {
        this.setModelValues();
        this.router.navigate(['homehealth/basicDetails'], { queryParams: { 'currentVIew': 'Nominee1Details' } });
    }

    backToNominee2Details() {
        this.setModelValues();
        this.router.navigate(['homehealth/basicDetails'], { queryParams: { 'currentVIew': 'Nominee2Details' } });
    }

    nextToNominee2Details(formValues, isValid: boolean, idofForm) {
        if (!isValid) {
            this.validateAllFields(formValues.form);
            this.showValidationMsgs = true;
            this.SubmitVal(idofForm);
        } else {
            this.setModelValues();
            this.router.navigate(['homehealth/basicDetails'], { queryParams: { 'currentVIew': 'Nominee2Details' } });
        }
    }

    nextToGuardianDetails(formValues, isValid: boolean, idofForm) {
        if (!isValid) {
            this.validateAllFields(formValues.form);
            this.showValidationMsgs = true;
            this.SubmitVal(idofForm);
        } else {
            this.setModelValues();
            this.router.navigate(['homehealth/basicDetails'], { queryParams: { 'currentVIew': 'GuardianDetails' } });
        }
    }

    fillHomeDetails(formValues, isValid: boolean, idofForm) {
        if (!isValid) {
            this.validateAllFields(formValues.form);
            this.showValidationMsgs = true;
            this.SubmitVal(idofForm);
        }
        else if (this.status == 'edit') {
            this.showHomeDetails();
            this.router.navigate(['homehealth/basicDetails'], { queryParams: { 'subline': 'Home', 'businessType': 'self', 'currentVIew': 'AddressDetails' } });
        }
        else {
            try {
                this.healthhomeservice.dedupeCheck(this.policyDetailsModel.policyDetails.proposerDetails.firstName, this.policyDetailsModel.policyDetails.proposerDetails.middleName, this.policyDetailsModel.policyDetails.proposerDetails.lastName, this.policyDetailsModel.policyDetails.proposerDetails.dateOfBirth, this.policyDetailsModel.policyDetails.proposerDetails.loanApplicationNumber).subscribe(result => {
                    if (result) {
                        this.dedupeCheckProp = !this.dedupeCheckProp;
                        alert("Already a policy had been issued for the proposer, duplication will not be allowed");
                    }
                    else {
                        this.showHomeDetails();
                        this.router.navigate(['homehealth/basicDetails'], { queryParams: { 'subline': 'Home', 'businessType': 'self', 'currentVIew': 'AddressDetails' } });
                    }
                });
            }
            catch (e) {

            }
        }
    }

    fillAdditionalDetails(formValues, isValid: boolean, idofForm) {
        if (!isValid) {
            this.validateAllFields(formValues.form);
            this.showValidationMsgs = true;
            this.SubmitVal(idofForm);
        } else {
            this.setModelValues();
            this.router.navigate(['homehealth/basicDetails'], { queryParams: { 'subline': 'Home', 'businessType': 'self', 'currentVIew': 'AdditionalDetails' } });

        }
    }
    fillNomineeDetails(formValues, isValid: boolean, idofForm) {
        if (!isValid) {
            this.validateAllFields(formValues.form);
            this.showValidationMsgs = true;
            this.SubmitVal(idofForm);
        } else {
            this.setModelValues();
            this.router.navigate(['homehealth/basicDetails'], { queryParams: { 'subline': 'Home', 'businessType': 'self', 'currentVIew': 'Nominee1Details' } });

        }
    }

    ShowBMI(count) {
        let height = this.policyDetailsModel.policyDetails.riskDetails[count].healthInsured.height;
        let weight = this.policyDetailsModel.policyDetails.riskDetails[count].healthInsured.weight;
        if (height > 0 && weight > 0) {
            let bmiVal: any = Math.round((weight / ((height / 100) * (height / 100))));
            this.policyDetailsModel.policyDetails.riskDetails[count].healthInsured.bmi = bmiVal;
        } else {
            this.policyDetailsModel.policyDetails.riskDetails[count].healthInsured.bmi = 0;
            if (!(height > 0)) {
                this.policyDetailsModel.policyDetails.riskDetails[count].healthInsured.height = null;
            } if (!(weight > 0)) {
                this.policyDetailsModel.policyDetails.riskDetails[count].healthInsured.weight = null;
            }
        }
    }

    validateNominee2Age() {
        if (this.policyDetailsModel.policyDetails.proposerDetails.nomineeDob != "" && this.policyDetailsModel.policyDetails.proposerDetails.nomineeDob != null && this.policyDetailsModel.policyDetails.proposerDetails.nomineeDob != undefined) {
            let dateofbirth = moment(this.policyDetailsModel.policyDetails.proposerDetails.nomineeDob, 'DD/MM/YYYY');
            let difference = moment().diff(dateofbirth, 'years');

            if (difference < 18) {
                this.setGuardianMandatory = true;
            }
            else if (difference > 99) {
                this.messageService.add({ severity: 'warn', summary: 'Nominee Age Should not Greater Than 99 Years', detail: '' });
                this.timeout1 = setTimeout(() => {
                    this.policyDetailsModel.policyDetails.proposerDetails.nomineeDob = '';
                }, 0);
            }
            else {
                this.setGuardianMandatory = false;
            }
        } else {
            this.setGuardianMandatory = false;
        }
    }

    SubmitVal(idofForm) {
        let count = 0;
        let focusIndex = 0;

        $('.formfieldHolder').css({ 'display': 'none' });
        var accordianSelected = idofForm
        if (accordianSelected) {
            var Invalidinputs = $(`#${idofForm} .formfieldHolder`)
        }
        for (let i = 0; i < Invalidinputs.length; i++) {
            if (Invalidinputs[i].innerHTML.includes('ng-invalid')) {
                focusIndex = i;
                count++;
                break;
            }
        }

        if (count > 0) {
            // Invalidinputs[focusIndex].children[0].children[0].id;
            Invalidinputs[focusIndex].style.display = 'block';
            Invalidinputs[focusIndex].children[0].children[0].focus();
        }
        else {
            // event.currentTarget.nextElementSibling.style.display = 'block'
        }

    }

    ngAfterViewInit() {
        $('.formfieldHolder.first-child').css({ 'display': 'block' });
        //$('.formfieldHolder').hasClass('.form-control.is-invalid').css({ 'display': 'block' });
        $('.formheader').click(function (event) {
            let count = 0;
            let focusIndex = 0;

            $('.formfieldHolder').css({ 'display': 'none' });


            var accordianSelected = event.currentTarget.parentElement.parentElement.id;
            if (accordianSelected == "proposalform-single") {
                var Invalidinputs = $(".proposalform-single .formfieldHolder")
            }
            if (accordianSelected == "contactform-single") {
                var Invalidinputs = $(".contactform-single .formfieldHolder")
            }
            if (accordianSelected == "child-clone1") {
                var Invalidinputs = $(".accordian1 .formfieldHolder")
            }
            let invalidOffset = 0;
            if (Invalidinputs && Invalidinputs.length) {
                for (let i = 0; i < Invalidinputs.length; i++) {
                    if (Invalidinputs[i].innerHTML.includes('ng-invalid')) {
                        focusIndex = i;
                        if (Invalidinputs[i].parentNode.nodeName == 'LI') {
                            invalidOffset = Invalidinputs[i].parentNode.offsetTop;
                        }
                        count++;
                        break;
                    }
                }
            }
            if (event.currentTarget.offsetTop < invalidOffset && count > 0) {
                event.currentTarget.nextElementSibling.style.display = 'block';
                event.currentTarget.nextElementSibling.children[0].children[0].focus();
            }
            else if (count > 0) {
                var id = Invalidinputs[focusIndex].children[0].children[0].id;
                Invalidinputs[focusIndex].style.display = 'block';
                Invalidinputs[focusIndex].focus();
                $(`#${id}`).addClass('ng-touched');
                $(`#${id}`).removeClass('ng-untouched');
                $(`#${id}`).focus();
                // Invalidinputs[focusIndex].children[0].children[0].addClass('ng-touched');
                //Invalidinputs[focusIndex].children[0].children[0].removeClass('ng-untouched');
            }
            else {
                event.currentTarget.nextElementSibling.style.display = 'block'
            }

        });
        $(".tabIndexCustom").keydown(function tabFunction(event) {
            if (!event.shiftKey && event.keyCode === 9) {
                let count = 0;
                let focusIndex = 0;

                $('.formfieldHolder').css({ 'display': 'none' });

                var accordianSelected = event.currentTarget.form.firstElementChild.id;
                if (accordianSelected == "proposalform-single") {
                    var Invalidinputs = $(".proposalform-single .formfieldHolder")
                }
                if (accordianSelected == "contactform-single") {
                    var Invalidinputs = $(".contactform-single .formfieldHolder")
                }
                if (accordianSelected == "child-clone1") {
                    var Invalidinputs = $(".accordian1 .formfieldHolder")
                }
                let invalidOffset = 0;
                if (Invalidinputs && Invalidinputs.length) {
                    for (let i = 0; i < Invalidinputs.length; i++) {
                        if (Invalidinputs[i].innerHTML.includes('ng-invalid')) {
                            focusIndex = i;
                            if (Invalidinputs[i].parentNode.nodeName == 'LI') {
                                invalidOffset = Invalidinputs[i].parentNode.offsetTop;
                            }
                            count++;
                            break;
                        }
                    }
                }

                if (event.currentTarget.offsetTop < invalidOffset && count > 0) {
                    // let id = event.currentTarget.parentElement.parentElement.parentElement.nextElementSibling.children[1].children[0].children[0].id;
                    //event.currentTarget.parentElement.parentElement.parentElement.nextElementSibling.children[1].style.display = 'block';
                    $(this).closest('li').next().find(".formfieldHolder").css({ "display": "block" });
                    //  document.getElementById(id).focus();
                }
                else if (count > 0) {
                    var id = Invalidinputs[focusIndex].children[0].children[0].id;
                    Invalidinputs[focusIndex].style.display = 'block';
                    Invalidinputs[focusIndex].focus();
                    // $(`#${id}`).addClass('ng-touched');
                    // $(`#${id}`).removeClass('ng-untouched');
                }
                else {
                    //event.currentTarget.parentElement.parentElement.parentElement.nextElementSibling.children[1].style.display = 'block'
                    $(this).closest('li').next().find(".formfieldHolder").css({ "display": "block" });
                }
            }
            else if (event.shiftKey && event.keyCode == 9) {

                $('.formfieldHolder').css({ 'display': 'none' });

                //event.currentTarget.parentElement.parentElement.parentElement.previousElementSibling.children[1].style.display = 'block'
                $(this).closest('li').prev().find(".formfieldHolder").css({ "display": "block" });

            }
        });


        $('.CustomEdit').click(function (event) {
            var idSelected = event.currentTarget.id;
            var idsplit = idSelected.split("_Summary");
            var ID = idsplit[0];
            $('.formfieldHolder').css({ 'display': 'none' });
            document.getElementById(ID).parentElement.parentElement.style.display = 'block';
            document.getElementById(ID).focus();
        });

        $('.btn-toggle').click(function () {
            $(this).addClass("active").siblings().removeClass("active");
        });
    }

    ngOnInit() {

        if (this.globals.USERDTO.userType == 'partner') {
            this.isPartner = true;
        }
    
        try {
            if (this.status == "new") {
                this.removeModelFromSession();
                this.initiateModel();
                this.agentDetails = new AgentDetails();
                this.commonModel = new CommonModel();
                this.oaAgentDetails = new OaAgentDetails();
                this.campaignDetails = new CampaignDetails();
                this.combiCampaignDetails = new CampaignDetails();
                this.policyDetailsModel.policyDetails.subline = this.subline;
                this.policyDetailsModel.policyDetails.inceptionDate = moment(date).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).format('DD/MM/YYYY HH:mm:ss');
                var date = new Date();
                this.commonModel.inceptionDate = moment(date).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).format('DD/MM/YYYY HH:mm:ss');
                this.policyDetailsModel.policyDetails.oaAgentDetails.inwardDate = this.datePipe.transform(date, "dd/MM/yyyy");
                date.setFullYear(date.getFullYear() + 1, date.getMonth(), Number(moment(date).format('DD')) - 1);
                this.commonModel.expiryDate = this.datePipe.transform(date, "dd/MM/yyyy");
                this.policyDetailsModel.policyDetails.expiryDate = moment(date).format('DD/MM/YYYY');
                if ('normal' == this.globals.USERDTO.userType) {
                    this.policyDetailsModel.policyDetails.internalUser = 'true';
                } else {
                    this.policyDetailsModel.policyDetails.internalUser = 'false';
                }
                this.modelDataService.emtyPageModel();
                // this.policyDetailsModel.policyDetails.combiCampaignSelected = 'false';
                this.policyDetailsModel.policyDetails.proposerDetails.gender = 'Male';
                this.policyDetailsModel.policyDetails.proposerDetails.nomineeGender = 'Male';
                this.policyDetailsModel.policyDetails.proposerDetails.maritalStatus = 'Single';
                this.timeout3 = setTimeout(() => {
                    $('#selectDefaultAutoRenewal').attr('selected', true);
                    $('#selectDefaultAnnualGross').attr('selected', true);
                }, 0);
                //this.loadIdentityProofs();
                //this.loadResidenceProofs();
                //this.loadBdos();

                this.policyDetailsModel.policyDetails.productName = "GG01FHM";
                this.policyDetailsModel.policyDetails.plmProductName = "GS01FHM";
                this.policyDetailsModel.policyDetails.channel = "BankAssurance";
                this.policyDetailsModel.policyDetails.salesCompany = "Walkin";
                this.policyDetailsModel.policyDetails.combiCampaignSelected = "true";
                this.policyDetailsModel.policyDetails.selectedCombiProduct = "SKH1";
                this.policyDetailsModel.policyDetails.combiSubline = "Health";
                this.policyDetailsModel.policyDetails.combiPlmProductName = "SKH1";
                this.policyDetailsModel.policyDetails.oaCode = "OA000240";
                this.policyDetailsModel.policyDetails.livesCovered = "";
                this.policyDetailsModel.policyDetails.policyType = "NonFloater";
                this.policyDetailsModel.policyDetails.noInsured = 1;
                this.policyDetailsModel.policyDetails.policyDuration = 1;
                this.policyDetailsModel.policyDetails.planOption = "";
                this.policyDetailsModel.policyDetails.combiPolicyDuration = "1";
                this.policyDetailsModel.policyDetails.combiInceptionDate = "11/07/2018 00:00:00";
                this.policyDetailsModel.policyDetails.combiExpiryDate = "10/07/2019";
                this.policyDetailsModel.policyDetails.combiPlanOption = "Diamond";
                this.policyDetailsModel.policyDetails.branchCode = "XO";
                this.policyDetailsModel.policyDetails.branchName = "BANGALORE  MARTHAHALLI";
                this.policyDetailsModel.policyDetails.isCombiProduct = true;
                this.policyDetailsModel.policyDetails.combiProductDisplayName = "SKH1";
                this.policyDetailsModel.policyDetails.combiPackageName = "SKH1";
                this.policyDetailsModel.policyDetails.combiPackageDisplayName = "SKH1";
                this.policyDetailsModel.policyDetails.isGroupCampaign = true;
                this.policyDetailsModel.policyDetails.groupName = "DCB BANK LTD";
                this.policyDetailsModel.policyDetails.agentCode = 'AG017328';
                this.policyDetailsModel.policyDetails.agentName = 'DEVELOPMENT CREDIT BANK LIMITED';


            } else if (this.status == "edit") {
                try {
                    this.initiateModel();
                    this.agentDetails = new AgentDetails();
                    this.commonModel = new CommonModel();
                    this.oaAgentDetails = new OaAgentDetails();
                    this.campaignDetails = new CampaignDetails();
                    this.combiCampaignDetails = new CampaignDetails();
                    $('#loadingHomeBasicScreen').addClass('d-block');
                    this.healthhomeservice.loadPolicy(this.editPolicyId, this.globals.USERDTO.userName).subscribe(result => {
                        this.policyDetailsModel.policyDetails = result.policyDetail;
                        this.policyDetailsModel.policyDetails.riskDetails[0].healthInsured = result.combiPolicyDetail.riskDetails[0].healthInsured;
                        this.policyDetailsModel.policyDetails.combiSubline = result.combiPolicyDetail.subline;
                        this.policyDetailsModel.policyDetails.combiProductDisplayName = result.combiPolicyDetail.productDisplayName;
                        this.policyDetailsModel.policyDetails.combiPackageName = result.combiPolicyDetail.packageName;
                        this.policyDetailsModel.policyDetails.combiPackageDisplayName = result.combiPolicyDetail.packageDisplayName;

                        this.policyDetailsModel.policyDetails.proposerDetails.maritalStatus = result.combiPolicyDetail.proposerDetails.maritalStatus;
                        // setting NomineeDetails on edit mode
                        this.policyDetailsModel.policyDetails.proposerDetails.nomineeAddress1 = result.combiPolicyDetail.proposerDetails.nomineeAddress1;
                        this.policyDetailsModel.policyDetails.proposerDetails.nomineeAddress2 = result.combiPolicyDetail.proposerDetails.nomineeAddress2;
                        this.policyDetailsModel.policyDetails.proposerDetails.nomineeAddress3 = result.combiPolicyDetail.proposerDetails.nomineeAddress3;
                        this.policyDetailsModel.policyDetails.proposerDetails.nomineeAddress4 = result.combiPolicyDetail.proposerDetails.nomineeAddress4;
                        this.policyDetailsModel.policyDetails.proposerDetails.nomineeCity = result.combiPolicyDetail.proposerDetails.nomineeCity;
                        this.policyDetailsModel.policyDetails.proposerDetails.nomineeState = result.combiPolicyDetail.proposerDetails.nomineeState;
                        this.policyDetailsModel.policyDetails.proposerDetails.nomineePincode = result.combiPolicyDetail.proposerDetails.nomineePincode;
                        this.policyDetailsModel.policyDetails.proposerDetails.nomineeLastName = result.combiPolicyDetail.proposerDetails.nomineeLastName;
                        this.policyDetailsModel.policyDetails.proposerDetails.nomineeMiddleName = result.combiPolicyDetail.proposerDetails.nomineeMiddleName;
                        this.policyDetailsModel.policyDetails.proposerDetails.nomineeGender = result.combiPolicyDetail.proposerDetails.nomineeGender;
                        this.policyDetailsModel.policyDetails.proposerDetails.nomineeDob = result.combiPolicyDetail.proposerDetails.nomineeDob;
                        this.policyDetailsModel.policyDetails.proposerDetails.nomineeMobileNumber = result.combiPolicyDetail.proposerDetails.nomineeMobileNumber;
                        this.policyDetailsModel.policyDetails.proposerDetails.shareofBenefit = result.combiPolicyDetail.proposerDetails.shareofBenefit;
                        // setting NomineeDetails on edit mode
                        this.modelDataService.setPageModel("policyDetailsModel", this.policyDetailsModel);
                        this.commonModel.inceptionDate = this.policyDetailsModel.policyDetails.inceptionDate;
                        this.commonModel.expiryDate = this.policyDetailsModel.policyDetails.expiryDate;
                        this.commonModel.inwardDate = this.policyDetailsModel.policyDetails.oaAgentDetails.inwardDate;
                        this.commonModel.tempCity = this.policyDetailsModel.policyDetails.proposerDetails.city;
                        this.commonModel.agentName = this.policyDetailsModel.policyDetails.agentCode + "-" + this.policyDetailsModel.policyDetails.agentName;
                        this.commonModel.branchCode = this.policyDetailsModel.policyDetails.branchCode + "-" + this.policyDetailsModel.policyDetails.branchName;
                        this.commonModel.lookupAgentCode = this.policyDetailsModel.policyDetails.agentCode;
                        this.commonModel.lookupAgentName = this.policyDetailsModel.policyDetails.agentName;
                        //this.loadAgentDetails();
                        this.callBackToGetCampaignDetails(null);
                        this.loadPlans(this.policyDetailsModel.policyDetails.productName);
                        if (this.policyDetailsModel.policyDetails.selectedCombiProduct) {
                            this.loadCombiPlans(this.policyDetailsModel.policyDetails.selectedCombiProduct);
                        }
                        if (this.policyDetailsModel.policyDetails.proposerDetails.nomineePartyCode != "" && this.policyDetailsModel.policyDetails.proposerDetails.nomineePartyCode != null && this.policyDetailsModel.policyDetails.proposerDetails.nomineePartyCode != undefined) {
                            this.policyDetailsModel.policyDetails.proposerDetails.partyExists = 'Yes';
                        }
                        for (var i = 0; i < this.cities.length; i++) {
                            if (this.cities[i].includes(this.policyDetailsModel.policyDetails.proposerDetails.city)) {
                                this.commonModel.tempCity = this.cities[i];
                            }
                        }
                        for (var i = 0; i < this.policyDetailsModel.policyDetails.riskDetails.length; i++) {
                            if (i == 0) {
                                // if (this.policyDetailsModel.policyDetails.riskDetails[i].homeInsured == 'SELF') {
                                //     this.policyDetailsModel.policyDetails.isProposerInsured = 'Yes';
                                // } else {
                                //     this.policyDetailsModel.policyDetails.isProposerInsured = 'No';
                                // }
                            }
                        }
                        //this.policyDetailsModel.policyDetails.additionalInfos.additionalInfo = this.policyDetailsModel.policyDetails.additionalInfos;
                        this.loadCampaignDetails();
                        // this.loadIdentityProofs();
                        //this.loadResidenceProofs();
                        //this.loadBdos();
                        if (this.policyDetailsModel.policyDetails.isCombiProduct) {
                            this.loadCombiCampaignDetails();
                        }
                        $('#loadingHomeBasicScreen').removeClass('d-block');

                        // setting Nominee1 Default Details on edit mode
                        this.nominee1Details.nominee1address1 = "DCB Bank Limited"
                        this.nominee1Details.nominee1address2 = "Corporate Office"
                        this.nominee1Details.nominee1address3 = "6th Floor, Tower A Peninsula Business Park Senapati Bapat Marg Lower Parel"
                        this.nominee1Details.nominee1bankname = "DCB Bank Ltd"
                        this.nominee1Details.nominee1city = "Mumbai"
                        this.nominee1Details.nominee1contactno = "+91 22 6618 7000"
                        this.nominee1Details.nominee1lendingname = "Lending Financial Institution"
                        this.nominee1Details.nominee1pincode = "400013"
                        this.nominee1Details.nominee1sharebenefit = "Total outstanding on the date of claim"
                        // setting Nominee1 Default Details on edit mode
                    });
                } catch (e) {

                }
            }

            else {
                this.policyDetailsModel = this.modelDataService.getPageModel("policyDetailsModel");
                this.nominee1Details = this.modelDataService.getPageModel("nominee1Details");
                this.campaignDetails = this.modelDataService.getPageModel("campaignDetails");
                this.agentDetails = this.modelDataService.getPageModel("agentDetails");
                this.commonModel = this.modelDataService.getPageModel("commonModel");
                this.oaAgentDetails = this.modelDataService.getPageModel("oaAgentDetails");
                this.loadPlans(this.policyDetailsModel.policyDetails.productName);
                if (this.policyDetailsModel.policyDetails.selectedCombiProduct) {
                    this.loadCombiPlans(this.policyDetailsModel.policyDetails.selectedCombiProduct);
                }
                // this.setBranches(this.agentDetails.branches);
                // this.setAgentBdos(this.agentDetails.agentBdos);
                this.setoaAgentDetails(this.agentDetails.oaAgentDetails);
                //var salesCompany = this.policyDetailsModel.policyDetails.salesCompany;
                //this.policyDetailsModel.policyDetails.salesCompany = salesCompany;
                //this.setModeOfDelivery(this.agentDetails.modesOfDelivery);
                //this.loadIdentityProofs();
                //this.loadResidenceProofs();
                /*if (this.policyDetailsModel.policyDetails.isCombiProduct) {
                    this.loadCombiCampaignDetails();
                }*/
            }
            this.policyDetailsModel.policyDetails.quoteType = 'RatingCalculator';
            this.loadCities();
            this.loadOccupations();
            this.loadNomineeRelationship();
            //this.loadInsuranceRepositorys();
            //this.getProducts();
            //this.loadBdos();
            this.loadCampaignDetails();
            /*if (this.policyDetailsModel.policyDetails.productName) {
                this.callBackToGetCampaignDetails(null);
            }
            if (this.policyDetailsModel.policyDetails.selectedCombiProduct) {
                this.loadCombiCampaignDetails();
            }*/
            if (this.globals.USERDTO.userType == 'partner') {
                this.callBackToGetAgent(this.globals.USERDTO.userName, this.globals.USERDTO.partyCode);
                this.commonModel.lookupAgentCode = this.globals.USERDTO.partyCode;
                this.loadAgentDetails();
            }
        } catch (e) {
            this.messageService.add({ severity: 'error', summary: 'Error Occured', detail: e });
        }

        this.validateNominee2Age();
    }

    setGSTINNumber(obj) {
        if (obj != null && obj != "" && obj != undefined) {
            let st = this.policyDetailsModel.policyDetails.proposerDetails.state;
            if (!this.policyDetailsModel.policyDetails.proposerDetails.isInternationalAddress) {
                if (this.policyDetailsModel.policyDetails.proposerDetails.city != "" && this.policyDetailsModel.policyDetails.proposerDetails.city != null && this.policyDetailsModel.policyDetails.proposerDetails.city != undefined && st != null && st != " && st != undefined") {
                    let stateCode = "";
                    this.dataService.getPolicyService().loadGSTStateCode(st).subscribe(result => {
                        var stateCodeList = JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(result)).GSTSTATECODE));
                        stateCode = stateCodeList[0].STATE_CODE;
                        if (stateCode != "" && stateCode != null && stateCode != undefined) {
                            this.policyDetailsModel.policyDetails.proposerDetails.customerGstNumber = stateCode + obj;
                        }
                    });
                } else {
                    this.messageService.add({ severity: 'warn', summary: 'Please Select City.', detail: '' });
                    this.policyDetailsModel.policyDetails.proposerDetails.panNumber = '';
                    return;
                }
            }
        }
    }

    setPANNumber(obj) {
        if (obj != null && obj != "" && obj != undefined) {
            this.policyDetailsModel.policyDetails.proposerDetails.panNumber = obj.substr(2, 10);
        } /*else {
          this.setGSTINNumber(this.policyDetailsModel.policyDetails.proposerDetails.panNumber);
        }*/
    }

    filterProducts(obj: string) {
        this.filteredProducts = [];
        if (this.products && this.products.length == 0) {
            this.selfOrBehalf = 'self';
            this.getProducts();
        }
        else {
            for (var i = 0; i < this.products.length; i++) {
                if (this.products[i].toString().toLowerCase().indexOf(obj.toString().toLowerCase()) > -1) {
                    this.filteredProducts.push(this.products[i]);
                }
            }
        }
    }
    validateAllFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFields(control);
            }
        });
    }

    onChooseCombi(flag) {

        if (flag == true || flag == 'true') {
            this.policyDetailsModel.policyDetails.selectedCombiProduct = this.combieDetails;
            this.policyDetailsModel.policyDetails.combiCampaignSelected = 'true';
            this.ShowCombiSchemeCode = true;

            this.loadCombiCampaignDetails();
            this.policyDetailsModel.policyDetails.combiPolicyDuration = '1';
            this.policyDetailsModel.policyDetails.combiInceptionDate = moment(new Date()).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).format('DD/MM/YYYY HH:mm:ss');
            var incepDate = this.policyDetailsModel.policyDetails.combiInceptionDate.split(" ")[0].split("/");
            var date = new Date((parseInt(incepDate[2])), parseInt(incepDate[1]) - 1, parseInt(incepDate[0]));
            date.setFullYear(date.getFullYear() + Number(this.policyDetailsModel.policyDetails.combiPolicyDuration), date.getMonth(), Number(moment(date).format('DD')) - 1);
            this.policyDetailsModel.policyDetails.combiExpiryDate = this.datePipe.transform(date, "dd/MM/yyyy");
        } else {
            this.policyDetailsModel.policyDetails.combiCampaignSelected = 'false';
            this.ShowCombiSchemeCode = false;
        }

    }

    callBackToGetCampaignDetails(basicDetailsForm: NgForm) {
        this.loadCampaignDetails();

    }

    loadGroupCampaigns() {
        if (this.policyDetailsModel.policyDetails.productName &&
            this.policyDetailsModel.policyDetails.inceptionDate
        ) {
            this.dataService.getPolicyService().getGroupCampaigns(this.policyDetailsModel.policyDetails.productName, this.policyDetailsModel.policyDetails.inceptionDate)
                .subscribe((data) => {

                    this.newGroupPoliciesLookups = data;
                });
        }
    }

    onChangeNewHomeGroupPolicy() {
        if (this.newHomeGroupPolicy) {
            this.loadGroupCampaigns();
        }
    }

    loadCampaignDetails() {
        try {
            let productNameSplit = this.policyDetailsModel.policyDetails.productName.split("-");
            var inceptionDate = this.commonModel.inceptionDate;
            this.dataService.getPolicyService().loadCampaignDetails(productNameSplit[0], inceptionDate).subscribe(result => {
                this.campaignDetails = result;
            });
        } catch (e) {

        }
    }

    loadCombiCampaignDetails() {
        try {
            var productName = this.policyDetailsModel.policyDetails.selectedCombiProduct;
            var inceptionDate = this.commonModel.inceptionDate;
            this.dataService.getPolicyService().loadCampaignDetails(productName, inceptionDate).subscribe(result => {
                this.combiCampaignDetails = result;
                this.policyDetailsModel.policyDetails.combiPlmProductName = this.combiCampaignDetails.plmProductName;
                if (result) {
                    if (this.status != 'edit') {
                        this.policyDetailsModel.policyDetails.combiPolicyDuration = this.combiCampaignDetails.minimumPolicyTermForNewBusiness.toString();
                    }
                    this.policyDetailsModel.policyDetails.selectedCombiProduct = this.combiCampaignDetails.campaignName;
                    this.loadCombiPlans(this.policyDetailsModel.policyDetails.selectedCombiProduct);
                }
            });
        } catch (e) {

        }
    }

    clearDetails() {
        this.policyDetailsModel.policyDetails.proposerDetails.nomineeAddress1 = '';
        this.policyDetailsModel.policyDetails.proposerDetails.nomineeAddress2 = '';
        this.policyDetailsModel.policyDetails.proposerDetails.nomineeAddress3 = '';
        this.policyDetailsModel.policyDetails.proposerDetails.nomineeAddress4 = '';
        this.policyDetailsModel.policyDetails.proposerDetails.nomineeCity = '';
        this.policyDetailsModel.policyDetails.proposerDetails.nomineeState = '';
        this.policyDetailsModel.policyDetails.proposerDetails.nomineePincode = '';
        this.policyDetailsModel.policyDetails.proposerDetails.nomineeCountry = '';
        this.policyDetailsModel.policyDetails.proposerDetails.nomineeStdPhone1 = '';
        this.policyDetailsModel.policyDetails.proposerDetails.nomineePhone1 = '';
        this.policyDetailsModel.policyDetails.proposerDetails.nomineeStdPhone2 = '';
        this.policyDetailsModel.policyDetails.proposerDetails.nomineePhone2 = '';
        this.policyDetailsModel.policyDetails.proposerDetails.internationalNomineeCity = '';
        this.policyDetailsModel.policyDetails.proposerDetails.internationalNomineeState = '';
        this.policyDetailsModel.policyDetails.proposerDetails.internationalNomineePincode = '';
        this.policyDetailsModel.policyDetails.proposerDetails.maritalStatus = '';
        this.policyDetailsModel.policyDetails.proposerDetails.educationalQualification = '';
        this.policyDetailsModel.policyDetails.proposerDetails.annualIncome = '';
        this.policyDetailsModel.policyDetails.counterOfferId = '';
        this.policyDetailsModel.policyDetails.loadingPercentage = '';
    }

    setMandatory(basicDetailsForm: NgForm, obj: boolean, id: string) {
        if (obj) {
            this.setValidation(basicDetailsForm, id, true, null);
        } else {
            this.setValidation(basicDetailsForm, id, false, null);
        }
    }

    validatePolicyDuration(basicDetailsForm: NgForm, obj) {
        if (obj != null) {
            let minimumTerm = this.campaignDetails.minimumPolicyTermForNewBusiness;
            let maximumTerm = this.campaignDetails.maximumPolicyTermForNewBusiness;
            if (Number(obj) >= Number(minimumTerm) && Number(obj) <= Number(maximumTerm)) {

            }
            else {
                basicDetailsForm.controls['policyDuration'].setErrors({ 'policyDurationLimit1': true });
            }
            if (minimumTerm <= Number(obj) && Number(obj) <= maximumTerm) {

            }
            else {
                basicDetailsForm.controls['policyDuration'].setErrors({ 'policyDurationLimit2': true });
            }

            if (minimumTerm) {
                var incepDate = this.policyDetailsModel.policyDetails.inceptionDate.split(" ")[0].split("/");
                var date = new Date((parseInt(incepDate[2])), parseInt(incepDate[1]) - 1, parseInt(incepDate[0]));
                this.policyDetailsModel.policyDetails.inceptionDate = this.commonModel.inceptionDate;
                date.setFullYear(date.getFullYear() + Number(this.policyDetailsModel.policyDetails.policyDuration), date.getMonth(), Number(moment(date).format('DD')) - 1);
                this.commonModel.expiryDate = this.datePipe.transform(date, "dd/MM/yyyy");
                this.policyDetailsModel.policyDetails.expiryDate = this.commonModel.expiryDate;
            }


        }
    }

    validateCombiPolicyDuration(basicDetailsForm: NgForm, obj) {
        if (obj != null) {
            let minimumTerm = Number(this.combiCampaignDetails.minimumPolicyTermForNewBusiness);
            let maximumTerm = Number(this.combiCampaignDetails.maximumPolicyTermForNewBusiness);
            if (Number(obj) >= minimumTerm && Number(obj) <= maximumTerm) {

            }
            else {
                basicDetailsForm.controls['combiPolicyPeriod'].setErrors({ 'combiPolicyPeriodLimit1': true });
            }
            if (minimumTerm <= Number(obj) && Number(obj) <= maximumTerm) {

            }
            else {
                basicDetailsForm.controls['combiPolicyPeriod'].setErrors({ 'combiPolicyPeriodLimit2': true });
            }

            if (minimumTerm) {
                var incepDate = this.policyDetailsModel.policyDetails.combiInceptionDate.split(" ")[0].split("/");
                var date = new Date((parseInt(incepDate[2])), parseInt(incepDate[1]) - 1, parseInt(incepDate[0]));
                date.setFullYear(date.getFullYear() + Number(this.policyDetailsModel.policyDetails.combiPolicyDuration), date.getMonth(), Number(moment(date).format('DD')) - 1);
                this.policyDetailsModel.policyDetails.combiExpiryDate = this.datePipe.transform(date, "dd/MM/yyyy");
            }


        }
    }

    setExpiryDateOnChangeofInceptionCombi() {
        var incepDate = this.policyDetailsModel.policyDetails.combiInceptionDate.split(" ")[0].split("/");
        var date = new Date((parseInt(incepDate[2])), parseInt(incepDate[1]) - 1, parseInt(incepDate[0]));
        date.setFullYear(date.getFullYear() + Number(this.policyDetailsModel.policyDetails.combiPolicyDuration), date.getMonth(), Number(moment(date).format('DD')) - 1);
        this.policyDetailsModel.policyDetails.combiExpiryDate = this.datePipe.transform(date, "dd/MM/yyyy");
        this.timeout2 = setTimeout(() => {
            this.validateReceiptDate();
        });
    }


    loadPlans(productName) {
        let productNameSplit = this.policyDetailsModel.policyDetails.productName.split("-");
        this.dataService.getPolicyService().loadPlans(productNameSplit[0], 'POLICY', null, null).subscribe(result => {
            this.plans = result;
            if (this.plans.length == 0) {
                this.policyDetailsModel.policyDetails.planOption = '';
            }
        });
    }

    loadCombiPlans(productName) {
        let productNameSplit = productName.split("-");
        this.dataService.getPolicyService().loadPlans(productNameSplit[0], 'POLICY', null, null).subscribe(result => {
            this.combiePlans = result;
        });
    }


    setoaAgentDetails(oaAgentDetails) {
        this.policyDetailsModel.policyDetails.oaAgentDetails.agentCode = oaAgentDetails.agentCode;
        this.policyDetailsModel.policyDetails.oaAgentDetails.agentName = oaAgentDetails.agentName;
        if (oaAgentDetails.licensed) {
            this.policyDetailsModel.policyDetails.oaAgentDetails.licensed = 'true';
        } else {
            this.policyDetailsModel.policyDetails.oaAgentDetails.licensed = 'false';
        }
        this.policyDetailsModel.policyDetails.oaAgentDetails.landLine = oaAgentDetails.landLine;
        this.policyDetailsModel.policyDetails.oaAgentDetails.mobile = oaAgentDetails.mobile;
    }

    getProducts() {
        this.products = [];
        if (this.selfOrBehalf == null || this.selfOrBehalf == '' || this.selfOrBehalf == undefined) {
            this.selfOrBehalf = this.policyDetailsModel.policyDetails.selfOrBehalf;
        } if (this.subline == null || this.subline == '' || this.subline == undefined) {
            this.subline = this.policyDetailsModel.policyDetails.subline;
        }
        this.dataService.getPolicyService().loadHealthProducts(this.isPartner, this.selfOrBehalf, this.policyDetailsModel.policyDetails.agentName, this.subline, this.policyDetailsModel.policyDetails.channel, this.agentPartyType
        ).subscribe(result => {
            var prodList = JSON.parse(JSON.stringify(result));
            for (var i = 0; i < prodList.length; i++) {
                if (this.status == "fromDIT" || this.status == "edit") {
                    if (prodList[i].value.includes(this.policyDetailsModel.policyDetails.productName)) {
                        this.policyDetailsModel.policyDetails.productName = prodList[i].value;
                        this.callBackToGetCampaignDetails(null);
                    }
                }
                this.products.push(prodList[i].value);
            }
            this.showAgentModalDialog = false;
        });
    }



    loadOccupations() {
        this.dataService.getPolicyService().getMasterOccupations().subscribe(result => {
            var occupationArr = JSON.parse(JSON.stringify(result.OCCUPATION));
            for (var i = 0; i < occupationArr.length; i++) {
                this.occupations.push(occupationArr[i].OCCUPATION_NAME);
            }
        });
    }

    loadInsuranceRepositorys() {
        this.dataService.getPolicyService().loadInsuranceRepositories().subscribe(result => {
            if (null != result) {
                var irArr = JSON.parse(JSON.stringify(result.INSREPOSITORY));
                for (var i = 0; i < irArr.length; i++) {
                    this.insuranceRepositoriesList.push(irArr[i].INS_REP_NAME);
                }
            }
            $('#basicDetailsToggle').trigger('click');
        });
    }

    loadNomineeRelationship() {
        this.dataService.getPolicyService().loadNomineeRelationship().subscribe(result => {
            var relationship = JSON.parse(JSON.stringify(result.RELATIONSHIP));
            for (var i = 0; i < relationship.length; i++) {
                this.nomineeRelationship.push(relationship[i].RELATIONSHIP_NAME);
            }
        });
    }

    callBackToGetAgent(agentName: string, agentCode: string) {
        this.policyDetailsModel.policyDetails.agentCode = agentCode;
        this.policyDetailsModel.policyDetails.agentName = agentName;
        this.commonModel.agentName = agentCode + '-' + agentName;

    }

    setExpiryDateOnChangeofInception() {
        var incepDate = this.policyDetailsModel.policyDetails.inceptionDate.split(" ")[0].split("/");
        var date = new Date((parseInt(incepDate[2])), parseInt(incepDate[1]) - 1, parseInt(incepDate[0]));

        date.setFullYear(date.getFullYear() + Number(this.policyDetailsModel.policyDetails.policyDuration), date.getMonth(), Number(moment(date).format('DD')) - 1);
        this.commonModel.expiryDate = this.datePipe.transform(date, "dd/MM/yyyy");
        this.policyDetailsModel.policyDetails.expiryDate = this.commonModel.expiryDate;
        this.timeout4 = setTimeout(() => {
            this.validateReceiptDate();
        });
    }

    setExpiryDate(expiryDate) {
        this.policyDetailsModel.policyDetails.expiryDate = expiryDate;
    }


    validateInwardDate(basicDetailsForm: NgForm, inwardDateStr: string) {
        if (null != inwardDateStr) {
            var spDate = inwardDateStr.split('/');
            var date = new Date((parseInt(spDate[2])), parseInt(spDate[1]) - 1, parseInt(spDate[0]));
            var currentDate = new Date();
            var formCtrl = basicDetailsForm;
            if (date.getTime() > currentDate.getTime()) {
                this.messageService.add({ severity: 'warn', summary: 'Inward date should not be greater than Inception Date.', detail: '' });
                this.policyDetailsModel.policyDetails.oaAgentDetails.inwardDate = '';
            }
        }
    }

    validateNomineeAge(obj) {
        if (null != obj) {
            var currentDate = new Date();
            var spDate = moment(obj).format('YYYY/MM/DD').split('/');
            if ((currentDate.getFullYear() - parseInt(spDate[0])) < 18) {
                this.messageService.add({ severity: 'warn', summary: 'Nominee Age is should not be less than 18.', detail: '' });
                this.policyDetailsModel.policyDetails.proposerDetails.nomineeDob = '';
            }
        }
    }

    loadAgentDetails() {

        if (this.commonModel.lookupAgentName.length == 0 && this.commonModel.lookupAgentCode.length == 0) {
            this.messageService.add({ severity: 'warn', summary: 'Please Enter Agent Code Or Name.', detail: '' });
            return;
        }
        if (null == this.policyDetailsModel.policyDetails.agentCode || '' == this.policyDetailsModel.policyDetails.agentCode ||
            undefined == this.policyDetailsModel.policyDetails.agentCode) {
            this.messageService.add({ severity: 'warn', summary: 'Please select an agent from list.', detail: '' });
            return;
        }
        try {
            this.dataService.getPolicyService().loadAgentDetails(this.policyDetailsModel.policyDetails.agentCode,
                this.selfOrBehalf, this.commonModel.inceptionDate.split(' ')[0]).subscribe(result => {
                    this.agentDetails = result;

                    this.setBranches(this.agentDetails.branches);
                    this.setAgentBdos(this.agentDetails.agentBdos);
                    this.setSublines(this.agentDetails.sublines);
                    this.setChannels(this.agentDetails.channels);
                    this.oaAgentDetails = this.agentDetails.oaAgentDetails;
                    this.policyDetailsModel.policyDetails.oaCode = this.agentDetails.oaAgentDetails.agentCode;
                    this.setPosAgentDetails(this.agentDetails.posAgentDetails);
                    this.setModeOfDelivery(this.agentDetails.modesOfDelivery);
                    this.showAgentModalDialog = false;
                    this.policyDetailsModel.policyDetails.subline = "Home";
                    this.agentPartyType = result.agentPartyType;
                    this.getProducts();
                    if (this.status == "fromDIT") {
                        for (var i = 0; i < this.agentDetails.branches.length; i++) {
                            if (this.agentDetails.branches[i].branchCode.includes(this.policyDetailsModel.policyDetails.branchCode)) {
                                this.policyDetailsModel.policyDetails.branchName = this.agentDetails.branches[i].branchName;
                                this.commonModel.branchCode = this.policyDetailsModel.policyDetails.branchCode + "-" + this.agentDetails.branches[i].branchName;
                            }
                        }
                    }
                    if (this.status != 'edit') {
                        this.loadAdditionalInfo();
                    }
                });
        } catch (e) {
            this.showAgentModalDialog = false;
        }
    }

    setBranches(branches) {
        this.branches = [];
        for (var i = 0; i < branches.length; i++) {
            this.branches.push(branches[i].branchCode + "-" + branches[i].branchName);
        }
    }

    setAgentBdos(agentBdos) {
        this.bdoCodes = [];
        this.bdoCodes = agentBdos;
    }

    setSublines(sublines) {
        this.sublineArr = [];
        for (var i = 0; i < sublines.length; i++) {
            this.sublineArr.push(sublines[i]);
        }
    }

    setChannels(channelsArr) {
        this.channels = [];
        for (var i = 0; i < channelsArr.length; i++) {
            this.channels.push(channelsArr[i]);
        }
    }

    setPosAgentDetails(posAgentsArr) {
        this.posAgentDetails = [];
        for (var i = 0; i < posAgentsArr.length; i++) {
            this.posAgentDetails.push(posAgentsArr[i].posCode + "-" + posAgentsArr[i].posName);
        }
    }

    setModeOfDelivery(modeOfDeliveryArr) {
        this.modeOfDeliveryList = [];
        for (var i = 0; i < modeOfDeliveryArr.length; i++) {
            this.modeOfDeliveryList.push(modeOfDeliveryArr[i]);
        }
    }

    loadBdos() {
        this.dataService.getPolicyService().loadBdos(this.commonModel.inceptionDate).subscribe(result => {
            var bdosList = result;
            for (var i = 0; i < bdosList.length; i++) {
                this.bdoCodes.push(bdosList[i].ROLE_PLAYER_CODE + "-" + bdosList[i].FULL_NAME);
            }
        });
    }

    loadCities() {
        this.dataService.getPolicyService().loadCities().subscribe(result => {
            var citiesList = JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(result)).CITYANDSTATE));
            for (var i = 0; i < citiesList.length; i++) {
                this.cities.push(citiesList[i].CITYCODE + "-" + citiesList[i].CITY);
                if (citiesList[i].CITY.includes(this.policyDetailsModel.policyDetails.proposerDetails.city)) {
                    this.policyDetailsModel.policyDetails.proposerDetails.city = this.cities[i];
                    this.filterCities(this.policyDetailsModel.policyDetails.proposerDetails.city);
                } if (citiesList[i].CITY.includes(this.policyDetailsModel.policyDetails.proposerDetails.nomineeCity)) {
                    this.policyDetailsModel.policyDetails.proposerDetails.nomineeCity = this.cities[i];
                    this.filterNomineeCities(this.policyDetailsModel.policyDetails.proposerDetails.nomineeCity);
                }
            }
        });
    }

    callBackToGetStates(obj) {
        if (null != obj) {
            var cityCode = obj.split("-");
            //this.policyDetailsModel.policyDetails.proposerDetails.city = cityCode[1];
            this.dataService.getPolicyService().loadStates(cityCode[0]).subscribe(stateresult => {
                var stateList = JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(stateresult)).state));
                this.policyDetailsModel.policyDetails.proposerDetails.state = stateList[0].NAME;
            });
            //this.commonModel.tempCity = obj;
        }
    }

    callBackToGetStatesofNominee(obj) {
        if (null != obj) {
            var cityCode = obj.split("-");
            //this.policyDetailsModel.policyDetails.proposerDetails.nomineeCity = cityCode[1];
            this.dataService.getPolicyService().loadStates(cityCode[0]).subscribe(stateresult => {
                var stateList = JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(stateresult)).state));
                this.policyDetailsModel.policyDetails.proposerDetails.nomineeState = stateList[0].NAME;
            });
            //this.commonModel.tempCity = obj;
        }
    }

    callBackToGetBDO(code) {
        let bdoName = $(`#${code}`).find(":selected").text();
        this.policyDetailsModel.policyDetails.bdoName = bdoName.split('-')[1];
        this.policyDetailsModel.policyDetails.bdoCode = bdoName.split('-')[0];
    }

    callBackToGetBranch(obj) {
        if (null != obj) {
            var temp = obj.split("-");
            this.policyDetailsModel.policyDetails.branchCode = temp[0];
            this.policyDetailsModel.policyDetails.branchName = temp[1];

        }
    }

    callBackToGetPOS(obj) {
        if ('YES' == obj) {
            this.dataService.getPolicyService().loadPOS().subscribe(result => {
                var posList = JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(result.POS))));
                for (var i = 0; i < posList.length; i++) {
                    this.posList.push(posList[i].ROLE_PLAYER_CODE + "-" + posList[i].FULL_NAME);
                }
            });
        }
    }

    callBackToGetPOSDetails(obj) {
        if (null != obj) {
            var posCode = obj.split("-");
            this.policyDetailsModel.policyDetails.posAgentDetails.posCode = posCode[0];
            this.dataService.getPolicyService().loadPOSDetails(posCode[0]).subscribe(result => {
                this.policyDetailsModel.policyDetails.posAgentDetails = result;
                this.policyDetailsModel.policyDetails.posAgentDetails.posName = posCode[1];
                this.policyDetailsModel.policyDetails.posAgentDetails.posCode = posCode[0];
            });
            this.commonModel.posCode = posCode[0];
        }
    }

    callBackToGetCVDetails(obj) {
        if (null != obj) {
            this.dataService.getPolicyService().loadCoverNoteDetails(obj,
                this.policyDetailsModel.policyDetails.manualCoverNote).subscribe(result => {
                    this.commonModel.inceptionDate = result.inceptionDate;
                    this.commonModel.expiryDate = result.expiryDate;
                    this.policyDetailsModel.policyDetails.proposerDetails.address1 = result.address1;
                    this.policyDetailsModel.policyDetails.proposerDetails.address2 = result.address2;
                    this.policyDetailsModel.policyDetails.proposerDetails.address3 = result.address3;
                    this.policyDetailsModel.policyDetails.proposerDetails.address4 = result.address4;
                    this.policyDetailsModel.policyDetails.coverNoteNumber = result.coverNoteNumber;
                    this.policyDetailsModel.policyDetails.proposerDetails.firstName = result.firstName;
                    this.policyDetailsModel.policyDetails.proposerDetails.lastName = result.lastName;
                    this.policyDetailsModel.policyDetails.proposerDetails.pinCode = result.pincode;
                    this.commonModel.chassisNumber = result.chassisNo;
                    this.commonModel.engineNumber = result.engineNo;
                    this.commonModel.registrationNumber = result.registrationNumber;
                    this.policyDetailsModel.policyDetails.coverNoteIssueDate = result.coverNoteIssueDate;
                    this.policyDetailsModel.policyDetails.coverNotePremium = result.coverNotePremium;
                    //result.policyPeriod // to be implemented later
                    //result.policyPeriodDisable  // to be implemented later
                    this.policyDetailsModel.policyDetails.manualCoverNote = result.manualCoverNote;
                });
        }
    }



    setProducts(productArr) {
        this.products = [];
        if (null != productArr) {
            for (var i = 0; i < productArr.length; i++) {
                this.products.push(productArr[i]);
            }
        }
    }

    showHomeDetails() {
        this.policyDetailsModel.policyDetails.errMsg = "";
        this.calculateDiffDays();
        this.modelDataService.setPageModel("policyDetailsModel", this.policyDetailsModel);
        this.modelDataService.setPageModel("campaignDetails", this.campaignDetails);
        this.modelDataService.setPageModel("agentDetails", this.agentDetails);
        this.modelDataService.setPageModel("commonModel", this.commonModel);
        this.modelDataService.setPageModel("nominee1Details", this.nominee1Details);
        this.modelDataService.setPageModel("oaAgentDetails", this.oaAgentDetails);
        //this.router.navigate(['home/product']);
    }

    calculateDiffDays() {
        var incepDate = this.commonModel.inceptionDate.split(" ")[0].split('/');
        var inceptionDate = new Date((parseInt(incepDate[2])), parseInt(incepDate[1]) - 1, parseInt(incepDate[0]));
        var expDate = this.commonModel.expiryDate.split('/');
        var expiryDate = new Date((parseInt(expDate[2])), parseInt(expDate[1]) - 1, parseInt(expDate[0]));
        /*var incepDate = this.commonModel.inceptionDate.split(" ")[0];
        var expiryDate = this.commonModel.expiryDate;
        var start = moment(incepDate);
        var end = moment(this.commonModel.expiryDate);
        var dd = end.diff(start, "days");*/
        var start = inceptionDate.getTime();
        var end = expiryDate.getTime();

    }

    basicDetailsSubmit(formValues, isValid: boolean) {
        if (!isValid) {
            this.validateAllFields(formValues.form);
            this.showValidationMsgs = true;
        } else {
            this.showHomeDetails();
        }
    }

    showAgentLookup() {
        this.commonModel.lookupAgentName = "";
        this.commonModel.lookupAgentCode = "";
        this.agents = [];
        if (undefined == this.commonModel.inceptionDate || this.commonModel.inceptionDate.length == 0) {
            this.messageService.add({ severity: 'warn', summary: 'Inception Date is mandatory.', detail: '' });
            return;
        }
        this.showAgentModalDialog = true;
    }

    agentLookupSearch() {
        this.agents = [];
        this.policyDetailsModel.policyDetails.agentCode = '';
        this.policyDetailsModel.policyDetails.agentName = '';
        this.commonModel.agentName = '';
        if (this.commonModel.lookupAgentName.length == 0 && this.commonModel.lookupAgentCode.length == 0) {
            this.messageService.add({ severity: 'warn', summary: 'Please Enter Agent Code Or Name.', detail: '' });
            return;
        }
        try {
            this.dataService.getPolicyService().loadAgentsForLookup(this.commonModel.lookupAgentName,
                this.commonModel.lookupAgentCode, this.policyDetailsModel.policyDetails.transactionType).subscribe(result => {
                    var agentsArr = JSON.parse(JSON.stringify(result));
                    for (var i = 0; i < agentsArr.length; i++) {
                        this.agents.push(new AgentLookupModel(agentsArr[i].value, agentsArr[i].key));
                    }
                    this.dataListModule.handleDataChange();

                });
        } catch (e) {
            this.messageService.add({ severity: 'error', summary: 'Error Occured', detail: e });
        }
    }

    showExternalCovernotes() {
        this.showExternalCoverNotes = true;
    }

    clearExternalCovernotes() {
        this.commonModel.ecovernoteNumber = '';
        this.commonModel.engineNumber = '';
        this.commonModel.chassisNumber = '';
        this.commonModel.registrationNumber = '';
        this.commonModel.tokenNumber = '';
    }

    searchExternalCovernotes() {
        if ((null == this.commonModel.ecovernoteNumber || undefined == this.commonModel.ecovernoteNumber ||
            this.commonModel.ecovernoteNumber == '') && (null == this.commonModel.engineNumber || undefined == this.commonModel.engineNumber ||
                this.commonModel.engineNumber == '') && (null == this.commonModel.chassisNumber || undefined == this.commonModel.chassisNumber ||
                    this.commonModel.chassisNumber == '') && (null == this.commonModel.registrationNumber || undefined == this.commonModel.registrationNumber ||
                        this.commonModel.registrationNumber == '') && (null == this.commonModel.tokenNumber || undefined == this.commonModel.tokenNumber ||
                            this.commonModel.tokenNumber == '')) {
            this.messageService.add({
                severity: 'warn', summary: 'Please provide Ecovernote Number, Engine Number, Chassis Number, Registration Number, Token Number',
                detail: ''
            });
            return;
        }

        this.externalCovernotesList = [];
        this.dataService.getPolicyService().loadExternalCovernotes(this.commonModel.ecovernoteNumber, this.commonModel.engineNumber,
            this.commonModel.chassisNumber, this.commonModel.registrationNumber, this.commonModel.tokenNumber).subscribe(result => {
                var ecnArr = JSON.parse(JSON.stringify(result));
                for (var i = 0; i < ecnArr.length; i++) {
                    this.externalCovernotesList.push(new ExternalCovernotes(ecnArr[i].covernoteNumber, ecnArr[i].engineNumber, ecnArr[i].chassisNumber,
                        ecnArr[i].registrationNumber, ecnArr[i].customerName, ecnArr[i].commencementDate, ecnArr[i].commencementTime, ecnArr[i].customerMobileNumber,
                        ecnArr[i].smsReceivedDateAndTime, ecnArr[i].tokenNumber));
                }
                this.ecnLookupDataList.handleDataChange();

            });
    }

    filterBranches(obj: string) {
        if (this.branches.length == 0) {
            this.messageService.add({ severity: 'warn', summary: 'Please agent to load branches', detail: '' });
            return;
        }
        this.filteredBranches = [];
        for (var i = 0; i < this.branches.length; i++) {
            if (this.branches[i].toString().toLowerCase().indexOf(obj.toString().toLowerCase()) > -1) {
                this.filteredBranches.push(this.branches[i]);
            }
        }
    }

    filterCoverNotes(obj: string) {
        this.filteredcoverNoteList = [];
        for (var i = 0; i < this.coverNoteList.length; i++) {
            if (this.coverNoteList[i].toString().toLowerCase().indexOf(obj.toString().toLowerCase()) > -1) {
                this.filteredcoverNoteList.push(this.coverNoteList[i]);
            }
        }
    }

    filterCities(obj: string) {
        this.filteredCities = [];
        for (var i = 0; i < this.cities.length; i++) {
            if (this.cities[i].toString().toLowerCase().indexOf(obj.toString().toLowerCase()) > -1) {
                this.filteredCities.push(this.cities[i]);
            }
        }
    }

    filterNomineeCities(obj: string) {
        this.filteredNomineeCities = [];
        for (var i = 0; i < this.cities.length; i++) {
            if (this.cities[i].toString().toLowerCase().indexOf(obj.toString().toLowerCase()) > -1) {
                this.filteredNomineeCities.push(this.cities[i]);
            }
        }
    }

    filterOccupation(obj: string) {
        this.filteredOccupations = [];
        for (var i = 0; i < this.occupations.length; i++) {
            if (this.occupations[i].toString().toLowerCase().indexOf(obj.toString().toLowerCase()) > -1) {
                this.filteredOccupations.push(this.occupations[i]);
            }
        }
    }

    filterRepositoryName(obj: string) {
        this.filterIRL = [];
        for (var i = 0; i < this.insuranceRepositoriesList.length; i++) {
            if (this.insuranceRepositoriesList[i].toString().toLowerCase().indexOf(obj.toString().toLowerCase()) > -1) {
                this.filterIRL.push(this.insuranceRepositoriesList[i]);
            }
        }
    }

    filterNomineeRelationship(obj: string) {
        this.filteredNomineeRelationship = [];
        for (var i = 0; i < this.nomineeRelationship.length; i++) {
            if (this.nomineeRelationship[i].toString().toLowerCase().indexOf(obj.toString().toLowerCase()) > -1) {
                this.filteredNomineeRelationship.push(this.nomineeRelationship[i]);
            }
        }
    }
    filterBdoCodes(obj: string) {
        this.filteredBdoCodes = [];
        for (var i = 0; i < this.bdoCodes.length; i++) {
            if (this.bdoCodes[i].toString().toLowerCase().indexOf(obj.toString().toLowerCase()) > -1) {
                this.filteredBdoCodes.push(this.bdoCodes[i]);
            }
        }
    }

    filterPosAgentDetails(obj: string) {
        this.filteredPosAgentDetails = [];
        for (var i = 0; i < this.posAgentDetails.length; i++) {
            if (this.posAgentDetails[i].toString().toLowerCase().indexOf(obj.toString().toLowerCase()) > -1) {
                this.filteredPosAgentDetails.push(this.posAgentDetails[i]);
            }
        }
    }

    validateGardianDOB(obj) {
        if (null != obj) {
            var currentDate = new Date();
            var spDate = moment(obj).format('YYYY/MM/DD').split('/');
            if ((currentDate.getFullYear() - parseInt(spDate[0])) < 18) {
                this.messageService.add({ severity: 'warn', summary: 'Guardian Date Of Birth  can not be less than 18.', detail: '' });
                this.policyDetailsModel.policyDetails.proposerDetails.guardianDob = '';
            }
        }
    }

    setCovernoteNumValidation(basicDetailsForm: NgForm, obj: boolean) {
        var formCtrl = basicDetailsForm;
        if (!obj) {
            formCtrl.controls["coverNoteNumber"].setErrors({ 'required': true });
        } else {
            formCtrl.controls["coverNoteNumber"].setErrors({ 'required': false });
        }
        if (this.coverNoteList.length == 0) {
            this.messageService.add({ severity: 'warn', summary: 'Please select Branch to load covernotes ', detail: '' });
        }
    }

    callBackToSetPoliticallyExposed(flag) {
        if (flag) {
            this.policyDetailsModel.policyDetails.proposerDetails.vipFlag = 'YES';
        } else {
            this.policyDetailsModel.policyDetails.proposerDetails.vipFlag = '';
        }
    }

    setMailValidation(basicDetailsForm: NgForm, obj: boolean) {
        var formCtrl = basicDetailsForm;
        if (!obj) {
            formCtrl.controls["email"].setErrors({ 'required': true });
        } else {
            formCtrl.controls["email"].setErrors({ 'required': false });
        }
    }

    validateDOB(obj) {
        if (null != obj) {
            let dob = moment(obj, 'DD/MM/YYYY');
            let difference = moment().diff(dob, 'years');

            if (difference < 19) {
                this.messageService.add({ severity: 'warn', summary: 'Proposer Age Should be Greater Than 19 Years', detail: '' });
                this.timeout5 = setTimeout(() => {
                    this.commonModel.dateOfBirth = '';
                    this.policyDetailsModel.policyDetails.proposerDetails.dateOfBirth = '';
                }, 0);
            }
            else if (difference > 99) {
                this.messageService.add({ severity: 'warn', summary: 'Proposer Age Should not Greater Than 99 Years', detail: '' });
                this.timeout6 = setTimeout(() => {
                    this.commonModel.dateOfBirth = '';
                    this.policyDetailsModel.policyDetails.proposerDetails.dateOfBirth = '';
                }, 0);
            }
        }
    }

    validateGuardianDOB(obj) {
        if (null != obj) {
            let dob = moment(obj, 'DD/MM/YYYY');
            let difference = moment().diff(dob, 'years');

            if (difference < 19) {
                this.messageService.add({ severity: 'warn', summary: 'Guardian Age Should be Greater Than 19 Years', detail: '' });
                this.timeout7 = setTimeout(() => {
                    this.commonModel.dateOfBirth = '';
                    this.policyDetailsModel.policyDetails.proposerDetails.guardianDob = '';
                }, 0);
            }
            else if (difference > 99) {
                this.messageService.add({ severity: 'warn', summary: 'Guardian Age Should not Greater Than 99 Years', detail: '' });
                this.timeout8 = setTimeout(() => {
                    this.commonModel.dateOfBirth = '';
                    this.policyDetailsModel.policyDetails.proposerDetails.guardianDob = '';
                }, 0);
            }
        }
    }

    removeModelFromSession() {
        this.modelDataService.removeModel("policyDetailsModel");
        this.modelDataService.removeModel("agentDetails");
        this.modelDataService.removeModel("commonModel");
        this.modelDataService.removeModel("oaAgentDetails");
    }

    validateProofValues(basicDetailsForm: NgForm) {
        var formCtrl = basicDetailsForm;
        let idProof = formCtrl.controls['idProof'].value;
        let idRefNumber = formCtrl.controls['idRefNumber'].value;
        let residenceProof = formCtrl.controls['residenceProof'].value;
        let residenceRefNumber = formCtrl.controls['residenceRefNumber'].value;
        if ((idProof == '' || idProof == null || idProof == undefined) && (idRefNumber != '' && idRefNumber != null && idRefNumber != undefined)) {
            this.setValidation(basicDetailsForm, 'idProof', true, null);
        }
        if (idProof == 'PAN CARD') {
            let regExp = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/ig;
            if (!regExp.test(formCtrl.controls['idRefNumber'].value)) {
                this.setValidation(basicDetailsForm, 'idRefNumber', true, '^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$');
            }
        }
        if (idProof == 'PassPort') {
            let regExp = /^[A-PR-WY][1-9]\d\s?\d{4}[1-9]$/ig;
            if (!regExp.test(formCtrl.controls['idRefNumber'].value)) {
                this.setValidation(basicDetailsForm, 'idRefNumber', true, '^[A-PR-WY][1-9]\d\s?\d{4}[1-9]$');
            }
        }
        if ((residenceProof == '' || residenceProof == null || residenceProof == undefined) && (residenceRefNumber != '' && residenceRefNumber != null && residenceRefNumber != undefined)) {
            this.setValidation(basicDetailsForm, 'residenceProof', true, null);
        }
        if (residenceProof == 'electricity') {
            this.setValidation(basicDetailsForm, 'residenceRefNumber', true, null);
        }
    }

    validateProofIds(basicDetailsForm: NgForm) {
        var formCtrl = basicDetailsForm;
        let idRefNumber = formCtrl.controls['idRefNumber'].value;
        let residenceRefNumber = formCtrl.controls['residenceRefNumber'].value;
        if (idRefNumber != '' && idRefNumber != null && idRefNumber != undefined) {
            let idproof = formCtrl.controls['idProof'].value;
            if (idproof == '' || idproof == null || idproof == undefined) {
                this.setValidation(basicDetailsForm, 'idProof', true, null);
            }
        }
        if (residenceRefNumber != '' && residenceRefNumber != null && residenceRefNumber != undefined) {
            let residenceProof = formCtrl.controls['residenceProof'].value;
            if (residenceProof == '' || residenceProof == null || residenceProof == undefined) {
                this.setValidation(basicDetailsForm, 'residenceProof', true, null);
            }
        }
    }

    setValidation(coveragesForm: NgForm, elementName: string, addValidation: boolean, pattern: string) {
        var formCtrl = coveragesForm;
        Object.keys(formCtrl.controls).forEach(key => {
            if (elementName == key) {

                if (addValidation) {
                    if (null == pattern) {
                        formCtrl.controls[key].setValidators([Validators.required]);
                    } else {
                        formCtrl.controls[key].setValidators([Validators.required, Validators.pattern(pattern)]);
                    }

                } else {
                    formCtrl.controls[key].setValidators([]);
                }
                formCtrl.controls[key].updateValueAndValidity();
                return;
            }

        });
    }

    loadIdentityProofs() {
        this.dataService.getPolicyService().loadIdentityProofs(this.commonModel.inceptionDate).subscribe(result => {
            this.identityProofs = result;
        });
    }

    loadResidenceProofs() {
        this.dataService.getPolicyService().loadResidenceProofs(this.commonModel.inceptionDate).subscribe(result => {
            this.residenceProofs = result;
        });
    }

    validateReceiptDate() {
        if (null != this.policyDetailsModel.policyDetails.receiptDate) {
            var incepDate = this.policyDetailsModel.policyDetails.inceptionDate.split(" ")[0].split('/');
            var inceptionDate = new Date((parseInt(incepDate[2])), parseInt(incepDate[1]) - 1, parseInt(incepDate[0]));
            var receiptDate = this.policyDetailsModel.policyDetails.receiptDate.split('/');
            var obj = new Date((parseInt(receiptDate[2])), parseInt(receiptDate[1]) - 1, parseInt(receiptDate[0]));
            var currentDate = new Date();
            if (obj.getTime() > inceptionDate.getTime()) {
                this.messageService.add({ severity: 'warn', summary: 'Receipt Date should not be greater than Inception Date', detail: '' });
                this.timeout9 = setTimeout(() => {
                    this.policyDetailsModel.policyDetails.receiptDate = '';
                });
                this.basicDetailsForm.get(`receiptDate`).reset();
            } else if (this.policyDetailsModel.policyDetails.combiCampaignSelected) {
                var combiincepDate = this.policyDetailsModel.policyDetails.combiInceptionDate.split(" ")[0].split('/');
                var combiinceptionDate = new Date((parseInt(combiincepDate[2])), parseInt(combiincepDate[1]) - 1, parseInt(combiincepDate[0]));
                if (obj.getTime() > combiinceptionDate.getTime()) {
                    this.messageService.add({ severity: 'warn', summary: 'Receipt Date should not be greater than Combi Policy Inception Date', detail: '' });
                    this.timeout10 = setTimeout(() => {
                        this.policyDetailsModel.policyDetails.receiptDate = '';
                    });
                }
            }
        }
    }

    loadAdditionalInfo() {
        let agentName = "";
        let prdName = "";
        if (this.commonModel.agentName != null && this.commonModel.agentName != '' && this.commonModel.agentName != undefined) {
            agentName = this.commonModel.agentName.split("-")[1];
        } if (this.policyDetailsModel.policyDetails.productName != null && this.policyDetailsModel.policyDetails.productName != '' && this.policyDetailsModel.policyDetails.productName != undefined) {
            prdName = this.policyDetailsModel.policyDetails.productName.split("-")[0];
        }
        if (agentName != "" && agentName != null && agentName != undefined && prdName != "" && prdName != null && prdName != undefined) {
            this.dataService.getPolicyService().loadAdditionalInfo(this.commonModel.agentName.split("-")[1], prdName).subscribe(result => {
                this.agentCampaignAddiInfo = result;
                if (result.length == 0) {
                    this.policyDetailsModel.policyDetails.additionalInfos.additionalInfo = [];
                    this.policyDetailsModel.policyDetails.additionalInfos.additionalInfo = this.campaignDetails.additionalInfos;
                } else {
                    this.policyDetailsModel.policyDetails.additionalInfos.additionalInfo = [];
                    this.policyDetailsModel.policyDetails.additionalInfos.additionalInfo = this.agentCampaignAddiInfo;
                }
            });
        }
    }

    isAddressSame(event) {

        if (event.target.checked) {
            this.policyDetailsModel.policyDetails.proposerDetails.nomineeAddress1 = this.policyDetailsModel.policyDetails.proposerDetails.address1;
            this.policyDetailsModel.policyDetails.proposerDetails.nomineeAddress2 = this.policyDetailsModel.policyDetails.proposerDetails.address2;
            this.policyDetailsModel.policyDetails.proposerDetails.nomineeAddress3 = this.policyDetailsModel.policyDetails.proposerDetails.address3;
            this.policyDetailsModel.policyDetails.proposerDetails.nomineeAddress4 = this.policyDetailsModel.policyDetails.proposerDetails.address4;
            this.policyDetailsModel.policyDetails.proposerDetails.nomineeCity = this.policyDetailsModel.policyDetails.proposerDetails.city;
            this.policyDetailsModel.policyDetails.proposerDetails.nomineeState = this.policyDetailsModel.policyDetails.proposerDetails.state;
            this.policyDetailsModel.policyDetails.proposerDetails.nomineePincode = this.policyDetailsModel.policyDetails.proposerDetails.pinCode;
        }
        else {
            this.policyDetailsModel.policyDetails.proposerDetails.nomineeAddress1 = '';
            this.policyDetailsModel.policyDetails.proposerDetails.nomineeAddress2 = '';
            this.policyDetailsModel.policyDetails.proposerDetails.nomineeAddress3 = '';
            this.policyDetailsModel.policyDetails.proposerDetails.nomineeAddress4 = '';
            this.policyDetailsModel.policyDetails.proposerDetails.nomineeCity = '';
            this.policyDetailsModel.policyDetails.proposerDetails.nomineeState = '';
            this.policyDetailsModel.policyDetails.proposerDetails.nomineePincode = '';
        }
    }

    // getPreExistingAilments(obj, index) {
    //     if (obj == "Yes") {
    //       this.loadPreAilments();
    //     } else {
    //       //this.preailmentsNo = [];
    //       //this.preailmentsNo.push("NONE");
    //       //this.policyDetailsModel.policyDetails.riskDetails[index].healthInsured.preExistingAilments = 'NONE';
    //     }
    // }
    // loadPreAilments() {
    //     this.preailments = [];
    //     this.dataService.getPolicyService().loadPreAilments().subscribe(result => {
    //       this.preailments = result;
    //     });
    // }

    ngOnDestroy() {
        clearTimeout(this.timeout10);
        clearTimeout(this.timeout9);
        clearTimeout(this.timeout8);
        clearTimeout(this.timeout7);
        clearTimeout(this.timeout6);
        clearTimeout(this.timeout5);
        clearTimeout(this.timeout4);
        clearTimeout(this.timeout3);
        clearTimeout(this.timeout2);
        clearTimeout(this.timeout1);
    }

}
