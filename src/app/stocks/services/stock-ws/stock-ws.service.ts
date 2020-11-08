import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { from, Observable, Observer, Subscription, throwError } from 'rxjs';
  // ! C ключем от песочницы веб-сокет не работал, по этому тут берем apiKey из environment.PROD
import { environment } from 'src/environments/environment.prod';
import { EFinnhubWsMessageType, FinnhubWsTradeMessage, TFinnhubWsMessage } from '../../models/finhub-ws-message';
import { filter, map } from 'rxjs/operators';
import { ITrade } from '../../models/trade';

@Injectable({
  providedIn: 'root'
})
export class StockWsService {
  private wsUrl = environment.wsUrl;
  private apiKey = environment.apiKey;
  wsSubject: WebSocketSubject<TFinnhubWsMessage>;
  ws: Observable<any>;
  messages: Observable<any>;
  sub: any;
  constructor() {
    this.wsSubject = webSocket<TFinnhubWsMessage>(`${this.wsUrl}?token=${this.apiKey}`);

    /**
     * ! Костыль. Магия какая-то. Если использвать getTradesStream() внутри swithMap()
     * ! То наблюдается следущщий эффект : Первая подписка проходит нормально,
     * ! при втором значении в потоке swithMap, как и ожидалось, отписался предыдушего Observavle,
     * ! и подписался на новый. Но через пол секунды он отписывается от текущего Obsrvable.
     * * ========================================================================================================
     * ! Короче, дело в том что сам wsSubject() закрывает соединение WebScoket, а потом убивает
     * ! всех подписчиков (но это не точно)
     * ! И делает он это скорей всего потому , что на какой-то момент у него не было ни одного подписчика.
     * ! Вообщем пока решение просто оставть этого подписчика :
     */
    this.sub = this.getTradesStream('A').subscribe();
    /**
     * todo : Придумать как это решить нормально.
     */
  }

  /**
   *  Подписывает веб-сокет на прослушивание канала.
   *  Возврашает Obsrvalbe, данные в котором будут фильтроваться для этого канала.
   * @param symbol Символ компании
   */
  getTradesStream(symbol: string): Observable<ITrade> {
    if (!this.wsSubject) {
      return throwError(new Error('websocket subject not set'));
    }
    const source = this.wsSubject.multiplex(
      // Sub message
      () => {
        // * Когда сервер получит это сообщение, он начнет отправлять сообщения для подписчика
        return {type : 'subscribe', symbol};
      },
      // unSub messange
      () => {
        // * когда получит это, он остановится
        return {type : 'unsubscribe', symbol};
      },
      // Функция филтра для текущего подписчика
      message => {
        return message.type === 'trade' && message.data[0].s === symbol;
      }
    ) as Observable<TFinnhubWsMessage>;

    // todo : Почему в дпте массив? надо ли ? как отображать?
    const pipe = source.pipe(
      filter(message => message.type === EFinnhubWsMessageType.TRADE),
      map((tradeMessage: FinnhubWsTradeMessage): ITrade => {
        const data = tradeMessage.data[0];
        return {
          price : data.p,
          symbol : data.s,
          time : new Date(data.t * 1000),
          volume : data.v,
        };
      })
    );

    return pipe;
  }

}
