import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomePageComponent } from './dash-pages/HomePage/home-dash-page.component';
import { DashRouterModule } from './dash-routing.module';

@NgModule({
  imports: [CommonModule, DashRouterModule],
  exports: [],
  declarations: [HomePageComponent],
  providers: [],
})
export class DashboardModule {}
