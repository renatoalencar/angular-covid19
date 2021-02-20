export interface Filter {
    country: string;
    order: 'asc' | 'desc';
    sort: 'country' | 'infected' | 'recovered';
}