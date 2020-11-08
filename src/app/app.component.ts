import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { DxDataGridModule } from 'devextreme-angular';
import { BehaviorSubject, from, interval, Observable, ObservedValueOf, Subject, Subscription } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, filter, map, mergeMap, mergeMapTo, repeat, retry, switchMap, takeUntil } from 'rxjs/operators';
import { IStockSymbol } from './stocks/models';
import { StockWsService } from './stocks/services/stock-ws/stock-ws.service';
import { StocksService } from './stocks/services/stocksService/stocks.service';

@Component({
  selector: 'app-test-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'projectPointTest';
  symbolList: Observable<IStockSymbol[]>;
  currentSymbol: BehaviorSubject<IStockSymbol>;
  stockPrices: Observable<any>;
  webScoketSub: Subscription;
  constructor(private stocks: StocksService, private ws: StockWsService) {
    this.symbolList = this.stocks.getSymbols();
    this.currentSymbol = new BehaviorSubject(null);

    this.currentSymbol.pipe(
      filter(stockSymbol => !!stockSymbol && !!stockSymbol.displaySymbol),
      switchMap((stockSymbol) => this.ws.getTradesStream(stockSymbol.displaySymbol))
    ).subscribe( data => {
      console.log(data);
    });

  }

  ngOnInit(): void {}

  onSelectSymbol(company: IStockSymbol): void {
    this.currentSymbol.next(company);
  }

  private subscrubeOnWebSocket(symbol: string): void {
    if (this.webScoketSub) {
    }
    this.webScoketSub = this.ws.getTradesStream(symbol).subscribe( data => {
      console.log(data);
    });
  }
}
