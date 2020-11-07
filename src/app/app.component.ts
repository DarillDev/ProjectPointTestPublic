import { Component } from '@angular/core';
import { StocksModule } from './stocks';
import { StocksService } from './stocks/services/stocksService/stocks.service';

@Component({
  selector: 'app-test-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'projectPointTest';
  constructor(private stock: StocksService) {
    this.stock.getCandle({
      symbol : 'APPL',
      from : new Date().setFullYear(2019),
      to : Date.now()
    }).subscribe();
  }
}
