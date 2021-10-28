import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavComponent } from './components/nav/nav.component';
import { AdminRoutingModule } from './admin-routing.module';
import { WelcomeComponent } from './pages/welcome/welcome.component';



@NgModule({
  declarations: [
    AdminComponent,
    SidebarComponent,
    NavComponent,
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
