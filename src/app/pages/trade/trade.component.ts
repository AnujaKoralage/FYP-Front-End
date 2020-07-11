import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ChartService} from '../../shared/services/chart.service';
import {TradeService} from '../../shared/services/trade.service';
import {SocketioService} from '../../shared/services/socketio.service';
import {CurrencyPair} from '../../shared/enum/currency-pair.enum';
import {OrderTypeEnum} from '../../shared/enum/order-type.enum';
import {OrderActionEnum} from '../../shared/enum/order-action.enum';
import {EholeService} from '../../shared/services/ehole.service';
import {Pair} from '../../shared/class/pair';
import * as _ from 'lodash';

declare const TradingView: any;
@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.scss']
})
export class TradeComponent implements OnInit, AfterViewInit {

  constructor(private chartService: ChartService,
              private tradeService: TradeService,
              private socketService: SocketioService,
              private eholeService: EholeService) { }
  public currentTicker;
  public eholeArray;
  public pairs = CurrencyPair;
  public orderTypes = OrderTypeEnum;
  public orderAction = OrderActionEnum;
  public selectedEhole;
  public availableAmount;
  public selectedCurrencyPair = 'FX:EURUSD';
  public disableInvest = false;
  public buyAmount;
  public buyAmountError = true;
  public buyAmountErrorMessage;
  public sellAmount;
  public sellAmountError = true;
  public sellAmountErrorMesssage;
  public sellOrderType = 1;
  public buyOrderType = 1;
  public buyPrice;
  public sellPrice;
  public currentEholeActiveOrders = [];
  public currentEholeCompleteOrders = [];

  ngOnInit() {
    // this.chartService.loadChart(CurrencyPair.EUR_USD);
    this.eholeService.getTradingEholes().subscribe((value: any) => {
      this.eholeArray = value;
      if (this.eholeArray.length != 0) {
        this.selectedEhole = this.eholeArray[0];

        this.tradeService.investedAmount(this.selectedEhole.id).subscribe((value1: any) => {
          // let eholeObj = _.find(this.eholeArray, (o) => o.id == this.selectedEhole);
          this.availableAmount = this.selectedEhole.completedAmount - value1;
          if (this.availableAmount <= 0) {
            this.disableInvest = true;
            this.availableAmount = 0;
          }
        });
        this.tradeService.getEholeActiveOrders(this.selectedEhole.id).subscribe((value1: any) => {
          this.currentEholeActiveOrders = value1;
          setInterval(() => {
          for (let i = 0; i < this.currentEholeActiveOrders.length; i++) {
            // setInterval(() => {
              if (this.currentEholeActiveOrders[i].orderAction == OrderActionEnum.BUY) {
                let profit = this.calculateProfit(this.currentEholeActiveOrders[i].startPrice, this.currentTicker[0].bid,
                  this.currentEholeActiveOrders[i].orderSize, OrderActionEnum.BUY);
                this.currentEholeActiveOrders[i].profit = profit;
              } else {
                let profit = this.calculateProfit(this.currentEholeActiveOrders[i].startPrice, this.currentTicker[0].ask,
                  this.currentEholeActiveOrders[i].orderSize, OrderActionEnum.SELL);
                this.currentEholeActiveOrders[i].profit = profit;
              }
            // }, 2000);
          }
          }, 2000);
        });
        this.tradeService.getEholeCompleteOrders(this.selectedEhole.id).subscribe((value2: any) => {
          this.currentEholeCompleteOrders = value2;
        });
      }
    });
    this.tradeService.getTicker().subscribe((data: any) => {
      this.currentTicker = data.prices;
    });
    setInterval(() => {
      this.tradeService.getTicker().subscribe((data: any) => {
        this.currentTicker = data.prices;
      });
      // this.tradeService.getTradingVIewTicker().then(value => {
      //   console.log(value);
      // }, reason => {
      //   console.log(reason)
      // });

    }, 2000);
  }

  ngAfterViewInit() {
    new TradingView.widget(
      {
        autosize: true,
        symbol: this.selectedCurrencyPair,
        interval: '1',
        timezone: 'Etc/UTC',
        theme: 'Dark',
        style: '1',
        locale: 'en',
        toolbar_bg: 'rgba(0, 0, 0, 1)',
        hide_top_toolbar: true,
        enable_publishing: true,
        hide_side_toolbar: false,
        withdateranges: true,
        allow_symbol_change: true,
        container_id: 'crypt-candle-chart'
      }
    );
  }
  getCurrencyPairArr() {
    return CurrencyPair;
  }
  selectEhole(event) {
    // this.selectedEhole = event.target.value;
    this.tradeService.investedAmount(event.target.value).subscribe((value: any) => {
      const eholeObj = _.find(this.eholeArray, (o) => o.id == event.target.value);
      this.selectedEhole = eholeObj;
      this.availableAmount = eholeObj.completedAmount - value;
      if (this.availableAmount <= 0) {
        this.disableInvest = true;
        this.availableAmount = 0;
      }
    });
    this.tradeService.getEholeActiveOrders(event.target.value).subscribe(value1 => {
      this.currentEholeActiveOrders = value1;
    });
    this.tradeService.getEholeCompleteOrders(event.target.value).subscribe(value2 => {
      this.currentEholeCompleteOrders = value2;
    });
  }
  selectCurrencyPair(event) {
    this.selectedCurrencyPair = event.target.value;
    new TradingView.widget(
      {
        autosize: true,
        symbol: this.selectedCurrencyPair,
        interval: '1',
        timezone: 'Etc/UTC',
        theme: 'Dark',
        style: '1',
        locale: 'en',
        toolbar_bg: 'rgba(0, 0, 0, 1)',
        hide_top_toolbar: true,
        enable_publishing: true,
        hide_side_toolbar: false,
        withdateranges: true,
        allow_symbol_change: true,
        container_id: 'crypt-candle-chart'
      }
    );
  }
  buyAmountChange(event) {
    if (this.availableAmount < this.buyAmount) {
      this.buyAmountError = true;
    } else {
      this.buyAmountError = false;
    }
  }
  sellAmountChange(event) {
    if (this.availableAmount < this.buyAmount) {
      this.sellAmountError = true;
    } else {
      this.sellAmountError = false;
    }
  }
  placeSellOrder() {
    const id = Pair.getpairSpec(this.selectedCurrencyPair);
    const params = {
      price: this.currentTicker[0].bid,
      size: this.sellAmount,
      orderAction: 1,
      orderType: this.sellOrderType,
      symbolId: id,
      eholeId: this.selectedEhole.id
    };
    this.tradeService.placeTrade(params).subscribe(value => {
      console.log(value);
      this.tradeService.investedAmount(this.selectedEhole.id).subscribe(value => {
        // let eholeObj = _.find(this.eholeArray, (o) => o.id == this.selectedEhole);
        this.availableAmount = this.selectedEhole.completedAmount - value;
        if (this.availableAmount <= 0) {
          this.disableInvest = true;
          this.availableAmount = 0;
        }
      });
      this.tradeService.getEholeActiveOrders(this.selectedEhole.id).subscribe(value1 => {
        this.currentEholeActiveOrders = value1;
      });
    });
  }
  placeBuyOrder() {
    const id = Pair.getpairSpec(this.selectedCurrencyPair);
    const params = {
      price: this.currentTicker[0].ask,
      size: this.buyAmount,
      orderAction: 0,
      orderType: this.sellOrderType,
      symbolId: id,
      eholeId: this.selectedEhole.id
    };
    this.tradeService.placeTrade(params).subscribe(value => {
      console.log(value);
      this.tradeService.investedAmount(this.selectedEhole.id).subscribe(value => {
        // let eholeObj = _.find(this.eholeArray, (o) => o.id == this.selectedEhole);
        this.availableAmount = this.selectedEhole.completedAmount - value;
        if (this.availableAmount <= 0) {
          this.disableInvest = true;
          this.availableAmount = 0;
        }
      });
      this.tradeService.getEholeActiveOrders(this.selectedEhole.id).subscribe(value1 => {
        this.currentEholeActiveOrders = value1;
      });
    });
  }
  completeOrder(orderId, orderAction) {
    let params;
    if (orderAction == OrderActionEnum.BUY) {
      params = {
        orderId: orderId,
        endPrice: this.currentTicker[0].ask
      };
    } else {
      params = {
        orderId: orderId,
        endPrice: this.currentTicker[0].bid
      };
    }
    this.tradeService.completeOrder(params).subscribe(value => {
      this.tradeService.getEholeActiveOrders(this.selectedEhole.id).subscribe(value1 => {
        this.currentEholeActiveOrders = value1;
      });
      this.tradeService.getEholeCompleteOrders(this.selectedEhole.id).subscribe(value2 => {
        this.currentEholeCompleteOrders = value2;
      });
    });
  }
  setSellOrderType(event) {
    this.sellOrderType = event.target.value;
  }
  setBuyOrderType(event) {
    this.buyOrderType = event.target.value;
  }
  calculateProfit(startPrice, endPrice, orderSize, type) {
    if (type == OrderActionEnum.BUY) {
      let baceCurBuyUnits = orderSize / startPrice;
      let baceCurSSellUnits = baceCurBuyUnits * endPrice;
      let profitQuantity = baceCurSSellUnits - orderSize;
      return profitQuantity;
    } else {
      let sellBaseCurQty = orderSize / startPrice;
      let sellQotCurQty = orderSize / endPrice;
      let profitInBaseCur = sellQotCurQty - sellBaseCurQty;
      let profit = profitInBaseCur / endPrice;
      return profit;
    }
  }

}
