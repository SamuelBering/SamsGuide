import { Injectable } from '@angular/core';
import { PlaceServiceBase } from "./place.service.base";
import { Filter } from "../models/filter.interface";
import { of, Observable, BehaviorSubject } from 'rxjs';
import { Place, Place as IPlace } from "../models/place.interface";
import { PlacesTestData } from "../../TestData/PlacesTestData";
import { MapperService } from "./mapper.service";


@Injectable()
export class MockedPlaceService implements PlaceServiceBase {

  _placesBehaviorSubject = new BehaviorSubject<Array<IPlace>>([]);
  private testData: PlacesTestData;
  private index: number;

  private places: Array<string>;

  constructor(private mapperService: MapperService) {
    this.testData = new PlacesTestData();
    this.places = Object.keys(this.testData.places);
    this.index = 0;
  }

  get placesBehaviorSubject() {
    return this._placesBehaviorSubject;
  }

  getPlaces(filter: Filter): Observable<Array<Place>> {

    if (this.index >= this.places.length) {
      this.index = 0;
    }
    var places: Array<Place> = JSON.parse(this.testData.places[this.places[this.index++]]);

    const observable = of(places);

    return observable;

    // this.GetPlaces2(filter);
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    // let queryParams = this.CreateQueryParameters(filter);

    // return this.http.get(`${this.baseUrl}/place/getplaces`, { search: queryParams, headers: headers })
    //     .map(res => {
    //         return res.json();
    //     })
    //     .catch(this.handleError);
  }

}
