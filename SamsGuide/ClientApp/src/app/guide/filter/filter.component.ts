import { Component, OnInit, AfterViewInit, Output, EventEmitter, ViewChild, ElementRef, NgZone } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Filter } from "../models/filter.interface";
import { MapsAPILoader } from "@agm/core";

@Component({
  selector: "filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.scss"]
})
export class FilterComponent implements OnInit, AfterViewInit {
  @Output()
  filter: EventEmitter<Filter> = new EventEmitter();
  keywordInput = new FormControl("");

  @ViewChild("search", { static: false })
  searchElementRef: ElementRef;

  private currentFilter: Filter = {
    lat: -33.8665433,
    long: 151.1956316,
    radius: 0,
    keyword: "",
    language: "",
    type: ""
  };

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {}


  ngOnInit() {
  }

  ngAfterViewInit() {

    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);

      autocomplete.addListener("place_changed",
        () => {
          this.ngZone.run(() => {
            //get the place result
            const place = autocomplete.getPlace();

            //verify result
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }

            //set latitude, longitude and zoom
            this.currentFilter.lat = place.geometry.location.lat();
            this.currentFilter.long = place.geometry.location.lng();
            const filter: Filter = Object.create(this.currentFilter);
            this.filter.emit(filter);
          });
        });

    });
  }

}
