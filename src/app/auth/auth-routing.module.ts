import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutAuthComponent } from './pages/layout-Auth-page/layout-auth-page.component';
import { LoginAuthComponent } from './pages/login-auth-page/login-auth-page.component';
import { sesionGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutAuthComponent,
    children: [
      {
        path: 'login',
        component: LoginAuthComponent,
      },
      {
        path: '**',
        redirectTo: 'login',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
