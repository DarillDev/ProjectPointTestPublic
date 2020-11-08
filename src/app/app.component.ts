import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { DxDataGridModule } from 'devextreme-angular';
import { BehaviorSubject, interval, Observable, ObservedValueOf, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, mergeMap, mergeMapTo, switchMap } from 'rxjs/operators';
import { IStockSymbol } from './stocks/models';
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

  constructor(private stocks: StocksService){
    this.symbolList = this.stocks.getSymbols();
    this.currentSymbol = new BehaviorSubject(null);
  }
  ngOnInit(): void {}

  onSelectSymbol(company: IStockSymbol): void {
    this.currentSymbol.next(company);
  }
}
