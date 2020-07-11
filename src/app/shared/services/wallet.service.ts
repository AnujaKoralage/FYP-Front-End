import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {NewHttpService} from './custom.new.http.service';
import {CommonService} from './common.service';
import {URL_CONST} from '../configs/url.constants';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(
    private router: Router,
    private http: NewHttpService,
    private commonService: CommonService
  ) { }

  getWalletDetails(scope) {
    return this.http.get(URL_CONST.URL_PREFIX_WALLET + 'wallet/' + scope + '/id', this.commonService.getDefaultOptions());
    }
}
