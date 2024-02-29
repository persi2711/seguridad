import { Component, OnInit } from '@angular/core';
import { LoginService } from '../auth/Service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'selector-name',
  templateUrl: 'loading-page.component.html',
})
export class LoadingPage {
  constructor(
    private login: LoginService,
    private router: Router,
  ) {}
}
