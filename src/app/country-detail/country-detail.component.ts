import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { map, switchMap, tap } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { CovidStats } from '../covid-stats';

type CovidByState = Record<string, { infected: number; deceased: number }>;

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.css'],
})
export class CountryDetailComponent implements OnInit {
  data: ChartDataSets[];

  options: ChartOptions = {
    responsive: true,
    tooltips: {
      callbacks: {
        label(item, data) {
          return 'ABC';
        },
      },
    },
  };

  stats: CovidStats;

  constructor(private api: ApiService, private route: ActivatedRoute) {}

  ngOnInit() {
    console.log('Country detail')
    this.getMoreData();
  }

  getMoreData() {
    function regionToPair({ state, count }) {
      return [state, count];
    }

    function groupStates(data: CovidStats): CovidByState {
      if (!data.infectedByRegion || !data.deceasedByRegion) {
        return {}
      }

      const infected = Object.fromEntries(
        data.infectedByRegion.map(regionToPair)
      );
      const deceased = Object.fromEntries(
        data.deceasedByRegion.map(regionToPair)
      );

      return Object.fromEntries(
        Object.keys(infected).map((state) => [
          state,
          { infected: infected[state], deceased: deceased[state] },
        ])
      );
    }

    function dataToPoints(data: CovidByState): ChartDataSets {
      return {
        data: Object.entries(data).map(([state, region]) => ({
          label: state,
          x: region.infected,
          y: region.deceased,
        })),
        pointRadius: 10,
      };
    }

    const stats = this.route.paramMap.pipe(
      map((params) => params.get('id')),
      switchMap((id) => this.api.getMoreData(id))
    );
 
    stats
      .pipe(map(groupStates), map(dataToPoints))
      .subscribe((data) => (this.data = [data]));

    stats.subscribe((data) => (this.stats = data));
  }
}
