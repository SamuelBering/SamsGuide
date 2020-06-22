import { Component, Input } from "@angular/core";
import { Place } from "../models/place.interface";

@Component({
  selector: "places",
  templateUrl: "./places.component.html",
  styleUrls: ["./places.component.scss"]
})
export class PlacesComponent {

  @Input()
  places: Array<Place>;

  constructor() {}

  //ngOnInit() {
  //  this.getPlaces();
  //}

  //ngOnChanges(changes: SimpleChanges): void {
  //  this.getPlaces();
  //}

  //private getPlaces() {
  //  if (!this.filter) {
  //    return;
  //  }

  //  this.placeService.getPlaces(this.filter).subscribe((places) => {

  //    this.places = places;
  //    let jsonPlaces = JSON.stringify(places);

  //    this.changeDetectorRef.detectChanges();
  //  },
  //    errors => {
  //      let errorKey: string = 'placeServiceError';
  //      this.dataCollectorService.storage[errorKey] = errors;
  //      this.router.navigate(['/error', errorKey]);
  //    });
  //}

}
