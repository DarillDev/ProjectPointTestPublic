import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICompanyProfile, IStockSymbol } from '../../models';

const API_METHODS = {
  symbols : '/stock/symbol',
  profile : '/stock/profile2',
  candle  : '/stock/candle'
};
/**
 * Поддерживаемое разрешение.
 */
type TResolusion = '1' | '5' | '15' | '30' | '60' | 'D' | 'W' | 'M';
/**
 * Обьект запроса на получение данных свечей для символов форекс
 */
interface ICandleREquest {
  symbol: string;
  resolution?: TResolusion;
  from: number;
  to: number;
  format?: 'json' | 'scv';
}
const defoultCandleREquest: Partial<ICandleREquest> = {
  resolution : 'D',
  format : 'json'
}


@Injectable({
  providedIn: 'root'
})
export class StocksService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }



  /**
   * Запрос к API на получение поддерживаемых акциий
   * @param exchange Биржа, с которой вы хотите получить список символов.
   */
  getSymbols(exchange: string = 'US'): Observable<IStockSymbol[]> {
    const method = this.apiUrl + API_METHODS.symbols;
    const params = new HttpParams().set('exchange', exchange);

    return this.http.get<IStockSymbol[]>(method, {params});
  }



  /**
   * Запрос к API на получение общей информации о компании
   * @param symbol Символ компании
   */
  getCompanyProfile(symbol: string): Observable<ICompanyProfile> {
    const method = this.apiUrl + API_METHODS.profile;
    const params = new HttpParams().set('symbol', symbol);

    return this.http.get<ICompanyProfile>(method, {params});
  }



   // todo : Запросе почему-то не выполняется. просто пендится 1000 лет :(
  /**
   * Запрос к API. Получение данных свечей для символов форекс.
   * @param symbol символ, возвращенный в /forex/symbol (getSymbols).
   * @param resolution Поддерживаемое разрешение. Некоторые таймфреймы могут быть недоступны в зависимости от биржи.
   * @param timeStampStart Отметка времени UNIX. Начальное значение интервала.
   * @param timeStampEnd Отметка времени UNIX. Конечное значение интервала.
   * @param format Формат ответа
   */
  getCandle(options: ICandleREquest): Observable<any> {
    const method = this.apiUrl + API_METHODS.candle;
    options = {...options, ...defoultCandleREquest};

    let  params = new HttpParams();
    Object.keys(options).forEach( (key) => {
      params = params.append(key, options[key]);
    });

    return this.http.get(method, {params});
  }
}
