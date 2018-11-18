import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../service/app.service';
import * as Cookies from 'es-cookie';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoginCard = true;
  email: String = '';
  password: String = '';
  isUnauthorized: Boolean = false;
  constructor(
    private router: Router,
    private _appService: AppService
  ) { }

  ngOnInit() {
    Cookies.set('token', '');
  }

  signup() {
    this.router.navigate(['/signup']);
  }

  login() {
    if (this.email.trim() && this.password.trim()) {
      const obj = {
        email: this.email,
        password: this.password
      };
      this._appService.login(obj).subscribe(result => {
        console.log(result);
        if (result.token) {
          Cookies.set('token', result.token);
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 100);
        } else {
          this.isUnauthorized = true;
          this.email = '';
          this.password = '';
        }
      });
    }
  }
}
