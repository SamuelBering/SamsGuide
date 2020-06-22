import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';

import { DataCollectorService } from './infrastructure/services/data.collector.service';
import { PlaceServiceBase } from "./guide/services/place.service.base";
import { MockedPlaceService } from "./guide/services/mocked.place.service";

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { GuideHomeComponent } from './guide/guide-home/guide-home.component';
import { MapComponent } from './guide/map/map.component';
import { FilterComponent } from './guide/filter/filter.component';
import { PlacesComponent } from './guide/places/places.component'
import { ErrorComponent } from './error/error.component'
import { PlaceService } from "./guide/services/place.service";
import { MockFilterComponent } from "./guide/mockFilter/mock-filter.component";
import { PlaceComponent } from "./guide/place/place.component";
import { MapperService } from "./guide/services/mapper.service";


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    GuideHomeComponent,
    FilterComponent,
    MapComponent,
    PlacesComponent,
    ErrorComponent,
    PlaceComponent,
    MockFilterComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'guide', component: GuideHomeComponent },
      { path: 'error/:errorKey', component: ErrorComponent }
    ]),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDkD2vOX0Iap2O25IidUeI9wdHxelp_SMA',
      libraries: ['places']
    })
  ],
  providers: [DataCollectorService, { provide: PlaceServiceBase, useClass: MockedPlaceService}, MapperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
