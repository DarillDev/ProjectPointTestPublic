/**
 * Общая информация о компании
 */
export interface ICompanyProfile {
    /**
     * Страна местонахождения компании.
     */
    country: string;
    /**
     * Валюта, используемая в отчетности компании.
     */
    currency: string;
    /**
     * Котируемая биржа.
     */
    exchange: string;
    /**
     * Дата IPO.
     */
    ipo: string;
    /**
     * Рыночная капитализация.
     */
    marketCapitalization: number;
    /**
     * Company name.
     */
    name: string;
    /**
     * Телефон компании.
     */
    phone: string;
    /**
     * Количество выпущенных акций.
     */
    shareOutstanding: number;
    /**
     * Символ / тикер компании, используемый на бирже.
     */
    ticker: string;
    /**
     * Вебсайт компании.
     */
    weburl: string;
    /**
     * Изображение логотипа.
     */
    logo: string;
    /**
     * Отраслевая классификация Finnhub.
     */
    finnhubIndustry: string;
}
