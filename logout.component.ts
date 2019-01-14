import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Globals } from 'app/globals';

@Component({
  templateUrl: './login.html'
})

export class LogoutComponent implements OnInit {
  public RSALOGO = require("../img/RSA-Logo.png");

  public loginForm: FormGroup;
  constructor(private router: Router, private formBuilder: FormBuilder, private globals: Globals) { };
  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      uName: ['', Validators.required],
      pWord: ['', Validators.required],
    });
    sessionStorage.clear();
    this.logout();
  }

  logout() {
    this.globals.loginInvalid = false;
    this.router.navigateByUrl('/login');
  }

  login(formValues) {
    /*not required */
  }
}