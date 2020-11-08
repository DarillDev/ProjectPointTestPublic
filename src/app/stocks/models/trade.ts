export interface ITrade {
    /**
     * Временая отметка UNIX
     */
    time: Date;
    /**
     * Символ
     */
    symbol: string;
    /**
     * Последняя цена
     */
    price: number;
    /**
     * Обьем продажи
     */
    volume: number;
}
