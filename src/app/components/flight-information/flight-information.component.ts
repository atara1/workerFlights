import { FlightInformation, WorkerInformation } from './../../../assets/workersTypes';
import { AppState } from './../../store/AppState';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-flight-information',
  templateUrl: './flight-information.component.html',
  styleUrls: ['./flight-information.component.scss']
})
export class FlightInformationComponent implements OnInit, OnDestroy {
  flightsSelected$: Observable<WorkerInformation>;
  flightInformation: FlightInformation;
  private subscriptions: Subscription;

  constructor(private store: Store<AppState>) {
    this.flightsSelected$ = store.pipe(select('flights'));
  }

  ngOnInit(): void {
    this.subscriptions = this.flightsSelected$.subscribe(data => {
      this.flightInformation = {
        duration: data.duration,
        num: data.num,
        from_gate: data.from_gate,
        to_gate: data.to_gate
      };
    });
  }

  @HostListener('window:unload', ['$event'])
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
