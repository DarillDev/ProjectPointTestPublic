import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable, ObservedValueOf } from 'rxjs';
import { IStockSymbol } from '../../models';

@Component({
  selector: 'app-test-symbol-list',
  templateUrl: './symbol-list.component.html',
  styleUrls: ['./symbol-list.component.scss']
})
export class SymbolListComponent implements OnInit {
  @Input() dataSource: Observable<IStockSymbol[]>; // Фунция возвращающая список компаний
  @Output() selectionChanged$: EventEmitter<IStockSymbol>; // Текущая выбранная компания

  constructor() {
    this.selectionChanged$ = new EventEmitter(null);
  }

  ngOnInit(): void {
  }

  selectionChanged(event): void {
    this.selectionChanged$.next(event.selectedRowsData[0]);
    event.component.collapseAll(-1);
    event.component.expandRow(event.currentSelectedRowKeys[0]);
}

}
