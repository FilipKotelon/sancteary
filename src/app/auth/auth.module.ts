import { AuthRoutingModule } from './auth-routing.module'
import { SharedModule } from '@shared/shared.module'
import { NgModule } from '@angular/core';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { AuthComponent } from './auth.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

@NgModule({
  declarations: [
    SignUpComponent,
    LogInComponent,
    AuthFormComponent,
    AuthComponent,
    DashboardComponent
  ],
  imports: [
    SharedModule,
    AuthRoutingModule
  ]
})

export class AuthModule {}