import { FlightInformation } from './../../../assets/workersTypes';
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
  public flightsSelected$: Observable<FlightInformation>;
  public flightInformation: FlightInformation;
  private subscriptions: Subscription;

  constructor(private store: Store<AppState>) {
    this.flightsSelected$ = store.pipe(select('flights'));
  }

  ngOnInit(): void {
    this.subscriptions = this.flightsSelected$.subscribe(data => {
      this.flightInformation = data;
    });
  }

  @HostListener('window:unload', ['$event'])
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
