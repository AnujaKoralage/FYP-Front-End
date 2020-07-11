import { Component, OnInit } from '@angular/core';
import {OrderTypeEnum} from '../../shared/enum/order-type.enum';
import {OrderActionEnum} from '../../shared/enum/order-action.enum';
import {EholeService} from '../../shared/services/ehole.service';
import {Pair} from '../../shared/class/pair';
import {TradeService} from '../../shared/services/trade.service';
import {UserTypeEnum} from '../../shared/enum/userType.enum';
import {UserService} from '../../shared/services/user.service';
import * as _ from 'lodash';

interface EholeObject {
  completedAmount: any;
  eholeType: any;
  id: any;
  name: any;
  traderId: any;
  profit: any;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  constructor(private tradeService: TradeService,
              private eholeService: EholeService,
              private userService: UserService) { }

     public bestEholeArr: EholeObject[] = [];

  ngOnInit() {

    this.eholeService.getCompletedEholes().subscribe((value: any[]) => {
      for (let i = 0; i < value.length; i++) {
        let obj = value[i];
        this.tradeService.getEholeProfits(obj.id).subscribe((data: any) => {
          if (data > 0) {
            let name = this.userService.getUserName(UserTypeEnum.TRADER, obj.traderId).subscribe((name: any) => {
              return name;
            });
            let ehole: EholeObject;
            ehole.id = obj.id;
            ehole.completedAmount = obj.completedAmount;
            ehole.eholeType = obj.eholeType;
            ehole.traderId = obj.traderId;
            ehole.profit = data;
            ehole.name = name;
            this.bestEholeArr.push(ehole);
        }
        });
      }
    });

  }

}
