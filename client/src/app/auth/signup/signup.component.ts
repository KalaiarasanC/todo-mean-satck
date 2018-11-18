import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../service/app.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  model: SignupModel;
  constructor(
    private router: Router,
    private _appService: AppService
  ) {
    this.model = new SignupModel();
  }

  ngOnInit() {
  }

  logIn() {
    this.router.navigate(['/login']);
  }


  // validate()
  signUp(event) {
    const obj = {
      email: this.model.email,
      password: this.model.password,
      userName: this.model.name
    };
    this._appService.signup(obj).subscribe(val => {
      if (val) {
        this.router.navigate(['login']);
      }
    });
  }
}

class SignupModel {
  email: String;
  password: String;
  confirmPassword: String;
  name: String;
  constructor() { }
}
