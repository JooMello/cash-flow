import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LoginService} from "../../services/login.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
  ) {
    this.formLogin = this.formBuilder.group({
      email: this.formBuilder.control(''),
      password: this.formBuilder.control(''),
    })
  }

  ngOnInit(): void {
  }

  login() {
    const email = this.formLogin.get('email').value;
    const password = this.formLogin.get('password').value;
    this.loginService.login(email, password).then().catch(e => {
    });
  }
}
