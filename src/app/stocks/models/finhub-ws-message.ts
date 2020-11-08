export enum EFinnhubWsMessageType  {
    TRADE = 'trade',
    PTING = 'ping'
};


// export interface IFinnhubWsMessage {
//     readonly type: EFinnhubWsMessageType;
// }

export class FinnhubWsTradeMessage {
    readonly type = EFinnhubWsMessageType.TRADE;
    readonly data: {
        /**
         * Symbol
         */
        s: string;
        /**
         * Last price
         */
        p: number;
        /**
         * UNIX milliseconds timestamp.
         */
        t: number;
        /**
         * Volume.
         */
        v: number
      } [];
      constructor(){}
}

export class FinnhubWsTradePing {
    readonly type = EFinnhubWsMessageType.PTING;
    constructor(){}
}

export type TFinnhubWsMessage = FinnhubWsTradeMessage | FinnhubWsTradePing;
