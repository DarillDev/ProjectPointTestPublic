import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { IStockSymbol } from '../../models';
import { StockWsService } from '../../services/stock-ws/stock-ws.service';
import { StocksService } from '../../services/stocksService/stocks.service';

@Component({
  selector: 'app-test-stock-info',
  templateUrl: './stock-info.component.html',
  styleUrls: ['./stock-info.component.scss']
})
export class StockInfoComponent implements OnInit {

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
}
