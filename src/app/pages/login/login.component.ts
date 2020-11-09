import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import {Router} from '@angular/router';
import {UserService} from '../../shared/services/user.service';
import {NewHttpService} from '../../shared/services/custom.new.http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient,
              private userService: UserService,
              private httpN: NewHttpService,
              private router: Router) { }
  public name;
  public nameError;
  public nameErrorMesssage;
  public password;
  public passwordError;
  public passwordErrorMessage;

  ngOnInit() {
    // this.ddd();
  }
  public logIn() {
    this.httpN.getAccessToken(this.name, this.password).subscribe(value1 => {
      this.router.navigate(['/dashboard']);
    });
  }
  public ddd() {

    const apiKey = 'veLi6N0d2EO6G5x1MtgAZ5PHM64qoY0xyufoV8V7nes';
    const apiSecret = 'NPgO4mfZFa3fJeclPV5WRhf8YSXjJpSsT8hl4tQIp3H';

    const apiPath = 'v2/auth/w/order/submit';

    const nonce = (Date.now() * 1000).toString();
    const body = {type: 'LIMIT',
      symbol: 'tBTCUSD',
      price: '15',
      amount: '0.001',
    };

    const signature = `/api/${apiPath}${nonce}${JSON.stringify(body)}`;
    // Consists of the complete url, nonce, and request body

    const sig = CryptoJS.HmacSHA384(signature, apiSecret).toString();
    // The authentication signature is hashed using the private key

    // const options = {
    const url = `https://api.bitfinex.com/${apiPath}`;
    const headers = {
        'bfx-nonce': nonce,
        'bfx-apikey': apiKey,
        'bfx-signature': sig
      };
    // };

    // request.post(options, (error, response, body) => {
    //   console.log(body); // Logs the response body
    // });
    this.http.post(url, body, { headers }).subscribe(data => {
      console.log(data);
    });
  }

}
