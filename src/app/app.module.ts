import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginService } from './auth/Service/login.service';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { LoadingPage } from './helpers/loading-page.component';

@NgModule({
  declarations: [AppComponent, LoadingPage],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [LoginService, CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
