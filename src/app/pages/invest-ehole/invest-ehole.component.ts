import { Component, OnInit } from '@angular/core';
import {EholeService} from '../../shared/services/ehole.service';
import * as _ from "lodash";

@Component({
  selector: 'app-invest-ehole',
  templateUrl: './invest-ehole.component.html',
  styleUrls: ['./invest-ehole.component.scss']
})
export class InvestEholeComponent implements OnInit {

  constructor(private eholeService: EholeService) { }
  public selectedEhole = null;
  public activeEholeArray = null;
  public purchaseAmount = 0;
  public errorPurchace = false;
  public eholeType = 0;

  ngOnInit() {
    this.sendEhole();
  }

  sendEhole() {
    this.eholeService.getActiveEholes().subscribe(value => {
      console.log(value)
      this.activeEholeArray = value;
      this.selectedEhole = value[0];
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
    let that = this;
    this.eholeService.investEhoel(params).subscribe(val => {
      that.sendEhole();
    });
  }

}
