import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './dash-pages/HomePage/home-dash-page.component';
import { LayoutDashComponent } from './dash-pages/dashLayouth/latouth-dash-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutDashComponent,
    children: [
      {
        path: 'home',
        component: HomePageComponent,
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'home',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashRouterModule {}
