import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PaymentService} from '../../shared/services/payment.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private paymentService: PaymentService,
              private router: Router) { }
  public paymentId;
  public payerId;

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(value => {
      console.log(value);
      this.paymentId = value.paymentId;
      this.payerId = value.PayerID;
      this.paymentService.successRequest(this.paymentId, this.payerId, localStorage.getItem('lastPaymentId')).subscribe(value1 => {
        console.log(value1);
      });
    });
  }
  okClick() {
    this.router.navigate(['/dashboard']);
  }

}
