import { WorkersService } from './../../services/workers.service';
import { AppState } from './../../store/AppState';
import { WorkerInfo, WorkerInformation, WorkerColumns, FlightInformation } from './../../../assets/workersTypes';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { skip, takeWhile } from 'rxjs/operators';
import * as flights from '../../store/actions/flights.action';
import { interval } from 'rxjs';

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
  public notFoundFlights = false;
  public workerSelectedName = '';
  constructor(private store: Store<AppState>, private workersService: WorkersService) {
    this.usersSelectedWorker$ = store.pipe(select('usersSelectedWorker'));
  }

  ngOnInit(): void {
    this.subscriptions.push(this.usersSelectedWorker$.pipe(skip(1)).subscribe(data => {
      this.getWorkerData(data.id);
      this.workerSelectedName = data.name;
    }));
  }

  private getWorkerData(workerId: number): void {
    this.getWorkerInformation(workerId);
    this.refreshFlightInformationData(workerId);
  }

  private getWorkerInformation(workerId: number): void {
    this.subscriptions.push(this.workersService.getWorkerInformation(workerId)
      .subscribe(workerFlightsInformation => {
        this.workerFlightsData = workerFlightsInformation;
        const defaultWorkerFlightData = this.workerFlightsData[0]; // default will be the first row of the table
        if (!!defaultWorkerFlightData) {
          this.notFoundFlights = false;
          const flightInformation: FlightInformation = {
            duration: defaultWorkerFlightData.duration,
            num: defaultWorkerFlightData.num,
            from_gate: defaultWorkerFlightData.from_gate,
            to_gate: defaultWorkerFlightData.to_gate
          };
          this.store.dispatch(flights.UpdateFlightInformation(flightInformation)); // default will be the first row of the table
        }
        else {
          this.notFoundFlights = true;
        }
      }, (error) => {
        console.log('error occure: ', error);
      }));
  }

  private refreshFlightInformationData(workerId: number): void {
    interval(60000)
      .pipe(takeWhile(() => true))
      .subscribe(() => {
        console.log('Refresh - the flight information');
        this.getWorkerInformation(workerId);
      });
  }

  @HostListener('window:unload', ['$event'])
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
