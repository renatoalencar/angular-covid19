import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Country } from '../country';
import { Filter } from '../filter';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css'],
})
export class CountryListComponent implements OnInit {
  countries: Country[];
  filteredCountries: Country[];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.getCountries();
  }

  getCountries() {
    this.api
      .getCountries()
      .subscribe(
        (countries) => (this.filteredCountries = this.countries = countries)
      );
  }

  getCountryId(country: Country) {
    const [_, id] = country.moreData.match(/key-value-stores\/(\w+)/);

    return id;
  }

  onFilter(filter: Filter) {
    this.filteredCountries = this.countries
      .filter(
        (country) =>
          filter.country === null || country.country.toLowerCase().search(filter.country) >= 0
      )
      .sort((a, b) => {
        let value;
  
        switch (filter.sort) {
          case 'infected':
            value = a.infected - b.infected;
            break;
          case 'recovered':
            if (a.recovered === 'NA' && b.recovered === 'NA') {
              return 0;
            }

            if (a.recovered === 'NA') {
              return 1;
            }

            if (b.recovered === 'NA') {
              return -1;
            }
  
            value = (a.recovered as number) - (b.recovered as number);
            break;
          case 'country':
          default:
            value = a.country.localeCompare(b.country);
        }
        return value * (filter.order === 'desc' ? -1 : 1);
      });
  }
}
