import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LayoutAuthComponent } from './pages/layout-Auth-page/layout-auth-page.component';
import { LoginAuthComponent } from './pages/login-auth-page/login-auth-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewUserAuthComponent } from './pages/newUser-auth-page/newUser-auth-page.component';

@NgModule({
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule],
  exports: [],
  declarations: [LayoutAuthComponent, LoginAuthComponent, NewUserAuthComponent],
  providers: [],
})
export class AuthModule {}
