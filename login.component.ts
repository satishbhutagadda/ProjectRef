import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service'
import { ActivatedRoute, Router, Params } from '@angular/router'
import { IUser } from './user.model';
import { Globals } from '../globals';
import 'rxjs/add/operator/map';
import { InterceptedHttp } from 'app/users/http.interceptor';
import * as moment from 'moment'
import { OnDestroy } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
@Component({
  templateUrl: './login.html',
  styles: [`
    em {float:right; color:#E05C65; padding-left:10px;}
  `]
})
export class LoginComponent implements OnInit, OnDestroy {
  loginSer: ISubscription;
  oauthtokenSer: ISubscription;
  loginuserSer: ISubscription;
  oauthSer: ISubscription;
  routeSub: ISubscription;
  timeout2: NodeJS.Timer;
  timeout1: NodeJS.Timer;


  partnerId: any = '';
  partnerPwd: any = '';
  smId: any = '';
  smState: any = '';
  smIPadd: any = '';
  loadingText: string;
  public RSALOGO = require("../img/RSA-Logo.png");

  public from: string = "";
  public createdBy: string = "";
  public policyId: string = "";
  public productName: string = "";
  public password: string = "";
  public proposalCode: string = "";
  public loginForm: FormGroup;
  public ditRoles: string[] = [];

  constructor(private loginService: LoginService, private router: Router, private globals: Globals, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.ditRoles = ['ROLE_DIT_INWARD',
      'ROLE_DIT_SCAN',
      'ROLE_DIT_PROCESS',
      'ROLE_DIT_DISPATCH',
      'ROLE_DIT_QC',
      'ROLE_PROCESSLIFELINE',
      'ROLE_DIT_SUPERVISOR',
      'ROLE_DIT_FINANCE',
      'ROLE_COMMERCIAL',
      'ROLE_POSTPOLICYSCAN',
      'ROLE_DIT_ENQUIRY',
      'ROLE_DIT_SCB_ENQUIRY',
      'ROLE_BULKSCAN',
      'ROLE_CMSDMS',
      'ROLE_CITI_DIT',
      'ROLE_DBS_DIT'];
    // if (JSON.parse(sessionStorage.getItem("currentUser"))) {
    //   this.router.navigateByUrl('/dashboard');
    // }
    sessionStorage.clear();
  }

  ngOnInit() {
    this.routeSub = this.route.queryParams.subscribe(
      params => {
        this.from = params['from'];
        this.policyId = params['id'];
        this.createdBy = params['userName'];
        this.productName = params['prodName'];
        this.password = params['pd'];
        this.proposalCode = params['proposalCode'];

        this.partnerId = params['partnerId'];
        this.partnerPwd = params['partnerPwd'];
        this.smId = params['smId'];
        this.smState = params['smState'];
        this.smIPadd = params['smIPadd'];
        if (this.createdBy) {
          this.globals.userName = this.createdBy;
          this.globals.passWord = this.password;
          sessionStorage.setItem("username", this.createdBy);
          sessionStorage.setItem("password", this.password);
        }

        if (this.from == 'eapps') {
          $('#loginPage').css({ 'display': 'none' });
          let sahajDetails = {
            partnerId: this.partnerId,
            partnerPwd: this.partnerPwd,
            smId: this.smId,
            smState: this.smState,
            smIPadd: this.smIPadd
          }
          sessionStorage.setItem('sahajDetails', JSON.stringify(sahajDetails));
        }
        else {
          $('#loginPage').css({ 'display': 'block' });
        }
      }
    );

    this.loginForm = this.formBuilder.group({
      uName: ['', Validators.required],
      pWord: ['', Validators.required],
    });

    if (this.from == 'dit' || this.from == 'eapps') {
      this.checkLoginInConstructor();
    }
  }

  checkLoginInConstructor() {
    if (this.globals.USEOAUTH) {
      this.oauthSer = this.loginService.oauthToken(this.createdBy, this.password).subscribe(resp => {
        if (resp) {
          let expiringTime = moment().add(Number(JSON.parse(resp).expires_in), 'seconds').unix().toString();
          sessionStorage.setItem("token", resp);
          sessionStorage.setItem("tokentime", expiringTime);

          this.loginWithEapps();

        }
      });
    } else {
      this.loginWithEapps();
    }
  }

  loginWithEapps() {
    this.loadinTextLogicStart();
    this.loginuserSer = this.loginService.loginUser(this.createdBy, this.password).subscribe(resp => {
      this.loadinTextLogicEnd();
      if (resp) {
        if (resp != "Bad credentials" && resp != "User account has Expired" && !resp.includes("User account is locked, Reason")) {
          this.globals.loginInvalidMsg = "";
          this.globals.loginInvalid = false;
          sessionStorage.setItem('currentUser', resp);
          sessionStorage.setItem('from', this.from);
          this.setuserdto();
          this.globals.FROM = this.from;
          let ditRole = false;
          this.globals.USERDTO.roles.forEach((item) => {
            if (!ditRole) {
              this.ditRoles.forEach((ditRoleCheck) => {
                if (item.toUpperCase().includes(ditRoleCheck)) {
                  ditRole = true;
                }
              });
            }
          });

          if (this.from == 'eapps') {

            if (this.policyId) {
              this.router.navigate(['/policysearch/policysummary/' + this.policyId]);
            }
            else if (ditRole) {
              this.router.navigate(['/dit/home']);
            } else {
              this.router.navigateByUrl('/dashboard');
            }


          }

          if (this.from == 'dit') {
            this.router.navigate(['/newEndorsements', this.policyId, this.createdBy, this.productName, this.proposalCode]);
          }
        } else {
          this.globals.loginInvalid = true;
          if (resp == "Bad credentials") {
            this.globals.loginInvalidMsg = "Your login attempt was not successfull, try again Reason: Bad Credentials";
          } if (resp == "User account has Expired") {
            this.globals.loginInvalidMsg = "Your login attempt was not successful, try again Reason: User account has Expired.";
          } if (resp.includes("User account is locked")) {
            this.globals.loginInvalidMsg = resp;
          }
          this.router.navigateByUrl('/login');
        }
      } else {
        this.router.navigateByUrl('/login');
      }
    })
  }

  loadinTextLogicStart() {
    $('#loadingTextScreen').addClass('d-block');
    this.loadingText = 'Authenticating..';
    this.timeout1 = setTimeout(() => {
      $('#loadingScreen').removeClass('d-block');
      this.loadingText = 'Authenticating..'
      this.timeout2 = setTimeout(() => {
        this.loadingText = 'Authenticating..'
      }, 3000);
    }, 3000);
  }

  loadinTextLogicEnd() {
    $('#loadingTextScreen').removeClass('d-block');
  }

  login(formValues) {
    // console.log(formValues.uName,"",formValues.pWord)
    sessionStorage.setItem("username", formValues.uName);
    sessionStorage.setItem("password", formValues.pWord);

    if (this.globals.USEOAUTH) {
      this.oauthtokenSer = this.loginService.oauthToken(formValues.uName, formValues.pWord).subscribe(resp => {

        if (resp.includes("invalid_grant")) {
          this.globals.loginInvalid = true;
          this.globals.loginInvalidMsg = "Your login attempt was not successfull, try again Reason: Bad Credentials";
          return;
        }
        if (resp) {
          let expiringTime = moment().add(Number(JSON.parse(resp).expires_in), 'seconds').unix().toString();
          sessionStorage.setItem("token", resp);
          sessionStorage.setItem("tokentime", expiringTime);

          this.callLoginService(formValues);
        }
      });
    } else {
      this.callLoginService(formValues);
    }
  }

  callLoginService(formValues) {
    // console.log(formValues.uName,"",formValues.pWord)
    this.loadinTextLogicStart();
    this.loginSer = this.loginService.loginUser(formValues.uName, formValues.pWord).subscribe(resp => {
      this.loadinTextLogicEnd();
      if (resp) {
        if (resp != "Bad credentials" && resp != "User account has Expired" && !resp.includes("User account is locked")) {
          sessionStorage.setItem('currentUser', resp);
          this.setuserdto();

          this.globals.USERDTO = JSON.parse(sessionStorage.getItem("currentUserDTO"));
          let ditRole = false;
          this.globals.USERDTO.roles.forEach((item) => {
            if (!ditRole) {
              this.ditRoles.forEach((ditRoleCheck) => {
                if (item.toUpperCase().includes(ditRoleCheck)) {
                  ditRole = true;
                }
              });
            }
          });


          if (JSON.parse(resp).partyCode == 'AG017328') {
            this.router.navigate(['/homehealth']);
          } else {
            if (ditRole) {
              this.router.navigate(['/dit/home']);
            } else {
              this.router.navigateByUrl('/dashboard');
            }
          }
        } else {
          this.globals.loginInvalid = true;
          if (resp == "Bad credentials") {
            this.globals.loginInvalidMsg = "Your login attempt was not successfull, try again Reason: Bad Credentials";
          } if (resp == "User account has Expired") {
            this.globals.loginInvalidMsg = "Your login attempt was not successful, try again Reason: User account has Expired.";
          } if (resp.includes("User account is locked")) {
            this.globals.loginInvalidMsg = resp;
          }
          this.router.navigateByUrl('/login');
        }
      } else {
        this.router.navigateByUrl('/login');
      }

    });
  }

  setuserdto() {
    let user: IUser = JSON.parse(sessionStorage.getItem("currentUser"));
    let role: string[] = [];
    // for (var i = 0; i < user.authorites[i].role.length; i++) {
    //   if(user.authorites[0].role[i] != null){
    //     role.push(user.authorites[0].role[i].role);
    //   }
    // }

    if (user.authorites[0].role.length) {
      user.authorites[0].role.forEach((item) => {
        if (item && item.role) {
          role.push(item.role);
        }
      })
    }
    var json = {
      userName: user.username,
      partyCode: user.partyCode,
      userType: user.type,
      email: user.email,
      authorites: user.authorites,
      roles: role,
      branches: user.branches
    };
    sessionStorage.setItem("currentUserDTO", JSON.stringify(json));

    //setting data to global variables
    this.globals.USER = user;
    this.globals.USERDTO = JSON.parse(sessionStorage.getItem("currentUserDTO"));
  }

  ngOnDestroy() {
    clearTimeout(this.timeout2);
    clearTimeout(this.timeout1);

    if (this.loginSer) {
      this.loginSer.unsubscribe();
    }
    if (this.oauthtokenSer) {
      this.oauthtokenSer.unsubscribe();
    }
    if (this.loginuserSer) {
      this.loginuserSer.unsubscribe();
    }
    if (this.oauthSer) {
      this.oauthSer.unsubscribe();
    }
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }

  }

}