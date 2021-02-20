export interface Country {
    infected: number;
    tested: number | 'NA';
    recovered: number | 'NA';
    deceased: number;
    country: string;
    moreData: string;
    historyData: string;
    sourceUrl: string;
    lastUpdatedApify: string;
}