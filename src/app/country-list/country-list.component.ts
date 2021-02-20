import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Country } from '../country';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {
  countries: Country[];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.getCountries();
  }

  getCountries() {
    this.api.getCountries()
      .subscribe(countries => this.countries = countries);
  }

  getCountryId(country: Country) {
    const [_, id] = country.moreData.match(/key-value-stores\/(\w+)/)

    return id;
  }
}
