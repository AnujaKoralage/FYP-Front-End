import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {NewHttpService} from './custom.new.http.service';
import {CommonService} from './common.service';
import {URL_CONST} from '../configs/url.constants';
import {EholeTypeEnum} from '../../shared/enum/eholeType.enum';

@Injectable({
  providedIn: 'root'
})
export class EholeService {

  constructor(private router: Router,
              private http: NewHttpService,
              private commonService: CommonService) { }

  createEhoel(params) {
    return this.http.post(URL_CONST.URL_PREFIX_EHOLE + 'ehole/create', params,
      this.commonService.getDefaultOptions());
  }
  investEhoel(params) {
    return this.http.post(URL_CONST.URL_PREFIX_EHOLE + 'ehole/invest', params,
      this.commonService.getDefaultOptions());
  }
  getActiveEholes() {
    return this.http.get(URL_CONST.URL_PREFIX_EHOLE + 'ehole/active/' + EholeTypeEnum.ACTIVE,
      this.commonService.getDefaultOptions());
  }
  getTradingEholes() {
    return this.http.get(URL_CONST.URL_PREFIX_EHOLE + 'ehole/active/' + EholeTypeEnum.TRADING,
      this.commonService.getDefaultOptions());
  }
  getCompletedEholes() {
    return this.http.get(URL_CONST.URL_PREFIX_EHOLE + 'ehole/active/' + EholeTypeEnum.FINISHED,
      this.commonService.getDefaultOptions());
  }
}
