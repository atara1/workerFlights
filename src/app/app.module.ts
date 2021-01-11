import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { WorkersListComponent } from './components/workers-list/workers-list.component';
import { FlightsDataComponent } from './components/flights-data/flights-data.component';
import { StoreModule } from '@ngrx/store';
import { usersSelectedWorkerReducer } from './store/reducers/usersSelectedWorker.reducer';
import { WorkerFlightsComponent } from './components/worker-flights/worker-flights.component';
import { TableComponent } from './components/table/table.component';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { GenericGridComponent } from './components/generic-grid/generic-grid.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [
    AppComponent,
    WorkersListComponent,
    FlightsDataComponent,
    WorkerFlightsComponent,
    TableComponent,
    GenericGridComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({
      usersSelectedWorker: usersSelectedWorkerReducer,
    }),
    NgbPaginationModule,
    AgGridModule.withComponents([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
