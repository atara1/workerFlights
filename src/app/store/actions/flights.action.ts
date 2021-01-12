import { FlightInformation } from './../../../assets/workersTypes';
import { createAction, props } from '@ngrx/store';

export const UpdateFlightInformation = createAction(
    '[FlightInformation] UpdateFlightInformation',
    props<FlightInformation>()
);
