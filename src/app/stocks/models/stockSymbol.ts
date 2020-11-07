export interface IStockSymbol {
    /**
     * Описание символа
     */
    description: string;
    /**
     * Отображение имени символа.
     */
    displaySymbol: string;
    /**
     * Уникальный символ, используемый для идентификации этого символа, используемого в /stock/candleконечной точке.
     */
    symbol: string;
    /**
     * Тип безопасности.
     */
    type: string;
    /**
     * Валюта цены. Это может отличаться от валюты отчетности фундаментальных данных.
     */
    currency: string;
}
