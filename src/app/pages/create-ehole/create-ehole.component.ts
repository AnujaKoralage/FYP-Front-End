import { Component, OnInit } from '@angular/core';
import {EholeService} from '../../shared/services/ehole.service';
import * as _ from "lodash";

@Component({
  selector: 'app-create-ehole',
  templateUrl: './create-ehole.component.html',
  styleUrls: ['./create-ehole.component.scss']
})
export class CreateEholeComponent implements OnInit {

  constructor(private eholeService: EholeService) { }
  public amount;
  public amountError = true;
  public amountErrorMessage = '';
  public eholeType = 0;
  public activeEholeArray = null;
  public completedEholeArray = null;
  public selectedEhole = null;
  public purchaseAmount = 0;
  public errorPurchace = false;

  ngOnInit() {
    this.eholeService.getActiveEholes().subscribe(value => {
      this.activeEholeArray = value;
      this.selectedEhole = value[0];
    });
    this.eholeService.getCompletedEholes().subscribe(value => {
      this.completedEholeArray = value;
    });
  }
  checkAmount() {
    if (this.amount < 50) {
      this.amountError = true;
      this.amountErrorMessage = 'Enter more than 50$';
    } else {
      this.amountError = false;
    }
  }
  createEhole() {
    const params = {
      completedAmount: this.amount,
      eholeType: this.eholeType
    };
    this.eholeService.createEhoel(params).subscribe(value => {
      console.log(value);
      this.eholeService.getActiveEholes().subscribe(arr => {
        this.activeEholeArray = arr;
      });
    });
  }
  seletEholeType(event) {
    this.eholeType = event.target.value;
  }
  selectEhole(obj) {
    const p = _.find(this.activeEholeArray, (o) => { return o.id == obj;});
    this.selectedEhole = p;
  }
  validatePurchaseAmount(val) {
    if ((this.selectedEhole.totalAmount - this.selectedEhole.completedAmount) < val) {
      this.errorPurchace = true;
    } else {
      this.errorPurchace = false;
    }
  }
  invest() {
    const params = {
      eholeId: this.selectedEhole.id,
      amount: this.purchaseAmount
    };
    this.eholeService.investEhoel(params).subscribe(val => {
      this.eholeService.getActiveEholes().subscribe(value => {
        this.activeEholeArray = value;
        this.selectedEhole = value[0];
      });
    });
  }

}
