import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  socket;
  constructor() { }
  setupSocketConnection() {
    this.socket = io('wss://widgetdata.tradingview.com/socket.io/websocket?from=widgetembed%2F&date=2020_06_01-14_58');
    console.log(this.socket);
  }
}
