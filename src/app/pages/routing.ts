import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {TradeComponent} from './trade/trade.component';
import {AccountComponent} from './account/account.component';
import {SuccessComponent} from './success/success.component';
import {CreateEholeComponent} from './create-ehole/create-ehole.component';
import {InvestEholeComponent} from './invest-ehole/invest-ehole.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuardService as AuthGuard} from '../shared/services/authGuard.service';

export const PAGE_ROUTES: Routes = [
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path : 'sign-up',
    component : RegisterComponent
  },
  {
    path : 'payment/success',
    component : SuccessComponent
  },
  {
    path : 'trade',
    component : TradeComponent,
    canActivate: [AuthGuard]
  },
  {
    path : 'account',
    component : AccountComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create-ehole',
    component: CreateEholeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'invest-ehole',
    component: InvestEholeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(PAGE_ROUTES)],
  exports: [RouterModule]
})
export class Routing {

}
