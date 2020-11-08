import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { ITrade } from '../../models/trade';

@Component({
  selector: 'app-test-stock-trade',
  templateUrl: './stock-trade.component.html',
  styleUrls: ['./stock-trade.component.scss']
})
export class StockTradeComponent implements OnInit {
  lastTradeData$: Observable<ITrade>;
  constructor() { }

  ngOnInit(): void {
  }

}
