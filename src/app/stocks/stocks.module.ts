import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StocksService } from './services/stocksService/stocks.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { SymbolListComponent } from './components/symbol-list/symbol-list.component';
import { DxCalendarModule, DxChartModule, DxDataGridModule, DxDateBoxModule, DxRangeSelectorModule } from 'devextreme-angular';
import { StockCandlesComponent } from './components/stock-candles/stock-candles.component';

@NgModule({
  declarations: [SymbolListComponent, StockCandlesComponent],
  exports : [SymbolListComponent, StockCandlesComponent],
  providers : [
    StocksService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    DxDataGridModule,
    DxChartModule,
    DxRangeSelectorModule,
    DxDateBoxModule,

  ]
})
export class StocksModule { }
