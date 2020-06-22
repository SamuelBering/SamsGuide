import { Component, Input } from "@angular/core";
import { Place } from "../models/place.interface";

@Component({
  selector: "place",
  templateUrl: "./place.component.html",
  styleUrls: ["./place.component.scss"]
})
export class PlaceComponent {

  @Input()
  place: Place;

  constructor() {}

}
