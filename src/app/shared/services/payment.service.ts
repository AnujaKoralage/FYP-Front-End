import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {NewHttpService} from './custom.new.http.service';
import {CommonService} from './common.service';
import {URL_CONST} from '../configs/url.constants';

@Injectable()
export class PaymentService {

  constructor(
    private router: Router,
    private http: NewHttpService,
    private commonService: CommonService) { }

    topUp(params) {
    return this.http.post(URL_CONST.URL_PREFIX_PAYMENT + 'payment/topup', params,
      this.commonService.getDefaultOptions());
    }
    withdraw(params) {
      return this.http.post(URL_CONST.URL_PREFIX_PAYMENT + 'payment/withdraw', params,
      this.commonService.getDefaultOptions());
  }
    successRequest(paymentId, payerId, transactionId) {
    return this.http.get(URL_CONST.URL_PREFIX_PAYMENT + 'payment/pay/success?paymentId=' + paymentId + '&PayerID=' +
                              payerId + '&transactionId=' + transactionId, this.commonService.getDefaultOptions());
    }

}
