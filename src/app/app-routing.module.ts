import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard, sesionGuard } from './guards/auth.guard';
import { LoadingPage } from './helpers/loading-page.component';

const routes: Routes = [
  {
    path: 'dash',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    canActivate: [authGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [sesionGuard],
  },
  {
    path: '',
    redirectTo: 'dash',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'dash',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
