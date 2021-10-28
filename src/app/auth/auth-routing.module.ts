import { ClientGuard } from './guards/client.guard'
import { LoggedInGuard } from './guards/logged-in.guard'
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { AuthComponent } from './auth.component'
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { SignUpComponent } from '@auth/pages/sign-up/sign-up.component'
import { LogInComponent } from '@auth/pages/log-in/log-in.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/profile/dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'log-in',
        component: LogInComponent,
        canActivate: [LoggedInGuard],
        data: {animation: '1'}
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
        canActivate: [LoggedInGuard],
        data: {animation: '2'}
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [ClientGuard],
        data: {animation: '3'}
      }
    ]
  },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule {}