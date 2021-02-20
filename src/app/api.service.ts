import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CovidStats } from './covid-stats';
import { Country } from './country';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url = 'https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true';

  constructor(private http: HttpClient) { }

  getMoreData(id: string): Observable<CovidStats> {
    return this.http.get<CovidStats>(
      `https://api.apify.com/v2/key-value-stores/${id}/records/LATEST?disableRedirect=true`
    );
  }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.url);
  }
}
