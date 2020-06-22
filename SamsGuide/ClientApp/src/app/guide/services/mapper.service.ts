//import { } from 'googlemaps';
import { Injectable } from "@angular/core";
import { Place, Place as IPlace } from "../models/place.interface";

@Injectable()
export class MapperService {

  mapPlaces(placeResult): Array<Place> {
    return placeResult.map((placeData) => {
      let place: IPlace = {
        id: placeData.id,
        place_id: placeData.place_id,
        html_attributions: placeData.html_attributions,
        name: placeData.name,
        icon: placeData.icon,
        photoUrl: placeData.photos ? placeData.photos[0].getUrl({ 'maxWidth': 100, 'maxHeight': 100 }) : null,
        lat: placeData.geometry.location.lat(),
        long: placeData.geometry.location.lng()
      };
      return place;
    });
  }

}
