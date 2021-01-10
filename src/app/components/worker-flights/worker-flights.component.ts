import { WorkersService } from './../../services/workers.service';
import { AppState } from './../../store/AppState';
import { WorkerInfo, WorkerInformation } from './../../../assets/workersTypes';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { skip } from 'rxjs/operators';


@Component({
  selector: 'app-worker-flights',
  templateUrl: './worker-flights.component.html',
  styleUrls: ['./worker-flights.component.scss']
})
export class WorkerFlightsComponent implements OnInit, OnDestroy {
  usersSelectedWorker$: Observable<WorkerInfo>;
  private subscriptions: Subscription[] = [];
  workerColumns: string[] = ['Flight Number', 'Origin', 'Origin Date', 'Destination', 'Destination Date'];
  workerData: WorkerInformation[] = [];
  constructor(private store: Store<AppState>, private workersService: WorkersService) {
    this.usersSelectedWorker$ = store.pipe(select('usersSelectedWorker'));
  }

  ngOnInit(): void {

    this.subscriptions.push(this.usersSelectedWorker$.pipe(skip(1)).subscribe(data => {
      this.getWorkerData(data.id);
    }));
  }

  private getWorkerData(numberId: number): void {
    this.subscriptions.push( this.workersService.getWorkerInformation(numberId).subscribe(data => {
      this.workerData = data;
    }));
  }


  @HostListener('window:unload', ['$event'])
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
