import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Filter } from '../models/filter.interface';
import { Place } from "../models/place.interface";
import { PlaceServiceBase } from "../services/place.service.base";

@Component({
  selector: 'guide-home',
  templateUrl: './guide-home.component.html',
  styleUrls: ['./guide-home.component.scss']
})

export class GuideHomeComponent implements OnInit {

  filter: Filter = null;
  places: Array<Place> = [];

  constructor(private placeService: PlaceServiceBase, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.setCurrentLocation();
  }

  onFilterChange(filter: Filter) {
    this.filter = filter;
    this.placeService.getPlaces(this.filter).subscribe((places) => {
      this.places = places;
      this.changeDetectorRef.detectChanges();
    });
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.filter = {
          lat: position.coords.latitude,
          long: position.coords.longitude,
          radius: 0,
          keyword: '',
          language: '',
          type: ''
        };
        this.onFilterChange(this.filter);
      });
    }
  }

}
