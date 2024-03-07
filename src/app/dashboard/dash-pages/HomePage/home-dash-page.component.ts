import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../auth/Service/login.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Home-Page',
  templateUrl: 'home-dash-page.component.html',
})
export class HomePageComponent implements OnInit {
  constructor(
    private login: LoginService,
    private cookie: CookieService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.token();
  }

  public password: string = '';
  public passwordarrynumber: number[] = [];
  public passwordarrynumberdes: number[] = [];
  public passwordfinal: string = '';

  token(): void {
    this.password = this.cookie.get('Token');

    this.passwordarrynumber = this.login.StringArray(this.password);

    for (let i = 0; this.passwordarrynumber.length > i; i++) {
      this.passwordarrynumberdes[i] = this.login.expmod(
        this.passwordarrynumber[i],
        2147,
        8051,
      );
    }

    this.passwordfinal = this.login.NumbersToString(this.passwordarrynumberdes);
  }
  onclick(): void {
    this.cookie.deleteAll('/');
    window.location.reload();
  }
}
