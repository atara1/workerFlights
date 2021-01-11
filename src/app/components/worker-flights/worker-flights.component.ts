import { WorkersService } from './../../services/workers.service';
import { AppState } from './../../store/AppState';
import { WorkerInfo, WorkerInformation } from './../../../assets/workersTypes';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { skip } from 'rxjs/operators';
import * as flights from '../../store/actions/flights.action';


@Component({
  selector: 'app-worker-flights',
  templateUrl: './worker-flights.component.html',
  styleUrls: ['./worker-flights.component.scss']
})
export class WorkerFlightsComponent implements OnInit, OnDestroy {
  usersSelectedWorker$: Observable<WorkerInfo>;
  private subscriptions: Subscription[] = [];
  flightsSelected$: Observable<WorkerInformation>;
  //workerColumns: string[] = ['Flight Number', 'Origin', 'Origin Date', 'Destination', 'Destination Date'];
  workerColumns = [
    {headerName: 'Flight Number', field: 'num' },
    {headerName: 'Origin', field: 'from' },
    {headerName: 'Origin Date', field: 'from_date' },
    {headerName: 'Destination', field: 'to'},
    {headerName: 'Destination Date', field: 'to_date'}
  ];
  workerData: WorkerInformation[] = [];
  constructor(private store: Store<AppState>, private workersService: WorkersService) {
    this.usersSelectedWorker$ = store.pipe(select('usersSelectedWorker'));
    this.flightsSelected$ = store.pipe(select('flights'));
  }

  ngOnInit(): void {
    this.subscriptions.push(this.usersSelectedWorker$.pipe(skip(1)).subscribe(data => {
      this.getWorkerData(data.id);
    }));
  }

  private getWorkerData(numberId: number): void {
    this.subscriptions.push( this.workersService.getWorkerInformation(numberId).subscribe(data => {
      this.workerData = data;
      //to do -from effect
      this.store.dispatch(flights.UpdateFlightInformation(this.workerData[0])); // default will be the first row of the table

    }));
  }


  @HostListener('window:unload', ['$event'])
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
