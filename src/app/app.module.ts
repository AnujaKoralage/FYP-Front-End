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
import {UserService} from './shared/services/user.service';
import {PaymentService} from './shared/services/payment.service';
import {NewHttpService} from './shared/services/custom.new.http.service';
import {CommonService} from './shared/services/common.service';
import {AuthGuardService} from './shared/services/authGuard.service';
import {AuthService} from './shared/services/auth.service';
import {FormsModule} from '@angular/forms';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { SuccessComponent } from './pages/success/success.component';

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
    DashboardComponent,
    SuccessComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    Routing,
    JwtModule.forRoot({
      config: {
        tokenGetter: function  tokenGetter() {
          return localStorage.getItem('access_token');
        }
      }
    }),
  ],
  providers: [
    ChartService,
    UserService,
    NewHttpService,
    CommonService,
    AuthService,
    AuthGuardService,
    PaymentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
