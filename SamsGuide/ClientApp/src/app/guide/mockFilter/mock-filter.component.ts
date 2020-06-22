import { Component, OnInit, AfterViewInit, Output, EventEmitter, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Filter } from '../models/filter.interface';
import { debounceTime } from "rxjs/operators"
import { MapsAPILoader } from '@agm/core';
// import { EventEmitter } from 'protractor';

@Component({
  selector: 'mock-filter',
  templateUrl: './mock-filter.component.html'
})
export class MockFilterComponent implements OnInit {
  @Output() filter: EventEmitter<Filter> = new EventEmitter();
  keywordInput: FormControl = new FormControl('');

  @ViewChild('search', { static: false })
  searchElementRef: ElementRef;

  private currentFilter: Filter = {
    lat: -33.8665433,
    long: 151.1956316,
    radius: 0,
    keyword: '',
    language: '',
    type: ''
  };

  constructor(private ngZone: NgZone) {
    this.keywordInput.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(this.onSearchInputValueChanges.bind(this));
  }

  onSearchInputValueChanges(keyword) {
    console.log(keyword);
    this.currentFilter.keyword = keyword;
    let filter: Filter = Object.create(this.currentFilter);
    this.filter.emit(filter);
  }

  ngOnInit() {
  }

}
