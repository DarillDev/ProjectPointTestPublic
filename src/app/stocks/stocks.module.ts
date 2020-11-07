import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StocksService } from './services/stocksService/stocks.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [],
  exports : [],
  providers : [
    StocksService
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class StocksModule { }
