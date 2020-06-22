import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Filter } from "../models/filter.interface";
import { Place } from "../models/place.interface";
import { MouseEvent } from '@agm/core';

@Component({
  selector: 'places-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Input('filter')
  inputFilter: Filter;

  @Input()
  places: Array<Place>;

  @Output('filter')
  outputFilter: EventEmitter<Filter> = new EventEmitter();

  zoom: number = 15;

  ngOnInit() {
  }

  onMakerDragEnd($event: MouseEvent) {
    let filter: Filter = { ...this.inputFilter }
    filter.lat = $event.coords.lat;
    filter.long = $event.coords.lng;
    this.outputFilter.emit(filter);
  }

}
