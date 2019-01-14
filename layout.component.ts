import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, NavigationError, ActivatedRoute, NavigationCancel } from '@angular/router';
import { Globals } from 'app/globals';
import { DITService } from 'app/dit/dit.service';
import { InwardDetails, Comments } from 'app/dit/dit-create-inward/dit-create-inward.model';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormControl } from '@angular/forms';
import * as moment from 'moment'
import { FormGroup } from '@angular/forms';
import { ISubscription } from "rxjs/Subscription";

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html'
})
export class LayoutComponent implements OnInit, OnDestroy {
    StatusSer: ISubscription;
    getUploadSer: ISubscription;
    sendToInfoSer: ISubscription;
    InwardSummary: ISubscription;
    createInwardsSer: ISubscription;
    routerParam: ISubscription;


    fromSummary: any;
    documentPanelWidth: string;
    showDocumentPanel: boolean = true;
    hidedocumentscreen: boolean = true;
    indexvalue: any;
    ominiDocsUrl: string;
    url: string;
    phase: string;
    showAgentModalDialog: boolean;
    processType: any;
    proposalCode: any;
    proposalId: any;
    inwardId: any;
    ngZone: any;
    iframe: boolean = false;
    status: boolean = false;
    inwardDetailsDto: any;
    reasonsList: any;
    @ViewChild('infoPendingReasonsForm') infoPendingReasonsForm: NgForm;
    commentsList: Array<Comments> = [new Comments()];

    inwardDetails: InwardDetails = new InwardDetails();
    public from: string = '';

    public timeout1: any;
    uploadedDocuments: any = null;
    constructor(private route: ActivatedRoute, private ditService: DITService, public router: Router, private globals: Globals) {
        this.showDocumentPanel = true;
        this.StatusSer = this.route.queryParams
            .subscribe(params => {

                this.inwardId = params['inwardId'];
                this.proposalId = params['proposalId'];
                this.proposalCode = params['proposalCode'];
                this.indexvalue = params['indexvalue'];
                this.fromSummary = params['fromSummary'];
                this.processType = this.fromSummary

                if (window.location.pathname.includes("dit")) {
                    sessionStorage.removeItem("SplitScrrenDITStatusModel");
                    this.status = false
                    this.showDocumentPanel = false;
                    this.hidedocumentscreen=true;
                    this.StylesToBeapplied();
                }
                else if (params.status == 'fromDIT' || params.from == 'dit' ||params.from == 'medicaluwpending' || (params.from == 'search' && this.proposalCode)) {
                    if(this.hidedocumentscreen){
                        this.showDocumentPanel = true;
                    }
                    this.status = true;
                    this.StylesToBeapplied();
                } else if (params.status == 'edit' && this.proposalCode) {
                    this.status = true;
                    this.StylesToBeapplied();
                }
                else if(window.location.pathname.includes("dashboard")){
                    sessionStorage.removeItem("SplitScrrenDITStatusModel");
                    this.status = false
                    this.showDocumentPanel = false;
                    this.hidedocumentscreen = true;
                    this.StylesToBeapplied();
                    this.hideSideMenu();
                }


                else if (sessionStorage.getItem("SplitScrrenDITStatusModel") == "true") {
                    this.status = true;
                    this.StylesToBeapplied();
                }
                else {
                    setTimeout(() => {
                        this.status = false
                        this.showDocumentPanel = false; //for normal flow panel should be 100%
                        this.StylesToBeapplied();
                    }, 0);
                }

                if (window.location.pathname.includes("payment")) {
                    setTimeout(() => {
                        $(".header").hide();
                        $(".side-navbar").hide();
                        $(".main-footer").hide();
                        //  $(".page")[0].style.width='100%'
                        $('.page').addClass('paymentWidth');
                    }, 0)
                }
                else {
                    setTimeout(() => {
                        $(".header").show();
                        $(".side-navbar").show();
                        $(".main-footer").show();
                        $('.page').removeClass('paymentWidth');
                    }, 0);
                }

                if (this.processType == '' || this.processType == undefined) {
                    this.processType = 'search';
                }
                if ((this.inwardId && this.proposalId && this.proposalCode) || (sessionStorage.getItem("SplitScrrenDITStatusModel") == "true")) {
                    if (this.inwardDetails && this.inwardDetails.inwardCode && this.inwardDetails.inwardProposal) {
                    }
                    else {
                        this.getInwardDetails();
                    }

                }

            });


        this.routerParam = router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                //   $('#loadingScreen').addClass('d-block');
                if (!event.url.includes('travelinsurance')) {
                    sessionStorage.removeItem('policydetails');
                    sessionStorage.removeItem('issuePolicy');
                    sessionStorage.removeItem('travelCoverages');
                    sessionStorage.removeItem('insuredDetails');
                    sessionStorage.removeItem('travelPolicyDetail');
                }
            }

            if (event instanceof NavigationEnd) {
                //    $('#loadingScreen').removeClass('d-block');
                window.scrollTo(0, 0);
                $('.page.home-page').hide();
                this.timeout1 = setTimeout(() => {
                    $('.page.home-page').show();
                }, 0);

                this.StylesToBeapplied();
            }
            if (event instanceof NavigationError) {
                //  $('#loadingScreen').removeClass('d-block');
            }
            if (event instanceof NavigationCancel) {
                // $('#loadingScreen').removeClass('d-block');
            }
        });


        if (window.frameElement) {
            this.iframe = false;
            //  $('.page.home-page')[0].style.width = '240px';
        }
        else {
            this.iframe = false;
        }
    }

    ngAfterViewInit() {
        if (window.frameElement) {
            $('.page.home-page')[0].style.width = '100%';
        }
        else {
        }

        this.StylesToBeapplied();
    }

    StylesToBeapplied() {
        if (this.showDocumentPanel && this.status) {
            setTimeout(() => {
                this.applyIframeStyles();
            }, 0);
        } else {
            setTimeout(() => {
                this.resetToMainStyles();
            }, 0);
        }
    }

    applyIframeStyles() {


        $(`<style id="customFrameStyles">
            .col-lg-4, .col-4 {
                flex: 0 0 50% !important;
                max-width: 50% !important;
            }
            #paymentDitstyles.col-lg-6, #paymentDitstyles.col-lg-3 , #paymentDitstyles.col-md-3, #paymentDitstyles.col-lg-6 .col-lg-6 {
                flex: 0 0 100% !important;
                max-width: 100% !important;
            }

            #healthsummarypremium.col-md-6 {
                flex: 0 0 100% !important;
                max-width: 100% !important;
            }

            #healthsummarypremium.col-md-6 .col-4{
                flex: 0 0 33.333333% !important;
                max-width: 33.333333% !important;
            }

            #accordiansInSplit .ui-accordion {
                width: 67% !important;
            }
            
            </style>` ).appendTo("head");

        $('.col-lg-3.qDetailsBlock').addClass('custom-hidden');
        $('#quoteBlock .col-lg-9').addClass('col-lg-12').removeClass('col-lg-9');
        $('.col-lg-3.qDetailsBlock').removeClass('d-lg-block');


    }

    resetToMainStyles() {

        $('.col-lg-3.qDetailsBlock').removeClass('custom-hidden');
        $('#quoteBlock .col-lg-12').addClass('col-lg-9').removeClass('col-lg-12');
        $(".add").css("max-width", '100%');
        $('.col-lg-3.qDetailsBlock').removeClass('d-none');
        $('.bottombuttons').removeClass('pull-left');
        $("style#customFrameStyles").empty();


        // $(`<style id="customFrameStyles">
        //             .col-lg-4, .col-4 {
        //                 flex: 0 0 33% !important;
        //                 max-width: 33% !important;
        //             }

        //             #paymentDitstyles.col-lg-6 ,#paymentDitstyles.col-lg-6 .col-lg-6 {
        //                 flex: 0 0 50% !important;
        //                 max-width: 50% !important;
        //             }

        //             #paymentDitstyles.col-md-3 {
        //                 flex: 0 0 25% !important;
        //                 max-width: 25% !important;
        //             }

        //             #paymentDitstyles.col-lg-3{
        //                 flex: 0 0 25% !important;
        //                 max-width: 25% !important;
        //             }

        //             #healthsummarypremium.col-md-6{
        //                 flex: 0 0 50% !important;
        //                 max-width: 50% !important;
        //             }

        //             #healthsummarypremium.col-md-6 .col-4{
        //                 flex: 0 0 33.333333% !important;
        //                 max-width: 33.333333% !important;
        //             }
        //             #accordiansInSplit .ui-accordion {
        //                 width: 100% !important;
        //             }
        //             .col-xl-3 {
        //                 flex: 0 0 25% !important;
        //                 max-width: 25% !important;
        //             }
        //             </style>` ).appendTo("head");


    }

    ngOnInit() {
        this.from = this.globals.FROM;
        if (this.router.url === '/') {
            this.router.navigate(['/dashboard']);
        }
        if (this.status == true) {
            setTimeout(() => {
                $('nav.side-navbar').toggleClass('shrink');
                $('.page').toggleClass('active shrinkpoint');
            }, 0);

        }
    }

    getInwardDetails() {
        let isCreate = false;
        if (this.processType == 'create') {
            isCreate = true;
        }
        this.createInwardsSer = this.ditService.getInwardDetails(this.inwardId, this.proposalId, this.proposalCode, isCreate)
            .subscribe((data) => {
                this.inwardDetails = data;
                this.inwardDetailsDto = { inwardDetails: data };
                this.commentsList = JSON.parse(JSON.stringify(this.inwardDetails.inwardProposals[0].inwardProposarComments));
                this.commentsList.push(new Comments());
                //$("#testDiv").attr("data", this.ominiDocsUrl);
                // $("#testDiv").load(this.ominiDocsUrl);

                this.ditService.getInfopendingReasons(true, this.inwardDetails.inwardProposals[0].proposarCode, this.inwardId)
                    .subscribe((data) => {
                        this.reasonsList = data.reasons;
                    });
                if (this.uploadedDocuments && this.uploadedDocuments.scanDocuments && this.uploadedDocuments.scanDocuments.length > 0) {
                }
                else {
                    this.ominiDocsUrl = `${this.globals.OMNIURLPREFIX}Application=RSA_retrieve_DIT&DataClassName=RSA&DC.InwardCode=${this.inwardDetails.inwardCode}&DC.ProposalCode=${this.inwardDetails.inwardProposals[this.indexvalue].proposarCode}`;
                    this.getUploadedDocuments();
                }
                this.commentsList = JSON.parse(JSON.stringify(this.inwardDetails.inwardProposals[0].inwardProposarComments));
                this.commentsList.push(new Comments());
            });


    }


    onAddNewComments() {
        this.commentsList.push(new Comments());
    }

    onRemoveComment(index) {
        this.commentsList.splice(index, 1);
    }

    onClickProcessInXgen() {
        this.url = 'http://firstgenv5lb.ind.rsa-ins.com/FirstGen/WuiLoginScreen.action';
        window.open(this.url);
        // this.phase = 'inprocess';
        // this.processInXgenEnabled = true;

    }

    onClickProcessToEpass(i) {
        // this.onClickInProcess('Process', i, false);
        // this.processInXgenEnabled = false;
    }

    onNextClick() {
        this.inwardDetailsDto.userDetails = this.globals.USERDTO;
        this.InwardSummary = this.ditService.inwardSummaryPage(this.inwardId, this.proposalCode)
            .subscribe((data) => {
                // this.showIframe = false;
                this.phase = '';
                this.router.navigate(['dit/summary', this.inwardId, this.proposalId, this.proposalCode], { queryParams: { from: 'next' } })
            });
    }

    onClickInProcess(actionType, i, fromXgen) {

        // this.getUploadedDocuments();
        //this.hideSideMenu();
        if (actionType == 'MarkAsInfoPending') {
            let isCreate = false;
            if (this.processType == 'create') {
                isCreate = true;
            }
            var body = {
                "isCreate": isCreate,
                "inwardNumber": "",
                "proposalNumber": this.proposalCode,
                "inwardId": this.inwardId,
                "proposalId": "",
                "userName": JSON.parse(sessionStorage.getItem('currentUser')).username

            };

            this.showAgentLookup();
        }


    }

    showAgentLookup() {
        this.showAgentModalDialog = true;
    }

    submitReason(reasonTypes: FormControl, reasons: FormControl) {
        if (this.infoPendingReasonsForm.form.valid) {
            this.commentsList.forEach((item, index) => {
                item.commentDate = moment().format('MM/DD/YYYY').toString();
                item.status = 'open';
            });
            this.sendToInfoSer = this.ditService.sendToInfoPending(this.inwardId, this.commentsList, this.proposalCode)
                .subscribe((data) => {
                    this.showAgentModalDialog = false;

                    this.router.navigate(['dit/summary', this.inwardId, this.proposalId, this.proposalCode], { queryParams: { from: 'next' } })
                });


        } else {
            this.validateAllFields(this.infoPendingReasonsForm.form);
        }

    }
    validateAllFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.controls[field];
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFields(control);
            }
        });
    }

    getUploadedDocuments() {
        this.showDocumentPanel = true;
        this.documentPanelWidth = '50%';
        this.getUploadSer = this.ditService.getUploadedDocuments(this.inwardDetails.inwardProposals[0].proposarCode).subscribe((data) => {
            this.uploadedDocuments = data;
            this.uploadedDocuments.scanDocuments = data.scanDocuments;
            if (data.scanDocuments.length > 0) {
                this.showDocumentPanel = true;
                this.documentPanelWidth = '50%';
                this.hidedocumentscreen = true;
            }
            else {
                this.hidedocumentscreen = false;
                this.showDocumentPanel = false;
                this.documentPanelWidth = '100%';

            }
            this.StylesToBeapplied();
        });
    }


    closeDocumentPanel() {
        this.hidedocumentscreen = false;
        this.showDocumentPanel = false;
        this.StylesToBeapplied();

    }

    hideSideMenu() {
        if ($(window).outerWidth() > 1194) {
            $('nav.side-navbar').removeClass('shrink');
            $('.page').removeClass('active shrinkpoint');
        } 
      }


    ngOnDestroy() {
        clearTimeout(this.timeout1);
        if (this.StatusSer) {
            this.StatusSer.unsubscribe();
        }
        if (this.getUploadSer) {
            this.getUploadSer.unsubscribe();
        }
        if (this.sendToInfoSer) {
            this.sendToInfoSer.unsubscribe();
        }
        if (this.InwardSummary) {
            this.InwardSummary.unsubscribe();
        }
        if (this.createInwardsSer) {
            this.createInwardsSer.unsubscribe();
        }
        if (this.routerParam) {
            this.routerParam.unsubscribe();
        }

    }


}
