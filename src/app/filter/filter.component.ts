import { Component, EventEmitter, Output } from '@angular/core';
import { Filter } from '../filter';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent {
  current: Filter = {
    country: null,
    order: 'asc',
    sort: 'country',
  };

  @Output() filter = new EventEmitter<Filter>();

  onSubmit() {
    this.filter.emit(this.current);
  }
}
