import { Component } from '@angular/core';
import { Observable, ObservedValueOf } from 'rxjs';
import { IStockSymbol } from './stocks/models';
import { StocksService } from './stocks/services/stocksService/stocks.service';

@Component({
  selector: 'app-test-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'projectPointTest';
  symbolList: Observable<IStockSymbol[]>;
  constructor(private stocks: StocksService){
    this.symbolList = this.stocks.getSymbols();
  }

  onSelectSymbol(company: IStockSymbol): void {
    alert(company.description);
  }
}
