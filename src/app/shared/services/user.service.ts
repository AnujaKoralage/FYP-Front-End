import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {NewHttpService} from './custom.new.http.service';
import {CommonService} from './common.service';
import {URL_CONST} from '../configs/url.constants';

@Injectable()
export class UserService {

  constructor(
    private router: Router,
    private http: NewHttpService,
    private commonService: CommonService) { }

    createNewUser(userType, params) {
    return this.http.post(URL_CONST.URL_PREFIX_PROFILE + 'profile/' + userType + '/register', params,
      this.commonService.getOptionsWithoutToken());
    }

    checkUsername(userType, name) {
    return this.http.get(URL_CONST.URL_PREFIX_PROFILE + 'profile/' + userType + '/name?username=' + name,
      this.commonService.getOptionsWithoutToken());
    }
  getUserName(userType, id) {
    return this.http.get(URL_CONST.URL_PREFIX_PROFILE + 'profile/' + userType + '/idName/' + id,
      this.commonService.getDefaultOptions());
  }

}
