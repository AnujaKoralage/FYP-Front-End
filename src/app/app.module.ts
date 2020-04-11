import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {Routing} from './pages/routing';
import { LayoutComponent } from './layout/layout.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { TradeComponent } from './pages/trade/trade.component';
import {ChartService} from './shared/services/chart.service';
import { AccountComponent } from './pages/account/account.component';
import { CreateEholeComponent } from './pages/create-ehole/create-ehole.component';
import { InvestEholeComponent } from './pages/invest-ehole/invest-ehole.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    TradeComponent,
    AccountComponent,
    CreateEholeComponent,
    InvestEholeComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    Routing
  ],
  providers: [
    ChartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
