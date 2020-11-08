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
export class AppComponent {
  title = 'projectPointTest';
}
