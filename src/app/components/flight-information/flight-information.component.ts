import { FlightInformation, WorkerInformation } from './../../../assets/workersTypes';
import { AppState } from './../../store/AppState';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ConvertMinutesToTimePipe } from '../../pipes/convert-minutes-to-time.pipe';
@Component({
  selector: 'app-flight-information',
  templateUrl: './flight-information.component.html',
  styleUrls: ['./flight-information.component.scss']
})
export class FlightInformationComponent implements OnInit {
  flightsSelected$: Observable<WorkerInformation>;
  flightInformation: FlightInformation;
  constructor(private store: Store<AppState>) {
    this.flightsSelected$ = store.pipe(select('flights'));
  }

  ngOnInit(): void {
    this.flightsSelected$.subscribe(data => {
      this.flightInformation = {
        duration: data.duration,
        num: data.num,
        from_gate: data.from_gate,
        to_gate: data.to_gate
      };
    });
  }

}
