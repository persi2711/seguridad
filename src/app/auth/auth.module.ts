import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LayoutAuthComponent } from './pages/layout-Auth-page/layout-auth-page.component';
import { LoginAuthComponent } from './pages/login-auth-page/login-auth-page.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule],
  exports: [],
  declarations: [LayoutAuthComponent, LoginAuthComponent],
  providers: [],
})
export class AuthModule {}
