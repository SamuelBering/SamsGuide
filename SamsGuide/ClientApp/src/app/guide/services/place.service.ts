//import { } from 'googlemaps';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

// import * as _ from 'lodash';
// Add the RxJS Observable operators we need in this app.
//import '../../rxjs-operators';
import { Place } from '../models/place.interface';
import { Filter } from '../models/filter.interface';
import { MapsAPILoader } from '@agm/core';
import { PlaceServiceBase } from "./place.service.base";
import { BehaviorSubject } from 'rxjs';
import { MapperService } from "./mapper.service";

//import { Observer } from '@aspnet/signalr-client/dist/src/Observable';

@Injectable()
export class PlaceService implements PlaceServiceBase {

  _placesBehaviorSubject = new BehaviorSubject<Array<Place>>([]);

  constructor(private mapsAPILoader: MapsAPILoader, private mapperService: MapperService) {
  }

  get placesBehaviorSubject() {
    return this._placesBehaviorSubject;
  }

  private CreateQueryParameters(filter: Filter): URLSearchParams {
    let queryParams = new URLSearchParams();

    for (let propertyName in filter) {
      queryParams.set(propertyName, filter[propertyName]);
    }

    return queryParams;
  }

  // GetPlaces2(filter: Filter) {
  //     let pyrmont = new google.maps.LatLng(-33.8665433, 151.1956316);

  //     let map = new google.maps.Map(document.getElementById('map'), {
  //         center: pyrmont,
  //         zoom: 15
  //     });

  //     var request = {
  //         location: pyrmont,
  //         radius: 500,
  //         query: 'restaurant'
  //     };

  //     var service = new google.maps.places.PlacesService(map);
  //     service.nearbySearch(request, this.callback);
  // }

  GetPlaces3(filter: Filter): Observable<Array<Place>> {

    // This function runs when subscribe() is called
    function placesSubscriber(observer: Observer<Array<Place>>) {
      //let pyrmont = new google.maps.LatLng(-33.8665433, 151.1956316);

      this.mapsAPILoader.load().then(() => {

        let latLng = new google.maps.LatLng(filter.lat, filter.long);
        let map = new google.maps.Map(document.getElementById('place-service-map'), {
          center: latLng,
          zoom: 0
        });


        var request = {
          location: latLng,
          radius: 200,
          query: 'restaurant'
        };

        var service = new google.maps.places.PlacesService(map);
        service.textSearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {

            //let places = results.map((placeResult) => {
            //  return {
            //    id: placeResult.id,
            //    place_id: placeResult.place_id,
            //    html_attributions: placeResult.html_attributions,
            //    name: placeResult.name,
            //    icon: placeResult.icon,
            //    photoUrl: placeResult.photos ? placeResult.photos[0].getUrl({ 'maxWidth': 100, 'maxHeight': 100 }) : null
            //  };
            //});

            let places: Array<Place> = this.mapperService.mapPlaces(results);

            this._placesBehaviorSubject.next(places);
            observer.next(places);
            observer.complete();

            // for (var i = 0; i < results.length; i++) {
            //     var place = results[i];
            //     console.log(results[i]);
            // }
          }
          else {
            observer.error(`An error occurred: ${status}`);
          }
        });


      });


      return { unsubscribe() { } };
    }

    return new Observable<Array<Place>>(placesSubscriber.bind(this));
  }



  // callback(results, status) {

  //     if (status == google.maps.places.PlacesServiceStatus.OK) {
  //         for (var i = 0; i < results.length; i++) {
  //             var place = results[i];
  //             console.log(results[i]);
  //         }
  //     }
  // }

  //getPlaces(filter: Filter) {
  //  this.mapsAPILoader.load().then(() => {

  //    let latLng = new google.maps.LatLng(filter.lat, filter.long);
  //    let map = new google.maps.Map(document.getElementById('place-service-map'), {
  //      center: latLng,
  //      zoom: 0
  //    });

  //    var request = {
  //      location: latLng,
  //      radius: 200,
  //      query: 'restaurant'
  //    };

  //    var service = new google.maps.places.PlacesService(map);
  //    service.textSearch(request, (results, status) => {
  //      if (status === google.maps.places.PlacesServiceStatus.OK) {

  //        let places = results.map((placeResult) => {
  //          return {
  //            id: placeResult.id,
  //            place_id: placeResult.place_id,
  //            html_attributions: placeResult.html_attributions,
  //            name: placeResult.name,
  //            icon: placeResult.icon,
  //            photoUrl: placeResult.photos ? placeResult.photos[0].getUrl({ 'maxWidth': 100, 'maxHeight': 100 }) : null
  //          };
  //        });

  //        this.placesBehaviorSubject.next(places);
  //      }
  //      else {
  //        this.placesBehaviorSubject.next([]);
  //      }
  //    });

  //  });
  //}

  getPlaces(filter: Filter): Observable<Array<Place>> {
    return this.GetPlaces3(filter);
  }

}
