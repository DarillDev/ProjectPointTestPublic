import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DxChartComponent } from 'devextreme-angular';
import { BehaviorSubject, combineLatest, Subject, Subscription } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { IStockSymbol } from '../../models';
import { StocksService } from '../../services/stocksService/stocks.service';

@Component({
  selector: 'app-test-stock-candles',
  templateUrl: './stock-candles.component.html',
  styleUrls: ['./stock-candles.component.scss'],
})
export class StockCandlesComponent implements OnInit, OnDestroy {
  @ViewChild(DxChartComponent, { static: false }) chart: DxChartComponent;
  @Input() stockSymbol: Subject<IStockSymbol>; // Выбранная компания
  stocksPricesSubscribtion: Subscription; // Cсылка на подписку
  stocksPrices = []; // Данные о продажах
  visualRange: any = {};

  from: Date; // Конец временного интервала
  to: Date; // Начало временного интервала

  timInterval$: BehaviorSubject<{from: number; to: number}>; // Временной интервал для запроса


  constructor(private stock: StocksService) {

    // Изначально, интервал устанавливается в 1 год.
    this.from = new Date();
    this.from.setFullYear(this.from.getFullYear() - 1);
    this.to = new Date();


    const startInterval = this.convertTimeStamp(this.from);
    const endIterval = this.convertTimeStamp(this.to);

    this.timInterval$ = new BehaviorSubject<{from: number; to: number}>({from: startInterval, to : endIterval});

  }



  ngOnInit(): void {
    this.stocksPricesSubscribtion = combineLatest([this.timInterval$, this.stockSymbol]).pipe(
      // Проверка всех необходимх данных для запроса.
      filter(([{to, from}, stockSymbol]) => !!to && !!from && !!stockSymbol && !!stockSymbol.displaySymbol),
      // Конвертация данных в обьект запроса.
      map(([{to, from}, {displaySymbol}]) => ({to, from, symbol : displaySymbol})),
      switchMap(reqParams => this.stock.getCandle(reqParams))
    ).subscribe(data => {
      this.stocksPrices = data;
    });
  }



  ngOnDestroy(): void {
    if (this.stocksPricesSubscribtion) {
      this.stocksPricesSubscribtion.unsubscribe();
    }
  }

  valueChanged(e: any): void {
    // debugger;
    this.chart.instance.zoomArgument(new Date(e.value[0]), new Date(e.value[1]));
  }

  /**
   * Изменение начала временного интервала
   * @param event Событие генерируемое DateBox при изменении значения.
   */
  fromValueChanged(event): void {
    const startInterval: number = this.convertTimeStamp(event.value);
    this.timInterval$.next({...this.timInterval$.value, from : startInterval});
  }


  /**
   * Изменение конца временного интервала
   * @param event Событие генерируемое DateBox при изменении значения.
   */
  toValueChanged(event): void {
    const endIterval: number = this.convertTimeStamp(event.value);
    this.timInterval$.next({...this.timInterval$.value, to : endIterval});
  }

  /**
   * Перевод миллисекунд в секнды.
   * @param date Обьект даты
   */
  private convertTimeStamp(date: Date): number {
    // API требует передавать дату в секундах.
    return Math.round(date.getTime() / 1000);
  }
}
