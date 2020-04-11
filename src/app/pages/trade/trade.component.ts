import {Component, OnInit} from '@angular/core';
import {ChartService} from '../../shared/services/chart.service';
import {CurrencyPair} from '../../shared/enum/currency-pair.enum';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.scss']
})
export class TradeComponent implements OnInit {

  constructor(private chartService: ChartService) { }

  ngOnInit() {
    this.chartService.loadChart(CurrencyPair.USDC_ETC);
  }
}
