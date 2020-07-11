import {Component, DoCheck, OnInit} from '@angular/core';
import {WalletService} from '../../shared/services/wallet.service';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, DoCheck {

  constructor(private walletService: WalletService,
              private authService: AuthService) { }

  public isLogin;
  public scope = false;
  public amount;

  ngOnInit() {
    if (localStorage.getItem('scope') === 'role_trader') {
      this.scope = true;
    }
  }

  ngDoCheck(): void {
    if (localStorage.getItem('access_token') === null || localStorage.getItem('access_token') === undefined) {
      this.isLogin = false;
    } else {
      this.isLogin = this.authService.isAuthenticated();
    }
  }
  getWalletDetails() {
    if (localStorage.getItem('scope') === 'role_investor') {
      this.walletService.getWalletDetails('investor').subscribe(value => {
        this.amount = value.currentBalance;
      });
    } else {
      this.walletService.getWalletDetails('trader').subscribe(value => {
        this.amount = value.currentBalance;
      });
    }
  }

}
