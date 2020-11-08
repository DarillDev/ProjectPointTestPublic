import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable, ObservedValueOf } from 'rxjs';
import { ICompanyProfile, IStockSymbol } from '../../models';
import { StockWsService } from '../../services/stock-ws/stock-ws.service';
import { StocksService } from '../../services/stocksService/stocks.service';

@Component({
  selector: 'app-test-symbol-list',
  templateUrl: './symbol-list.component.html',
  styleUrls: ['./symbol-list.component.scss']
})
export class SymbolListComponent implements OnInit {
  @Input() dataSource: Observable<IStockSymbol[]>; // Фунция возвращающая список компаний
  @Output() selectionChanged$: EventEmitter<IStockSymbol>; // Текущая выбранная компания

  constructor(private stocks: StocksService) {
    this.selectionChanged$ = new EventEmitter(null);
  }

  ngOnInit(): void {
  }

  contentReady(e): void {
    if (!e.component.getSelectedRowKeys().length){
      e.component.selectRowsByIndexes(0);
    }
  }

  selectionChanged(event): void {
    this.selectionChanged$.next(event.selectedRowsData[0]);
    event.component.collapseAll(-1);
    event.component.expandRow(event.currentSelectedRowKeys[0]);
  }

  getCompanyInfo(symbol: string): Observable<ICompanyProfile> {
    return this.stocks.getCompanyProfile(symbol);
  }
}
