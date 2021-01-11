import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { WorkersListComponent } from './components/workers-list/workers-list.component';
import { FlightsDataComponent } from './components/flights-data/flights-data.component';
import { StoreModule } from '@ngrx/store';
import { usersSelectedWorkerReducer } from './store/reducers/usersSelectedWorker.reducer';
import { flightReducer } from './store/reducers/flight.reducer';

import { WorkerFlightsComponent } from './components/worker-flights/worker-flights.component';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { GenericGridComponent } from './components/generic-grid/generic-grid.component';
import { AgGridModule } from 'ag-grid-angular';
import { FlightInformationComponent } from './components/flight-information/flight-information.component';
import { ConvertMinutesToTimePipe } from './pipes/convert-minutes-to-time.pipe';

@NgModule({
  declarations: [
    AppComponent,
    WorkersListComponent,
    FlightsDataComponent,
    WorkerFlightsComponent,
    GenericGridComponent,
    FlightInformationComponent,
    ConvertMinutesToTimePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({
      usersSelectedWorker: usersSelectedWorkerReducer,
      flights: flightReducer
    }),
    NgbPaginationModule,
    AgGridModule.withComponents([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
