import { Filter } from "../models/filter.interface";
import { Observable } from "rxjs";
import { Place } from "../models/place.interface";
import { BehaviorSubject } from 'rxjs';

export abstract class PlaceServiceBase {

  abstract getPlaces(filter: Filter): Observable<Array<Place>>;
  //abstract getPlaces(filter: Filter);

  abstract get placesBehaviorSubject(): BehaviorSubject<Array<Place>>;

}
