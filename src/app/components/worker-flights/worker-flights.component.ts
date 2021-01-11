import { WorkersService } from './../../services/workers.service';
import { AppState } from './../../store/AppState';
import { WorkerInfo, WorkerInformation, WorkerColumns, FlightInformation } from './../../../assets/workersTypes';
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
  private usersSelectedWorker$: Observable<WorkerInfo>;
  private subscriptions: Subscription[] = [];
  public workerFlightsData: WorkerInformation[] = [];
  public workerColumns: WorkerColumns[] = [
    { headerName: 'Flight Number', field: 'num' },
    { headerName: 'Origin', field: 'from' },
    { headerName: 'Origin Date', field: 'from_date' },
    { headerName: 'Destination', field: 'to' },
    { headerName: 'Destination Date', field: 'to_date' }
  ];
  constructor(private store: Store<AppState>, private workersService: WorkersService) {
    this.usersSelectedWorker$ = store.pipe(select('usersSelectedWorker'));
  }

  ngOnInit(): void {
    this.subscriptions.push(this.usersSelectedWorker$.pipe(skip(1)).subscribe(data => {
      this.getWorkerData(data.id);
    }));
  }

  private getWorkerData(numberId: number): void {
    this.subscriptions.push(this.workersService.getWorkerInformation(numberId)
      .subscribe(workerFlightsInformation => {
        this.workerFlightsData = workerFlightsInformation;
        const defaultWorkerFlightData = this.workerFlightsData[0]; // default will be the first row of the table
        const flightInformation: FlightInformation = {
          duration: defaultWorkerFlightData.duration,
          num: defaultWorkerFlightData.num,
          from_gate: defaultWorkerFlightData.from_gate,
          to_gate: defaultWorkerFlightData.to_gate
        };
        this.store.dispatch(flights.UpdateFlightInformation(flightInformation)); // default will be the first row of the table
      }, (error) => {
        console.log('error occure: ', error);
      }));
  }

  @HostListener('window:unload', ['$event'])
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
