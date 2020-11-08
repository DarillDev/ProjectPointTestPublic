import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable, Observer, Subscription, throwError } from 'rxjs';
  // ! C ключем от песочницы веб-сокет не работал, по этому тут берем apiKey из environment.PROD
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class StockWsService {
  private wsUrl = environment.wsUrl;
  private apiKey = environment.apiKey;
  wsSubject: WebSocketSubject<any>;
  ws: Observable<any>;
  messages: Observable<any>;
  sub: any;
  constructor() {
    this.wsSubject = webSocket(`${this.wsUrl}?token=${this.apiKey}`);

    /**
     * ! Костыль. Магия какая-то. Если использвать getTradesStream() внутри swithMap()
     * ! То наблюдается следущщий эффект : Первая подписка проходит нормально,
     * ! при втором значении в потоке swithMap, как и ожидалось, отписался предыдушего Observavle,
     * ! и подписался на новый. Но через пол секунды он отписывается от текущего Obsrvable.
     * * ========================================================================================================
     * ! Короче, дело в том что сам wsSubject() закрывает соединение WebScoket, а потом убивает всех подписчиков
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
  getTradesStream(symbol: string): Observable<any> {
    if (!this.wsSubject) {
      return throwError(new Error('websocket subject not set'));
    }
    return this.wsSubject.multiplex(
      // Sub message
      () => {
        console.log(`subscribe ${symbol}`);
        // * Когда сервер получит это сообщение, он начнет отправлять сообщения для
        return {type : 'subscribe', symbol};
      },
      // unSub messange
      () => {
        console.log(`unsubscribe ${symbol}`);
        // * когда получит это, он остановится
        return {type : 'unsubscribe', symbol};
      },
      // Функция филтра для текущего подписчика
      message => {
        return message.type === 'trade' && message.data[0].s === symbol;
      }
    );
  }

}
