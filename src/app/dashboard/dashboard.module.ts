import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomePageComponent } from './dash-pages/HomePage/home-dash-page.component';
import { DashRouterModule } from './dash-routing.module';
import { LayoutDashComponent } from './dash-pages/dashLayouth/latouth-dash-page.component';
import { NavBarComponent } from './dash-pages/components/NavbarComponent/navbar-dash.component';
import { MenuBarComponent } from './dash-pages/components/MenubarComponent/menubar-dash.component';
import { TarjetaComponent } from './dash-pages/components/TarjetaComponent/tarjeta-dash.component';

@NgModule({
  imports: [CommonModule, DashRouterModule],
  exports: [],
  declarations: [
    HomePageComponent,
    LayoutDashComponent,
    NavBarComponent,
    MenuBarComponent,
    TarjetaComponent,
  ],
  providers: [],
})
export class DashboardModule {}
