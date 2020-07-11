import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {NewHttpService} from './custom.new.http.service';
import {CommonService} from './common.service';
import {URL_CONST} from '../configs/url.constants';
import {EholeTypeEnum} from '../../shared/enum/eholeType.enum';
// import { TradingViewAPI } from "tradingview-scraper";

@Injectable({
  providedIn: 'root'
})
export class TradeService {

  constructor(private http: HttpClient,
              private router: Router,
              private http1: NewHttpService,
              private commonService: CommonService) { }
  public getTicker() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + 'f4e00c5945eb2bde5523c9aa2450d519-d00cab275dd52ff5ba6a0fd675aa4fd0'
    });
    const options = { headers };
    return this.http.get('https://api-fxpractice.oanda.com/v1/prices?instruments=EUR_USD', options);
  }
  public getTickerEx() {
    return this.http.get('https://api.exchangeratesapi.io/latest?base=EUR&symbols=USD');
  }
  public getTradingVIewTicker() {
    // const tv = new TradingViewAPI();
    // return tv.getTicker('short');
  }
  public investedAmount(id) {
    return this.http1.get(URL_CONST.URL_PREFIX_TRADE + 'order/eholet/' + id,
      this.commonService.getDefaultOptions());
  }
  public placeTrade(params) {
    return this.http.post(URL_CONST.URL_PREFIX_TRADE + 'order/trade', params,
      this.commonService.getDefaultOptions());
  }
  public getEholeActiveOrders(id) {
    return this.http1.get(URL_CONST.URL_PREFIX_TRADE + 'order/trade/active/' + id,
      this.commonService.getDefaultOptions());
  }
  public getEholeCompleteOrders(id) {
    return this.http1.get(URL_CONST.URL_PREFIX_TRADE + 'order/trade/complete/' + id,
      this.commonService.getDefaultOptions());
  }
  public getEholeProfits(id) {
    return this.http1.get(URL_CONST.URL_PREFIX_TRADE + 'order/ehole/co/' + id,
      this.commonService.getDefaultOptions());
  }
  public completeOrder(params) {
    return this.http.put(URL_CONST.URL_PREFIX_TRADE + 'order/trade', params,
      this.commonService.getDefaultOptions());
  }
}
