import { Component, OnInit } from '@angular/core';
import {PaymentService} from '../../shared/services/payment.service';
import {WalletService} from '../../shared/services/wallet.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import NumberFormat = Intl.NumberFormat;
import NumberFormatOptions = Intl.NumberFormatOptions;
import {Subject} from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(private paymentService: PaymentService,
              private http: HttpClient,
              private router: Router,
              private walletService: WalletService) { }

  public amount;
  private transactionId = null;
  private paymentUrl = null;
  public name = '';
  public amountError = false;
  public amountErrorMessage = '';
  public emaill = '';
  public withdrawAmount;
  public curentAmount;

  ngOnInit() {
    if (localStorage.getItem('scope') === 'role_investor') {
      this.walletService.getWalletDetails('investor').subscribe(value => {
        this.curentAmount = value.currentBalance;
      });
    } else {
      this.walletService.getWalletDetails('trader').subscribe(value => {
        this.curentAmount = value.currentBalance;
      });
    }

  }
  setAmount(event) {
    this.amount = event.target.value;
  }
  proceedPayment() {
    if (this.amount !== 0 && this.amount !== null) {
      const params = {
        price: this.amount,
        currency: 'USD',
        method: 'paypal',
        intent: 'sale',
        description: 'topup'
      };
      this.paymentService.topUp(params).subscribe(value => {
        this.transactionId = value.transactionId;
        this.paymentUrl = value.redirectUrl;
        localStorage.setItem('lastPaymentId', this.transactionId);
        window.open(this.paymentUrl, '_self');
      });
    }
  }
  validateWithdrawAmount() {
    if (this.withdrawAmount === 0) {
      this.amountError = true;
      this.amountErrorMessage = 'Enter Valid Amount';
    } else {
      if (this.curentAmount < this.withdrawAmount) {
        this.amountError = true;
        this.amountErrorMessage = 'Insufficient Amount';
      } else {
        this.amountError = false;
      }
    }
  }
  withdrawAmountQ() {
    if (!this.amountError) {
      const params = {
        amount: this.withdrawAmount
      };
      console.log(params);
      this.paymentService.withdraw(params).subscribe(value => {
        console.log(value);
      });
    }
  }


}
