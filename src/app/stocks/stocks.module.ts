import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StocksService } from './services/stocksService/stocks.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [],
  exports : [],
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
    HttpClientModule
  ]
})
export class StocksModule { }
