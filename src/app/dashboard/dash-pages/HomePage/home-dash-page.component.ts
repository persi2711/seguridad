import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../auth/Service/login.service';

@Component({
  selector: 'app-Home-Page',
  templateUrl: 'home-dash-page.component.html',
})
export class HomePageComponent implements OnInit {
  ngOnInit(): void {}
  constructor(private login: LoginService) {}
}
