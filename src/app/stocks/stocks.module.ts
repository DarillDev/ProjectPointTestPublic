import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StocksService } from './services/stocksService/stocks.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { SymbolListComponent } from './components/symbol-list/symbol-list.component';
import { DxDataGridModule } from 'devextreme-angular';

@NgModule({
  declarations: [SymbolListComponent],
  exports : [SymbolListComponent],
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

  ]
})
export class StocksModule { }
