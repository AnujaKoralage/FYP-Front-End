import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {TradeComponent} from './trade/trade.component';
import {AccountComponent} from './account/account.component';
import {CreateEholeComponent} from './create-ehole/create-ehole.component';
import {InvestEholeComponent} from './invest-ehole/invest-ehole.component';
import {DashboardComponent} from './dashboard/dashboard.component';


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
    path : 'trade',
    component : TradeComponent
  },
  {
    path : 'account',
    component : AccountComponent
  },
  {
    path: 'create-ehole',
    component: CreateEholeComponent
  },
  {
    path: 'invest-ehole',
    component: InvestEholeComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(PAGE_ROUTES)],
  exports: [RouterModule]
})
export class Routing {

}
